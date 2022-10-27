import Factory from '@ioc:Adonis/Lucid/Factory'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export const UserFactory = Factory
  .define(User, ({ faker }) => {
    return {
      name: faker.name.firstName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      details: faker.lorem.paragraphs(),
      password: faker.internet.password(),
    }
  })
  .relation('posts', () => PostFactory)
  .build()

  export const PostFactory = Factory
  .define(Post, ({ faker }) => {
    return {
      caption: faker.lorem.paragraph(),
      image: faker.image.animals()
    }
  })
  .relation('user', () => UserFactory )
  .build()