import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { ThreadFactory } from './thread_factory.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      username: faker.internet.userName(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: '12341234',
    }
  })
  .relation('threads', () => ThreadFactory)
  .build()
