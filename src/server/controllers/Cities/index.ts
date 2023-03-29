// Arquivo responsavel de agrupar todas as controllers em uma única variável
// Dessa maneira conseguimos todos os atributos presentes no controller
import * as createCityController from './createCityController';

export const CitiesController = {
  ...createCityController,
};
