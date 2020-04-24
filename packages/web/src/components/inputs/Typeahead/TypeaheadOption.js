import React from 'react';
import { func, object, number, bool } from 'prop-types';
import typeaheadStyles from './styles.scss';

const { dropdownOption } = typeaheadStyles;

export function TypeaheadOption({
	isFocused,
	option,
	optionComponent: Option,
	focusOption,
	resultsIndex,
	selectOption,
}) {
	const hoverHandler = () => {
		focusOption(resultsIndex);
	};
	const clickHandler = () => {
		selectOption(option);
	};
	return (
		<div
			className={dropdownOption}
			onClick={clickHandler}
			onMouseOver={hoverHandler}
			onFocus={hoverHandler}
		>
			<Option {...option} isFocused={isFocused} />
		</div>
	);
}


TypeaheadOption.propTypes = {
	isFocused: bool.isRequired,
	option: object.isRequired,
	optionComponent: func.isRequired,
	resultsIndex: number.isRequired,
	selectOption: func.isRequired,
	focusOption: func.isRequired,
};
