import db from './database.js'

const setupDatabase = async () => {
  // table employees
  await db.schema.hasTable('employees').then(exists => {
    if (!exists) {
      return db.schema.createTable('employees', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('email').notNullable().unique()
        table.string('role').notNullable()
      })
    }
  })

  // Table order lunchs
  await db.schema.hasTable('orders').then(exists => {
    if (!exists) {
      return db.schema.createTable('orders', table => {
        table.increments('id').primary()
        table
          .integer('employee_id')
          .unsigned()
          .references('id')
          .inTable('employees')
          .onDelete('CASCADE')
        table.string('meal_name').notNullable()
        table.date('order_date').notNullable()
      })
    }
  })

  console.log('Database setup complete!')
  process.exit()
}

// run only one
setupDatabase()

// node backend/database/migrations.ts
