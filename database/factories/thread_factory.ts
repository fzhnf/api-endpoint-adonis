import Thread from "#models/thread";
import factory from "@adonisjs/lucid/factories";
import { ReplyFactory } from "./reply_factory.js";

export const ThreadFactory = factory
	.define(Thread, async ({ faker }) => {
		return {
			title: faker.lorem.word(),
			content: faker.lorem.paragraph(),
		};
	})
	.relation("replies", () => ReplyFactory)
	.build();
