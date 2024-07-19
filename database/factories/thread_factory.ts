import factory from '@adonisjs/lucid/factories'
import Thread from '#models/thread'

export const ThreadFactory = factory
  .define(Thread, async ({ faker }) => {
    return {
      title: faker.lorem.word(),
      content: faker.lorem.paragraphs(5),
    }
  })
  .build()
