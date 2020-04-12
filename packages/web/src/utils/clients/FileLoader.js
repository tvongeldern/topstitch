import axios from 'axios';
import Cookies from 'universal-cookie';
import downloadFile from 'js-file-download';
import config from '@constants/config';

const headers = {
	Accept: 'application/json',
	'Content-Type': 'multipart/form-data',
};

const cookiesClient = new Cookies();

function parseSuccessResponse({ data } = {}) {
	return data;
}

function parseErrorResponse(error) {
	const { response: { data = {}, status, statusText } } = error;
	const { message } = error.toJSON();
	return Promise.reject({
		message,
		status,
		statusText,
		...data,
	});
}

const instance = axios.create({
	headers,
	timeout: 30000,
	baseURL: config.API_HOST,
});
instance.interceptors.response.use(parseSuccessResponse, parseErrorResponse);
instance.interceptors.request.use((requestConfig) => ({
	...requestConfig,
	headers: {
		...requestConfig.headers,
		Authorization: `Bearer ${cookiesClient.get(config.AUTH_TOKEN_COOKIE_NAME)}`,
	},
}));

export const FileLoader = {
	upload: function uploadFile(url, file, onUploadProgress) {
		const data = new FormData();
		data.set('file', file);
		return instance.post(url, data, { onUploadProgress });
	},
	download: async function downloadFromUrl(url, filename) {
		// Doesn't work in Safari 12
		// https://stackoverflow.com/questions/53048734/safari-12-wont-download-a-pdf-blob
		// https://bugs.webkit.org/show_bug.cgi?id=197441
		// https://bugs.webkit.org/show_bug.cgi?id=190351
		const response = await instance.get(url, { responseType: 'blob' });
		downloadFile(response, filename);
		return response;
	},
};
