'use strict'

class UserController {
  async login ({request, response}) {
    response.json({
      access_token: '',
      expires_in: '',
      token_type: ''
    })
  }
}

module.exports = UserController
