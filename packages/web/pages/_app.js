import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import { provideStore } from '@state/store';
import { populatePage } from '@utils/hoc';

class Topstitch extends App {
	static async getInitialProps({ Component, ctx }) {
		const Container = populatePage(Component);
		const initialProps = await Container.getInitialProps(ctx);
		return { initialProps };
	}
	render() {
		const { Component, initialProps, store } = this.props;
		return (
			<Provider store={store}>
				<Component {...initialProps} />
			</Provider>
		)
	}
}

export default provideStore(Topstitch);
