import Reply from "#models/reply";
import factory from "@adonisjs/lucid/factories";

export const ReplyFactory = factory
	.define(Reply, async ({ faker }) => {
		return {
			content: faker.lorem.sentence(),
		};
	})
	.build();

