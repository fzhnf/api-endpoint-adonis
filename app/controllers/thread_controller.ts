import Thread from '#models/thread'
import { threadValidator } from '#validators/thread'
import type { HttpContext } from '@adonisjs/core/http'

export default class ThreadController {
  async store({ request, auth, response }: HttpContext) {
    const validateData = await request.validateUsing(threadValidator)
    try {
      const thread = await auth.user?.related('threads').create(validateData)
      await thread?.load('category')
      await thread?.load('user')
      return response.status(201).json({
        message: 'Thread created successfully',
        data: thread,
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Failed to create thread',
        error: error.message,
      })
    }
  }
  async show({ params, response }: HttpContext) {
    try {
      const thread = await Thread.query()
        .where('id', params.id)
        .preload('category')
        .preload('user')
        .firstOrFail()
      return response.status(200).json({
        message: 'Thread retrieved successfully',
        data: thread,
      })
    } catch (error) {
      return response.status(404).json({
        message: 'Thread not found',
        error: error.message,
      })
    }
  }

  async index({ response }: HttpContext) {
    try {
      const threads = await Thread.query().preload('category').preload('user')
      return response.status(200).json({
        message: 'Threads retrieved successfully',
        data: threads,
      })
    } catch (error) {
      return response.status(404).json({
        message: 'Threads not found',
      })
    }
  }
}
