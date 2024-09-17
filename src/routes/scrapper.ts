import { Router } from 'express'

import { ScrapperController } from '../controllers/scrapper'

export const scrapperRouter = Router()

scrapperRouter.get('/', ScrapperController.generateScrap)
