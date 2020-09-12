import { Router, response } from 'express';
import compensationsRouter from '@modules/compensations/infra/http/routes/compensations.routes';

const routes = Router();

routes.use('/compensations', compensationsRouter);

export default routes;
