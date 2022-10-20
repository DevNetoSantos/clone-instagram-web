
import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('welcome')

Route.on('/signup').render('auth.signup')
Route.post('/signup', 'AuthController.storeSignup')

Route.on('/profile').render('profile').middleware('auth')
Route.on('/login').render('auth.login')
Route.post('/login', 'AuthController.storeLogin')

Route.post('/logout', 'AuthController.logout')

