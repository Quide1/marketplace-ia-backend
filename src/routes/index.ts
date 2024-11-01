import { Router } from "express";
import { llmRouter } from "./llm";
import { scrapperRouter } from "./scrapper";

const mainRouter = Router();

mainRouter.use('/llm', llmRouter);        // El router para '/llm'
mainRouter.use('/scrapper', scrapperRouter);  // El router para '/scrapper'

// Exportar el router principal
export default mainRouter;
