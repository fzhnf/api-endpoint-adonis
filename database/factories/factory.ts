import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import Category from '#models/category'
import Thread from '#models/thread'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      username: faker.internet.userName(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  .relation('threads', () => ThreadFactory)
  .build()

export const CategoryFactory = factory
  .define(Category, async ({ faker }) => {
    return {
      title: faker.lorem.word(),
    }
  })
  .build()

export const ThreadFactory = factory
  .define(Thread, async ({ faker }) => {
    return {
      title: faker.lorem.word(),
      content: faker.lorem.paragraphs(5),
      categoryId: faker.number.int({ min: 1, max: 5 }),
    }
  })
  .build()
