'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Team {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
    // call next to advance the request
    const slug = request.header('Team-Slug')

    if (slug) {
      const team = await auth.user.teams().where('slug', slug).first()
      if (!team) {
        return response.status(401).json({ error: 'Header Team-Slug is required' })
      }

      auth.user.currentTeamId = team.id
      request.team = team
    }

    await next()
  }
}

module.exports = Team
