import { Request, Response } from 'express';
// Yup é um package para schema e validação em tempo de execução
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface ICity{
  name: string;
}

// Ao receber uma chamada é feita uma validação do body dela

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICity>(yup.object().shape({
    name: yup.string().required().min(3)
  }))
}));

// Dessa maneira se declara que a requesição necesssita do recebimento do terceiro campo(body) o ICity
export const createCityController = async (req: Request<{}, {}, ICity>, res: Response) => {

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
};
