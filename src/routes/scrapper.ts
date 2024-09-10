import { Router } from 'express'

import { ScrapperController } from '../controllers/scrapper.js'

export const scrapperRouter = Router()

scrapperRouter.get('/', ScrapperController.getAll)
