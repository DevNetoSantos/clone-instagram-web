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
        password: schema.string()
      }),
      messages: {
        'name.required': 'name é obrigatório',
        'email.required': 'email é obrigatório',
        'password.required': 'password é obrigatório',
      }
    })

    const user = new User()
    user.name = payload.name,
    user.email = payload.email,
    user.password = payload.password

    await user.save();
    return response.redirect('/');
  }

  public async storeLogin({request}: HttpContextContract) {
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

    const user = await User.findByOrFail('email', payload.email)
    return user;
  }
}
