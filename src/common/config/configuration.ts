export const configuration = (): configurationType => ({
  //? SERVER
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT || '3000', 10),
  //? CORE
  ENABLE_DOCUMENTATION: process.env.ENABLE_DOCUMENTATION === 'true',
  //? DATABASE
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: +process.env.DATABASE_PORT,
  //? JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXP: process.env.JWT_EXP,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_EXP_REFRESH: process.env.JWT_EXP_REFRESH,
  //? SECURITY
  ALLOWED_API_KEYS: process.env.ALLOWED_API_KEYS,
  //? SENDGRID
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
});

type configurationType = {
  NODE_ENV: string;
  PORT: number;
  ENABLE_DOCUMENTATION: boolean;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  JWT_SECRET: string;
  JWT_EXP: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_EXP_REFRESH: string;
  ALLOWED_API_KEYS: string;
  SENDGRID_API_KEY: string;
  SENDGRID_FROM_EMAIL: string;
};
