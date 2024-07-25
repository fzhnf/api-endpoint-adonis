import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
	vine.object({
		username: vine
			.string()
			.trim()
			.unique(async (db, value) => {
				const match = await db
					.from("users")
					.select("id")
					.where("username", value)
					.first();
				return !match;
			}),
		fullName: vine.string().trim().optional(),
		email: vine
			.string()
			.email()
			.normalizeEmail()
			.unique(async (db, value) => {
				const match = await db
					.from("users")
					.select("id")
					.where("email", value)
					.first();
				return !match;
			}),
		password: vine.string().trim().minLength(8).confirmed(),
	}),
);

export const loginValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .exists(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !!match
      }),
    password: vine.string().trim().minLength(8),
  })
)
