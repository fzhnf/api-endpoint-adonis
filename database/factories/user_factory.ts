import User from "#models/user";
import factory from "@adonisjs/lucid/factories";
import validator from "validator";

export const UserFactory = factory
	.define(User, async ({ faker }) => {
		const email = faker.internet.email();
		const normalizedEmail = validator.normalizeEmail(email) || email; // Fallback to original email if normalization fails
		return {
			username: faker.internet.userName(),
			fullName: faker.person.fullName(),
			email: normalizedEmail,
			password: "12341234",
		};
	})
	.build();
