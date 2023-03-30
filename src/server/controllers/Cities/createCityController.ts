import { Request, Response } from 'express';
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

// Dessa maneira se declara que a requesição necesssita do recebimento do terceiro campo(body) o ICity
export const createCityController = async (req: Request<{}, {}, ICity>, res: Response) => {

  let validateData: ICity | undefined = undefined;

  const data = req.body;

  try{
    validateData = await bodyValidation.validate(data);
  } catch(err){
    const yupError = err as yup.ValidationError;

    return res.json({
      errors: {
        default: yupError.message,
      }
    });
  }


  return res.send('Create!');
};
