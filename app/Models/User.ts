import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail'
//import { nanoid } from 'nanoid' //gerar token

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public async sendVerificationEmail() {
/*     const token = 'apjsaiojdiasdjoaihdiaudhiuahdiaudhiahdia'
    const url = `${process.env.APP_URL}/verify-email/${this.id}/${token}` */
    await Mail.send((message) => {
      message
        .from('clone@instagram.com')
        .to(this.email)
        .subject('Por favor verifique seu email')
        .htmlView('emails/welcome', { user: this })
    })
  }
}
