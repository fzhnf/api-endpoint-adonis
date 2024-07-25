import Thread from "#models/thread";
import { createReplyValidator } from "#validators/reply";
import type { HttpContext } from "@adonisjs/core/http";

export default class RepliesController {
	/**
	 * Display a list of resource
	 */
	async index({ response, params }: HttpContext) {
		const thread = await Thread.findOrFail(params.threadId);
		await thread.load("replies");
		return response.status(200).json({
			message: `replies for thread:${thread.title} retrieved successfully`,
			thread,
		});
	}

	/**
	 * Display form to create a new record
	 */
	async create({}: HttpContext) {}

	/**
	 * Handle form submission for the create action
	 */
	async store({ request, params, auth, response }: HttpContext) {
		const { content } = await request.validateUsing(createReplyValidator);
		const thread = await Thread.findOrFail(params.threadId);
		const reply = await thread.related("replies").create({
			userId: auth.user?.id,
			content,
		});
		await reply.load("user");
		await reply.load("thread");
		return response.status(201).json(reply);
	}

	/**
	 * Show individual record
	 */
	async show({ params }: HttpContext) {}

	/**
	 * Edit individual record
	 */
	async edit({ params }: HttpContext) {}

	/**
	 * Handle form submission for the edit action
	 */
	async update({ params, request }: HttpContext) {}

	/**
	 * Delete record
	 */
	async destroy({ params }: HttpContext) {}
}
