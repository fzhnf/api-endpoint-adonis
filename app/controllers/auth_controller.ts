import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  async register({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)

    return User.accessTokens.create(user, ['*'], {
      name: request.input('token_name'),
      expiresIn: '1 days',
    })
  }

  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(registerValidator)
    const user = await User.verifyCredentials(email, password)

    return User.accessTokens.create(user, ['*'], {
      name: request.input('token_name'),
      expiresIn: '1 days',
    })
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user?.currentAccessToken.identifier)
    return {
      messages: 'success',
    }
  }

  async me({ auth }: HttpContext) {
    await auth.check()
    return {
      user: auth.user,
    }
  }
}