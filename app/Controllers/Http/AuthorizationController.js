'use strict'

const UserTeam = use('App/Models/UserTeam')

class AuthorizationController {
  async show ({ auth }) {
    const userTeam = await UserTeam.query().where({
      team_id: auth.user.currentTeamId,
      user_id: auth.user.id
    }).first()
    return {
      roles: await userTeam.getRoles(),
      permissions: await userTeam.getPermissions()
    }
  }
}

module.exports = AuthorizationController
