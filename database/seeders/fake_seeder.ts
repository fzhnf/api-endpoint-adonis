import { CategoryFactory, UserFactory } from '#database/factories/factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await CategoryFactory.createMany(5)
    await UserFactory.with('threads', 3).createMany(3)
  }
}
