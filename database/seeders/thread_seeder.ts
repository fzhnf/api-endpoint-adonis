import { CategoryFactory, ThreadFactory, UserFactory } from '#database/factories/factory'
import Thread from '#models/thread'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Thread.createMany([
      {
        userId: 1,
        categoryId: 1,
        title: 'Test Title 1',
        content: 'Halo bang',
      },
      {
        userId: 2,
        categoryId: 5,
        title: 'Test title 2',
        content: 'Halo bang',
      },
    ])
  }
}
