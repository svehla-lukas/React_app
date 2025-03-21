import { fileURLToPath } from 'url'
import knex from 'knex'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Inicializate database with knex
const db = knex({
  client: 'sqlite3', // use sqlite3 database
  connection: {
    filename: path.join(__dirname, 'employeesDatabase.sqlite'), // path to database file
  },
  useNullAsDefault: true, // default value for NULL columns
})

// Initialize database tables
// chceck if table exists, if not create it
const initDB = async (): Promise<void> => {
  const hasEmployees = await db.schema.hasTable('employees')
  if (!hasEmployees) {
    await db.schema.createTable('employees', table => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('role').defaultTo(null)
      table.string('email').unique()
    })
  }

  // check if table exists, if not create it
  const hasLunchOrders = await db.schema.hasTable('lunch_orders')
  if (!hasLunchOrders) {
    await db.schema.createTable('lunch_orders', table => {
      table.increments('id').primary()
      table
        .integer('employee_id')
        .unsigned()
        .references('id')
        .inTable('employees')
        .onDelete('CASCADE')
      table.date('order_date').notNullable() // Datum objednávky
      table.integer('meal_number').defaultTo(0) // Číslo obědu (0 = neobjednal)
    })
  }
}

const hasMeals = await db.schema.hasTable('meals')
if (!hasMeals) {
  await db.schema.createTable('meals', table => {
    table.increments('id').primary()
    table.date('meal_date').notNullable() // Datum, kdy je jídlo dostupné
    table.string('meal_name').notNullable() // Název jídla
    table.string('meal_description') // Popis jídla
  })
}

// Initialize database
initDB()
  .then(() => console.log('Database initialized'))
  .catch(err => console.error('Database initialization failed:', err))

export default db
