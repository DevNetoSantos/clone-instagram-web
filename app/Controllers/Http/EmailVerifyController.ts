import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmailVerifyController {
  public async store({response, auth}: HttpContextContract) {
    auth.user?.sendVerificationEmail()

    return response.redirect().back()
  }
}
