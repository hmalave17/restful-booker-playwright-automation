import 'dotenv/config';

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`
    );
  }

  return value;
}

export const environment = {
  baseUrl: getRequiredEnv('BASE_URL'),
  apiUsername: getRequiredEnv('API_USERNAME'),
  apiPassword: getRequiredEnv('API_PASSWORD')
};
