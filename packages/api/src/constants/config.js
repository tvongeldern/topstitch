const {
	PORT,
	POSTGRES_DB,
	POSTGRES_HOST,
	POSTGRES_PASSWORD,
	POSTGRES_PORT,
	POSTGRES_USER,
	COGNITO_REGION,
	COGNITO_POOL_ID,
} = process.env;

const connectionString = 
`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

export const config = {
	connectionString,
	port: PORT,
};

export const COGNITO_PUBLIC_KEYS_URL = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_POOL_ID}/.well-known/jwks.json`;