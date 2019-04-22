'use strict'

// add User Model
const User = use('App/Models/User')
const data = {
  access_token: '',
  expires_in: 7200*1000,
  token_type: ''
}

class UserController {

  async signup ({ request, auth, response }) {
    // get user data from signup form
    const userData = request.only(['username', 'password', 'name', 'sex', 'email', 'phone', 'mentor_id'])

    try {
      // save user to database
      const user = await User.create(userData)
      // generate JWT token for user
      const tokenObj = await auth.generate(user)
      // data for response
      data.access_token = tokenObj.token,
      data.expires_in = 7200*1000,
      data.token_type = tokenObj.type

      return response.json({
        // status: 'success',
        data: data,
        // message: 'signup success'
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'There was a problem creating the user, please try again later.'
      })
    }
  }

  async login ({ request, auth, response }) {
    
    try {
      // get username and password from request
      const username = request.input('username')
      const password = request.input('password')
      // calidate the user credentials and generate a JWT token
      const tokenObj = await auth.attempt(username, password)
      // data for response
      data.access_token = tokenObj.token,
      data.expires_in = 7200*1000,
      data.token_type = tokenObj.type
      
      console.log(tokenObj)

      return response.json({
        // status: 'success',
        data: data,
        // message: 'login success'
      })
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: 'Invalid username/password'
      })
    }
  }

  async getUser ({ request, auth, response }) {
    
    const user = await User.query().where('id', auth.current.user.id)
    return response.json({
      data: user
    })
    console.log(user)
  }
}

module.exports = UserController
