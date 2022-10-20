

import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('welcome')

Route.on('/signup').render('auth.signup')
Route.post('/signup', 'AuthController.storeSignup')

Route.on('/login').render('auth.login')
Route.post('/login', 'AuthController.storeLogin')

