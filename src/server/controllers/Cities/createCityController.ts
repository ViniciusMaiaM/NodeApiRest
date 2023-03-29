import { Request, Response } from 'express';

interface ICity{
  name: string;
}


// Dessa maneira se declara que a requesição necesssita do recebimento do terceiro campo(body) o ICity
export const createCityController = (req: Request<{}, {}, ICity>, res: Response) => {

  const data = req.body;

  return res.send('Create!');
};
