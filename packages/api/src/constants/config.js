const {
	COGNITO_POOL_ID,
	COGNITO_REGION,
	PORT,
	POSTGRES_DB,
	POSTGRES_HOST,
	POSTGRES_PASSWORD,
	POSTGRES_PORT,
	POSTGRES_USER,
	DATABASE_URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`,
} = process.env;

export const config = {
	connectionString: DATABASE_URL,
	port: PORT,
};

export const COGNITO_PUBLIC_KEYS_URL = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_POOL_ID}/.well-known/jwks.json`;
