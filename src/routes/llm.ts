import { Router } from 'express'

import { llmController } from '../controllers/llm'

export const llmRouter = Router()

llmRouter.get('/', llmController.generateResponse)
