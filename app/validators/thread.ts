import vine from "@vinejs/vine";

/**
 * Validator to validate the payload when creating
 * a new thread.
 */
export const createThreadValidator = vine.compile(
	vine.object({
		title: vine.string().trim().maxLength(255),
		content: vine.string().trim(),
		categoryId: vine.number().exists(async (db, value) => {
			const match = await db
				.from("categories")
				.select("id")
				.where("id", value)
				.first();
			return !!match;
		}),
	}),
);

/**
 * Validator to validate the payload when updating
 * an existing thread.
 */
export const updateThreadValidator = vine.compile(
	vine.object({
		title: vine.string().trim().maxLength(255).optional(),
		content: vine.string().trim().optional(),
		categoryId: vine
			.number()
			.exists(async (db, value) => {
				const match = await db
					.from("categories")
					.select("id")
					.where("id", value)
					.first();
				return !!match;
			})
			.optional(),
	}),
);

export const sortThreadValidator = vine.compile(
	vine.object({
		sort_by: vine
			.enum([
				"id",
				"user_id",
				"category_id",
				"title",
				"created_at",
				"updated_at",
			])
			.optional(),
		order: vine.enum(["asc", "desc"]).optional(),
	}),
);
