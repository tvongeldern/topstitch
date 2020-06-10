import React from 'react';
import { string } from 'prop-types';
import styles from './styles.scss';

export function Alert({ message }) {
	if (!message) {
		return null;
	}
	return (
		<div className={styles.alert}>
			<span>
				{message}
			</span>
		</div>
	);
}

Alert.propTypes = {
	message: string,
};

Alert.defaultProps = {
	message: null,
};