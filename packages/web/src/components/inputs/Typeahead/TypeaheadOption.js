import React from 'react';
import { func, object, number, bool } from 'prop-types';
import cn from 'classnames';
import typeaheadStyles from './styles.scss';

const { dropdownOption, focused } = typeaheadStyles;

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
			className={cn(dropdownOption, { [focused]: isFocused })}
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
