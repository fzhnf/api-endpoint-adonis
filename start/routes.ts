/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ThreadController = () => import('#controllers/thread_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('/register', [AuthController, 'register']).as('register')
        router.post('/login', [AuthController, 'login']).as('login')
        router.delete('/logout', [AuthController, 'logout']).as('logout').use(middleware.auth())

        router.get('/me', [AuthController, 'me']).as('me').use(middleware.auth())
      })
      .prefix('/auth')
      .as('auth')
  })
  .prefix('/api')

router.post('/threads', [ThreadController, 'store']).as('threads.store').use(middleware.auth())

router.get('/threads/:id', [ThreadController, 'show']).as('threads.show')
