'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

class DatabaseSeeder {
  async run () {
    const user = await User.create({
      name: 'Admin',
      email: 'admin@email.com',
      password: '123456'
    })

    await user.teams().create({
      name: 'Team SaaS',
      user_id: user.id
    })
  }
}

module.exports = DatabaseSeeder
