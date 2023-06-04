import * as Joi from 'joi';

export const validationSchema = Joi.object({
  //? SERVER
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().empty('').default(3000),
  //? CORE
  ENABLE_DOCUMENTATION: Joi.boolean().empty('').default(false),
  //? DATABASE
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_HOST: Joi.string().empty('').default('localhost'),
  DATABASE_PORT: Joi.number().empty('').default(3306),
  //? JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXP: Joi.string()
    .regex(/(\d)+([smhdy])$/)
    .empty('')
    .default('1y'),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  JWT_EXP_REFRESH: Joi.string()
    .regex(/(\d)+([smhdy])$/)
    .empty('')
    .default('2h'),
  //? SECURITY
  ALLOWED_API_KEYS: Joi.string().required(),
  //? SENDGRID
  SENDGRID_API_KEY: Joi.string()
    .regex(/(SG\.)(.+)/)
    .required(),
  SENDGRID_FROM_EMAIL: Joi.string().email().required(),
});
