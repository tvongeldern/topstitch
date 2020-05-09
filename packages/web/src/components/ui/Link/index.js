import React from 'react';
import { } from 'prop-types';
import NextLink from 'next/link';

export function Link({
	children,
	className,
	target,
	...rest }) {
	return (
		<NextLink {...rest}>
			<a
				className={className}
				target={target}
			>{children}</a>
		</NextLink>
	);
}

Link.propTypes = {};