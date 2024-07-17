import { CategoryFactory, ThreadFactory, UserFactory } from '#database/factories/factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await ThreadFactory.createMany(10)
  }
}
