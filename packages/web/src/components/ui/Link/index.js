import React from 'react';
import { } from 'prop-types';
import NextLink from 'next/link';

export function Link({ children, className, ...rest }) {
	return (
		<NextLink {...rest}>
			<a className={className}>{children}</a>
		</NextLink>
	);
}

Link.propTypes = {};