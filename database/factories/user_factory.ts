import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { ThreadFactory } from './thread_factory.js'
import validator from "validator";

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      password: '12341234',
    }
  })
  .relation('threads', () => ThreadFactory)
  .build()
		const email = faker.internet.email();
		const normalizedEmail = validator.normalizeEmail(email) || email; // Fallback to original email if normalization fails
			username: faker.internet.userName(),
			fullName: faker.person.fullName(),
			email: normalizedEmail,
