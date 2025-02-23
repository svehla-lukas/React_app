const bcrypt = require('bcryptjs')

const password = '1234' // Nahraď svým heslem
const hash = bcrypt.hashSync(password, 10) // 10 je síla hashe

console.log('Hashed password:', hash)
