import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CarryOutCompensationsService from '@modules/compensations/services/CarryOutCompensationsService';

export default class CompensationsController {
    public async execute(
        request: Request,
        response: Response
    ): Promise<Response> {
        const carryOutCompensations = container.resolve(
            CarryOutCompensationsService
        );
        const compensations = await carryOutCompensations.execute();
        return response.json(compensations);
    }
}
