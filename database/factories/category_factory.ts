import Category from "#models/category";
import factory from "@adonisjs/lucid/factories";

export const CategoryFactory = factory
	.define(Category, async ({ faker }) => {
		return {
			title: faker.lorem.word(),
		};
	})
	.build();
