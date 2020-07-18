'use strict'

class Invite {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      emails: 'required|array',
      'emails.*': 'required|email'
    }
  }
}

module.exports = Invite
