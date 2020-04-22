import axios from 'axios';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { COGNITO_PUBLIC_KEYS_URL } from '@constants/config';
import { Logger } from '@utils';

// https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html

const middlewareLogger = new Logger().context('auth middleware');
let verifyToken;

async function getTokenVerifier() {
	try {
		const response = await axios(COGNITO_PUBLIC_KEYS_URL);
		const [jwk] = response?.data?.keys || [];
		middlewareLogger.success('Found public key');
		const PEM = jwkToPem(jwk);
		return function jwtVerifier(token) {
			return new Promise((resolve, reject ) => {
				jwt.verify(token, PEM, { algorithms: ['RS256'] }, function (error, decodedToken) {
					if (error) {
						return reject(error);
					}
					return resolve(decodedToken);
				});
			});	
		}
	} catch (error) {
		middlewareLogger.error('Could not find public key');
	}
}

getTokenVerifier().then((verifier) => { verifyToken = verifier; });


export async function authMiddleware(
	request,
	response,
	next,
) {
	if (!verifyToken) {
		return response.status(500).send({ message: 'No way to decode auth tokens' });
	}
	const { authorization } = request.headers;
	if (!authorization) {
		return next();
	}
	const [src, token] = authorization.split(' ');
	try {
		const jwt = await verifyToken(token);
		request.jwt = jwt;
	} catch (error) {
		request.metadata.autherror = error;
	}
	next();
}
