'use strict'

const Role = use('Adonis/Acl/Role')

class RoleController {
  async index () {
    return Role.all()
  }
}

module.exports = RoleController
