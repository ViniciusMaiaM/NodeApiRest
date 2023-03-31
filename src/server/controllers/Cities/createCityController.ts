import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
// Yup é um package para schema e validação em tempo de execução
import * as yup from 'yup';

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

export const createQueryValidator: RequestHandler = async (req, res, next) => {
  try{
    await queryValidation.validate(req.body, { abortEarly: false });
    return next();
  } catch(err){
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    // Mapeação e agrupamento de todos os erros que aconteceram
    yupError.inner.forEach(error => {
      // Caminho para o atributo do erro e a mensagem
      if(error.path === undefined) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors,
    });
  }
}; 

// Ao receber uma chamada é feita uma validação do body dela
export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try{
    await bodyValidation.validate(req.body, { abortEarly: false });
    return next();
  } catch(err){
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    // Mapeação e agrupamento de todos os erros que aconteceram
    yupError.inner.forEach(error => {
      // Caminho para o atributo do erro e a mensagem
      if(error.path === undefined) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors,
    });
  }
}; 

// Dessa maneira se declara que a requesição necesssita do recebimento do terceiro campo(body) o ICity
export const createCityController = async (req: Request<{}, {}, ICity>, res: Response) => {

  const data = req.body;

  return res.send('Create!');
};
