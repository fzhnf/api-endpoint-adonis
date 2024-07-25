import vine from "@vinejs/vine";

export const createReplyValidator = vine.compile(
	vine.object({
		content: vine.string().trim(),
	}),
);

/**
 * Validator to validate the payload when updating
 * an existing thread.
 */
export const updateReplyValidator = vine.compile(
	vine.object({
		content: vine.string().trim().optional(),
	}),
);
