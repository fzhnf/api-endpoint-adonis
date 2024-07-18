import Thread from '#models/thread'
import { createThreadValidator, updateThreadValidator } from '#validators/thread'
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
      const thread = await Thread.query().where('id', params.id).firstOrFail()
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

  async update({ params, auth, request, response }: HttpContext) {
    try {
      const thread = await Thread.findOrFail(params.id)

      if (auth.user?.id !== thread.userId) {
        return response.status(401).json({
          message: 'Unauthorized to update this thread',
        })
      }

      const validateData = await request.validateUsing(updateThreadValidator)
      await thread.merge(validateData).save()

      await thread?.load('category')
      await thread?.load('user')

      return response.status(200).json({
        message: 'Thread updated successfully',
        data: thread,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }

  async index({ response }: HttpContext) {
    try {
      const threads = await Thread.query().preload('category').preload('user')
      return response.status(200).json({
        message: 'Threads retrieved successfully',
        data: threads.map(({ id, title, user, category }) => ({
          thread_id: id,
          title,
          user_id: user.id,
          category_id: category.id,
        })),
      })
    } catch (error) {
      return response.status(404).json({
        message: 'Threads not found',
      })
    }
  }

  async destroy({ params, auth, response }: HttpContext) {
    try {
      const thread = await Thread.findOrFail(params.id)

      if (auth.user?.id !== thread.userId) {
        return response.status(401).json({
          message: 'Unauthorized to delete this thread',
        })
      }

      await thread.delete()
      return response.status(200).json({
        message: 'Thread deleted successfully',
      })
    } catch (error) {
      return response.status(500).json({
        error: error,
      })
    }
  }
}
