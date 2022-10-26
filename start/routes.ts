
import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('welcome')

Route.on('/signup').render('auth.signup').middleware('guest')
Route.post('/signup', 'AuthController.storeSignup')

Route.on('/login').render('auth.login').middleware('guest')
Route.post('/login', 'AuthController.storeLogin')

Route.post('/logout', 'AuthController.logout')

Route.post('/verify-email', 'EmailVerifyController.index').middleware('auth')
//Route.get('/verify-email/:userid/:token', 'EmailVerifyController.store')

Route.get('/:username', 'ProfileController.index').middleware('auth')

