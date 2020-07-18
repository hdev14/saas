'use strict'

const UserTeam = use('App/Models/UserTeam')

class MemberController {
  async index ({ auth }) {
    const members = await UserTeam.query()
      .where('team_id', auth.user.currentTeamId)
      .with('user')
      .with('roles')
      .fetch()
    return members
  }

  async update ({ params, request, auth }) {
    const { roles } = request.only(['roles'])
    const userTeams = await UserTeam.find(params.id)
    const result = await userTeams.roles().sync(roles)
    return result
  }
}

module.exports = MemberController
