import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class SignupController {

  public async storeSignup({request, response}: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string(),
        email: schema.string({}, [
          rules.email()
        ]),
        username: schema.string({}, [
          rules.maxLength(25)
        ]),
        password: schema.string()
      }),
      messages: {
        'name.required': 'name é obrigatório',
        'email.required': 'email é obrigatório',
        'username.required': 'Apelido é obrigatório',
        'password.required': 'password é obrigatório',
      }
    })

    const user = new User()
    user.name = payload.name,
    user.email = payload.email,
    user.username = payload.username,
    user.password = payload.password

    const existUser = await User.findBy('email', payload.email)

    if(existUser) {
      return response.badRequest('Este email ja existe')
    }

    await user.save();

    user?.sendVerificationEmail()
    
    return response.redirect('/');
  }

  public async storeLogin({auth, response, request}: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        email: schema.string({}, [
          rules.email()
        ]),
        password: schema.string({}, [
          rules.minLength(5)
        ])
      }),
      messages: {
        'email.required': 'email é obrigatório',
        'password.required': 'password é obrigatório',
        'password.minLength': 'senha mínimo 5 caracteres'
      }
    })

    //const user = await User.findByOrFail('email', payload.email)
    const email = payload.email
    const password = payload.password

    try {
      await auth.attempt(email, password)
      response.redirect('/profile')
    } catch {
      return response.badRequest('Invalid credentials')
    }
    
  }

  public async logout({auth, response}: HttpContextContract) {
    await auth.logout()
    response.redirect('/')
  }
}
