import * as Joi from 'joi';

export const createSoldierSchema = Joi.object({
  name: Joi.string().required(),
  hp: Joi.number().required(),
  level: Joi.number().required(),
  id: Joi.number().required(),
});
