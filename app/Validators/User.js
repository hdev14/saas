'use strict'

class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required|min:6'
    }
  }
}

module.exports = User
