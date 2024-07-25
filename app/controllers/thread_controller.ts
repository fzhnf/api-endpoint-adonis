import Thread from "#models/thread";
import {
	createThreadValidator,
	updateThreadValidator,
} from "#validators/thread";
import type { HttpContext } from "@adonisjs/core/http";

export default class ThreadController {
	async store({ request, auth, response }: HttpContext) {
		const validateData = await request.validateUsing(createThreadValidator);
		const thread = await auth.user?.related("threads").create(validateData);
		await thread?.load("category");
		await thread?.load("user");
		return response.status(201).json({
			message: "Thread created successfully",
			data: thread,
		});
	}

	async show({ params, response }: HttpContext) {
		const thread = await Thread.query()
			.where("id", params.id)
			.preload("category")
			.preload("user")
			.preload("replies")
			.firstOrFail();

		return response.status(200).json({
			message: "Thread retrieved successfully",
			data: thread,
		});
	}

	async update({ params, auth, request, response }: HttpContext) {
		try {
			const thread = await Thread.findOrFail(params.id);

			if (auth.user?.id !== thread.userId) {
				return response.status(401).json({
					message: "Unauthorized to update this thread",
				});
			}

			const validateData = await request.validateUsing(updateThreadValidator);
			await thread.merge(validateData).save();

			await thread?.load("category");
			await thread?.load("user");

			return response.status(200).json({
				message: "Thread updated successfully",
				data: thread,
			});
		} catch (error) {
			return response.status(400).json({
				message: error.message,
			});
		}
	}

	async index({ request, response }: HttpContext) {
		const page = request.input("page", 1);
		const perPage = request.input("per_page", 10);
		const threads = await Thread.query()
			.preload("category")
			.preload("user")
			.preload("replies")
			.paginate(page, perPage);
		return response.status(200).json({
			message: "Threads retrieved successfully",
			threads,
		});
	}

	async destroy({ params, auth, response }: HttpContext) {
		const thread = await Thread.findOrFail(params.id);

		if (auth.user?.id !== thread.userId) {
			return response.status(401).json({
				message: "Unauthorized to delete this thread",
			});
		}

		await thread.delete();
		return response.status(200).json({
			message: "Thread deleted successfully",
		});
	}
}
