import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema, ValidationError } from 'yup';

// Para declarar que ele é uma função que retorna RequestHandler é mais fácil e mais legível utilizar o type ao inves de interface
type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

type TProperty = 'body' | 'header' | 'params' | 'query';

type TallSchemas = Record<TProperty, Schema<any>>;

type TGetSchema = <T>(schema: Schema<T>) => Schema<T>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TallSchemas>;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas((schema) => schema);

  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try{
      schema.validateSync(req[key as TProperty], { abortEarly: false });
    } catch(err){
      const yupError = err as ValidationError;
      const errors: Record<string, string> = {};
  
      // Mapeação e agrupamento de todos os erros que aconteceram
      yupError.inner.forEach(error => {
        // Caminho para o atributo do erro e a mensagem
        if(error.path === undefined) return;
        errors[error.path] = error.message;
      });
      
      errorsResult[key as TProperty] = errors;
    }
  });

  if (Object.entries(errorsResult).length === 0){
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
  }
};
