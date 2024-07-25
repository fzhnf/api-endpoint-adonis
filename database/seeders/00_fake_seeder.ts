import { CategoryFactory } from "#database/factories/category_factory";
import { ThreadFactory } from "#database/factories/thread_factory";
import { UserFactory } from "#database/factories/user_factory";
import Category from "#models/category";
import User from "#models/user";
import { BaseSeeder } from "@adonisjs/lucid/seeders";

export default class extends BaseSeeder {
	async run() {
		const category = await CategoryFactory.createMany(8);
		const user = await UserFactory.createMany(4);
		await this.#createThreadsAndReplies(category, user);
	}
	async #createThreadsAndReplies(category: Category[], user: User[]) {
		const thread = await ThreadFactory.tap((row) => {
			row.categoryId = category.at(
				Math.floor(Math.random() * category.length),
			)!.id;
			row.userId = user.at(Math.floor(Math.random() * user.length))!.id;
		})
			.with("replies", 4, (reply) =>
				reply.tap((row) => {
					row.userId = user.at(Math.floor(Math.random() * user.length))!.id;
				}),
			)
			.createMany(16);
		return thread;
	}
}
