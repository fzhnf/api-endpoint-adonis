import Category from '#models/category'
import factory from '@adonisjs/lucid/factories'
import { ThreadFactory } from './thread_factory.js'

export const CategoryFactory = factory

  .define(Category, async ({ faker }) => {
    return {
      title: faker.lorem.word(),
    }
  })
  .relation('threads', () => ThreadFactory)
  .build()
