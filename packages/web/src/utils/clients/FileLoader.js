import Amplify, { Storage } from 'aws-amplify';
import config from '@constants/config';

Amplify.configure({
	Storage: {
		AWSS3: {
			bucket: config.S3_BUCKET,
		},
	},
});

export const FileLoader = Storage;
