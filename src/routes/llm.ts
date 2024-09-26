import { Router } from 'express'

import { llmController } from '../controllers/llm'

export const llmRouter = Router()

llmRouter.post('/', llmController.generateResponse)
