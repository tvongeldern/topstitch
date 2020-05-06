import React from 'react';
import { arrayOf, node, oneOfType, string } from 'prop-types';
import Head from 'next/head';
import { NavBar } from '../NavBar';
import styles from './styles.scss';

const BASE_TITLE = 'Topstitch';
const RETURN_SELF = (v) => v;

export function Page({
	children,
	error,
	title,
}) {
	const pageTitle = [BASE_TITLE, title].filter(RETURN_SELF).join(' | ');
	return (
		<div className={styles.container}>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<NavBar />
			<div className={styles.content}>
				{error || children}
			</div>
		</div>
	);
}

Page.propTypes = {
	children: oneOfType([node, arrayOf(node)]),
	title: string,
};

Page.defaultProps = {
	children: null,
	title: null,
};
