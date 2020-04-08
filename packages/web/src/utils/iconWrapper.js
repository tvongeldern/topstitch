import React from 'react';

const DEFAULT_SIZE = 16;

function defaultIconProps({ size = DEFAULT_SIZE, color, ...rest }) {
	return {
		width: size,
		height: size,
		fill: color,
		...rest,
	};
}

export function iconWrapper(
	SvgComponent,
	mapPropsToChild = defaultIconProps,
) {
	return function Icon(props) {
		return <SvgComponent {...mapPropsToChild(props)} />;
	}
}
