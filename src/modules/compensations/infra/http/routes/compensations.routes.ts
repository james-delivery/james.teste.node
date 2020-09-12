import { Router } from 'express';
import CompensationsController from '@modules/compensations/infra/http/controllers/CompensationsController';
import ensureAuthenticated from '@modules/compensations/infra/http/middlewares/ensureAuthenticated';

const compensationsRouter = Router();
const compensationsController = new CompensationsController();

compensationsRouter.post(
    '/execute',
    ensureAuthenticated,
    compensationsController.execute
);

export default compensationsRouter;
