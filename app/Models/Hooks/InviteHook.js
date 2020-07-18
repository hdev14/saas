'use strict'

const User = use('App/Models/User')
const Kue = use('Kue')
const InvitationEmail = use('App/Jobs/InvitationEmail')
const InviteHook = exports = module.exports = {}

InviteHook.sendInvitationEmail = async (invite) => {
  const { email, team_id } = invite
  const user = await User.findBy('email', email)
  if (user) {
    await user.teams().attach(team_id)
  } else {
    const user = await invite.user().fetch()
    const team = await invite.team().fetch()
    Kue.dispatch(InvitationEmail.key, { user, team, email }, { attempts: 3 })
  }
}
