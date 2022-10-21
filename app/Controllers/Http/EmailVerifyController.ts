import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmailVerifyController {
  public async index({response, auth}: HttpContextContract) {
    auth.user?.sendVerificationEmail()

    return response.redirect().back()
  }

/*   public async store({response, params}: HttpContextContract) {
    const userid = params.userid;
    const token = params.token;
    const user = User.findOrFail(userid, token);
    return user;
  } */
}