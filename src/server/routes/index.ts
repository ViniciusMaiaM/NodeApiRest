import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
// Importação de todos os controllers salvos no controllers index
import { CitiesController } from '../controllers';

const router = Router();

router.get('/', (req, res) => {

  return res.send('Olá, DEV!');
});

// Já que todas as rotas do controller foram importadas, as aplicações podem ser simplifcadas desta maneira
router.post(
  '/cities', 
  CitiesController.createValidation,
  CitiesController.createCityController
);

export { router };
