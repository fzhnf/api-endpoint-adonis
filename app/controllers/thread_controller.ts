import Thread from '#models/thread'
import { createThreadValidator } from '#validators/thread'
import type { HttpContext } from '@adonisjs/core/http'

export default class ThreadController {
  async store({ request, auth, response }: HttpContext) {
    const validateData = await request.validateUsing(createThreadValidator)
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
      const thread = await Thread.findOrFail(params.id)
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
}
