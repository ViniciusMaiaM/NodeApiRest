import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
// Yup é um package para schema e validação em tempo de execução
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';

interface ICity{
  name: string;
  state: string;
}

const bodyValidation: yup.Schema<ICity> = yup.object().shape({
  name: yup.string().required().min(3),
  state: yup.string().required().min(3)
});

interface IFilter{
  filter?: string;
}

const queryValidation: yup.Schema<IFilter> = yup.object().shape({
  filter: yup.string().required().min(3)
});

// Ao receber uma chamada é feita uma validação do body dela

export const createValidation = validation({
  body: yup.object().shape({
    nome: yup.string().required().min(3),
    state: yup.string().required().min(3),
  }),
  query: yup.object().shape({
    filter: yup.string().required().min(3)
  }),
});

// Dessa maneira se declara que a requesição necesssita do recebimento do terceiro campo(body) o ICity
export const createCityController = async (req: Request<{}, {}, ICity>, res: Response) => {

  const data = req.body;

  return res.send('Create!');
};
