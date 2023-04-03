// Arquivo responsavel de agrupar todas as controllers em uma única variável
// Dessa maneira conseguimos todos os atributos presentes no controller
import * as createCityController from './createCityController';
import * as getAllController from './getAllController';

export const CitiesController = {
  ...createCityController,
  ...getAllController,
};
