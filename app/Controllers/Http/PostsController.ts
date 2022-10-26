import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import { schema } from '@ioc:Adonis/Core/Validator'
import Post from 'App/Models/Post'

export default class PostsController {
  public async create({view}: HttpContextContract) {
    return view.render('posts.create')
  }

  public async store({ request, response, auth }: HttpContextContract) {

    const payload = await request.validate({
      schema: schema.create({
        caption: schema.string(),
        image: schema.file({
          size: '2mb',
          extnames: ['jpg', 'png', 'gif'],
        })
      }),
      messages: {
        'caption.required': 'caption é obrigatório',
        'image.required': 'password é obrigatório',
      }
    })

    const imageName = new Date().getTime().toString() + `.${payload.image.extname}`
    await payload.image.move(Application.publicPath('images'), {
      name: imageName
    })

    const post = new Post()
    post!.image = `images/${imageName}`
    post.caption = payload.caption
    post.userId = auth.user?.id
    
    post.save()
    return response.redirect(`/${auth.user?.username}`)

  }
}
