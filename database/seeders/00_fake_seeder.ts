import { CategoryFactory } from '#database/factories/category_factory'
import { ThreadFactory } from '#database/factories/thread_factory'
import { UserFactory } from '#database/factories/user_factory'
import Category from '#models/category'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const category = await CategoryFactory.createMany(5)
    const user = await UserFactory.createMany(2)
    await this.#createThreads(category, user)
  }
  async #createThreads(category: Category[], user: User[]) {
    await ThreadFactory.tap((row) => {
      row.categoryId = category.at(Math.floor(Math.random() * category.length))!.id
      row.userId = user.at(Math.floor(Math.random() * user.length))!.id
    }).createMany(10)
  }
}
