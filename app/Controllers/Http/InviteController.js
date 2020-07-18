'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Invite = use('App/Models/Invite')

/**
 * Resourceful controller for interacting with invites
 */
class InviteController {
  /**
   * Create/save a new invite.
   * POST invites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const { emails } = request.only(['emails'])

    if (!emails) {
      return response.status(400).json({ error: 'Emails is required' })
    }

    const data = emails.map(email => ({
      email,
      user_id: auth.user.id,
      team_id: auth.user.currentTeamId
    }))

    const invites = await Invite.createMany(data)
    return invites
  }
}

module.exports = InviteController
