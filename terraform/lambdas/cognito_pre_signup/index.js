exports.handler = async (event) => {
	const { response = {} } = event;
	return {
		...event,
		response: {
			...response,
			autoConfirmUser: true,
			autoVerifyEmail: true,
		},
	};
};
