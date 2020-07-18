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
const Role = use('Adonis/Acl/Role')
const Permission = use('Adonis/Acl/Permission')

class DatabaseSeeder {
  async run () {
    const user = await User.create({
      name: 'Admin',
      email: 'admin@email.com',
      password: '123456'
    })

    const createInvite = await Permission.create({
      name: 'Can Create Invite',
      slug: 'can-create-invite'
    })

    const createProject = await Permission.create({
      name: 'Can Create Project',
      slug: 'can-create-project'
    })

    const admin = await Role.create({
      name: 'Admin',
      slug: 'admin'
    })

    const moderator = await Role.create({
      name: 'Moderator',
      slug: 'moderator'
    })

    await Role.create({
      name: 'Visitor',
      slug: 'visitor'
    })

    await admin.permissions().attach([createInvite.id, createProject.id])
    await moderator.permissions().attach([createInvite.id])

    const team = await user.teams().create({
      name: 'Team SaaS',
      user_id: user.id
    })

    const userTeam = await user.userTeams().where('team_id', team.id).first()
    await userTeam.roles().attach([admin.id])
  }
}

module.exports = DatabaseSeeder
