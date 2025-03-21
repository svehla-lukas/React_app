import bcrypt from 'bcryptjs'
import cors from 'cors'
import db from '../database/database'
import express from 'express'
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'

// Oprava `__dirname` pro ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 1234

app.use(cors())
app.use(express.json())

const API_openWeatherMap = 'c79b236722edbac90d9b1871b720c9fc'
const usersFilePath = path.join(__dirname, 'registrationID.json')

// on call:
// 1. read from file on local Storage
// 2. parse
// 3. sand back

app.get('/', (req, res) => {
  const { dataType } = req.query
  console.log('someone call server')

  if (dataType === 'typeA') {
    const dataString = fs.readFileSync(`${__dirname}/../hackerTypeData.json`, 'utf-8')
    const data = JSON.parse(dataString)
    res.send(data)
  } else if (dataType === 'typeB') {
    const dataString = fs.readFileSync(`${__dirname}/../data.json`, 'utf-8')
    const data = JSON.parse(dataString)
    res.send(data)
  } else {
    res.status(400).send({ error: 'Invalid data type requested' })
  }
})

// Database
// 📌 get all employees
app.get('/employees', async (req, res) => {
  console.log('someone call employees')
  const employees = await db('employees').select('*')
  res.json(employees)
})

app.get('/employee/:email', async (req, res) => {
  try {
    const { email } = req.params
    console.log(`someone call employee: ${email}`)
    const employee = await db('employees').where({ email }).first()

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' })
    }

    res.json(employee)
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ error: 'Error fetching employee' })
  }
})

app.put('/employee/:email', async (req, res) => {
  try {
    const { email } = req.params
    const { name, role, newEmail } = req.body

    // Aktualizace zaměstnance v databázi
    const updated = await db('employees').where({ email }).update({ name, role, email: newEmail })

    if (!updated) {
      return res.status(404).json({ error: 'Employee not found' })
    }

    res.json({ message: 'Employee updated successfully' })
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ error: 'Error updating employee' })
  }
})

// 📌 EndPoint for create new user
app.post('/addEmployee', async (req, res) => {
  const { name, role, email } = req.body
  console.log(req.body)

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }

  try {
    const [id] = await db('employees').insert({ name, role, email })
    res.status(201).json({ message: 'Employee created', id })
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ error: 'Error inserting employee' })
  }
})

app.post('/lunch_order', async (req, res) => {
  try {
    const { employee_id, order_date, meal_number } = req.body

    if (!employee_id || !order_date) {
      return res.status(400).json({ error: 'Employee ID and date are required' })
    }

    await db('lunch_orders').insert({ employee_id, order_date, meal_number })
    res.status(201).json({ message: 'Lunch order added successfully' })
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ error: 'Error inserting lunch order' })
  }
})

app.post('/add_meal', async (req, res) => {
  try {
    const { meal_date, meal_name, meal_description } = req.body

    if (!meal_date || !meal_name) {
      return res.status(400).json({ error: 'Meal date and name are required' })
    }

    await db('meals').insert({ meal_date, meal_name, meal_description })
    res.status(201).json({ message: 'Meal added successfully' })
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ error: 'Error inserting meal' })
  }
})

app.get('/meals/week/:weekOffset', async (req, res) => {
  try {
    const weekOffset = parseInt(req.params.weekOffset) // -1 = minulý týden, 0 = tento týden, 1 = příští týden

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1 + weekOffset * 7) // Pondělí
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + 6) // Neděle

    const meals = await db('meals')
      .whereBetween('meal_date', [
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0],
      ])
      .orderBy('meal_date', 'asc')

    res.json(meals)
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ error: 'Error fetching meals' })
  }
})

// Fetch data from an external website
app.get('/openWeatherMap', async (req, res) => {
  console.log('someone call weather')
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Brno,CZ&appid=${API_openWeatherMap}&units=metric`
    )
    const weather = await response.json()
    res.send(weather)

    // console.log(response)
  } catch (error) {
    console.error('Error fetching external data:', error)
    res.status(500).send({ error: 'Failed to fetch external data' })
  }
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  console.log(req.body)

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  if (!fs.existsSync(usersFilePath)) {
    return res.status(500).json({ error: 'User data file not found' })
  }

  try {
    const dataString = fs.readFileSync(usersFilePath, 'utf-8')
    const users = JSON.parse(dataString).users

    // Find user by username instead of email
    const user = users.find((u: any) => u.username === username)

    if (!user) {
      return res.status(401).json({ error: 'Invalid login credentials' })
    }

    const isPasswordValid = bcrypt.compareSync(password, user.passwordHash)

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid login credentials' })
    }

    return res.json({
      message: 'Login successful',
      user: { username: user.username, role: user.role },
    })
  } catch (error) {
    console.error('Error reading user data:', error)
    return res.status(500).json({ error: 'Error reading user data' })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// server logic
const main = async () => {
  const dataString = fs.readFileSync(`${__dirname}/../hackerTypeData.json`, 'utf-8')
  const data = JSON.parse(dataString)

  const newData = {
    ...data,
    users: [
      {
        id: '1',
        name: 'kuba',
      },
    ],
  }

  fs.writeFileSync(`${__dirname}/../data.json`, JSON.stringify(newData, null, 2), 'utf-8')
}

main()

export {}
