import React, { useState } from 'react';
import { arrayOf, func, object, string, number } from 'prop-types';
import cn from 'classnames';
import { XOut } from '@components/icons';
import { TypeaheadOption } from './TypeaheadOption';
import styles from './styles.scss';

const {
	dropdownContainer,
	errorText,
	inputContainer,
	noResults,
	selectedOptionField,
} = styles;

const INITIAL_STATE = { textInputValue: '', focusedOptionIndex: 0 };

function matchFormat(str = '') {
	return String(str).toLowerCase();
}

function filterFunction({ exactMatchFields, searchFields, textInputValue }) {
	if (!textInputValue) return () => false;
	const formattedValue = matchFormat(textInputValue);
	function partialMatchFilter(option) {
		return searchFields
			.find((field) => matchFormat(option[field]).includes(formattedValue));
	}
	if (!exactMatchFields.length) {
		return partialMatchFilter;
	}
	return function filterOptionsWithExact(option) {
		return partialMatchFilter(option)
			|| exactMatchFields
				.find((field) => matchFormat(option[field]) === formattedValue);
	};
}

function changeHandler({ search, minLength, setState, state }) {
	return function searchEvent(evt) {
		const { value = '' } = evt.target;
		setState({ ...state, textInputValue: value });
		return value.length >= minLength && search(value);
	};
}

export function Typeahead({
	exactMatchFields,
	input: { name, onChange, value },
	label,
	meta: {
		error,
		initial,
		modified,
		submitFailed,
		touched,
	},
	minLength,
	options,
	outputField,
	optionComponent,
	search,
	searchFields,
	selectedDisplayField,
	className,
	...rest
}) {
	const [state, setState] = useState(INITIAL_STATE);
	const {
		focusedOptionIndex,
		selectedOption,
		textInputValue,
	} = state;
	if (value === '' && selectedOption) {
		const {
			selectedOption: deleted,
			...newState
		} = state;
		setState(newState);
	}
	const elementId = `typeahead-${name}`;
	const renderOption = optionComponent || ((option) => option[selectedDisplayField]);
	const filteredOptions = options
	.filter(filterFunction({ exactMatchFields, searchFields, textInputValue }));
	const showDropdown = textInputValue && textInputValue.length >= minLength;
	const showErrorMessage = error && !showDropdown
		&& ((touched && modified) || submitFailed || initial);
	const setFocusIndex = (index) => {
		setState({
			...state,
			focusedOptionIndex: index,
		});
	};
	const setSelectedOption = (option) => {
		onChange(option[outputField]);
		setState({
			...state,
			textInputValue: '',
			selectedOption: option,
		});
	};
	const clearSelectedOption = () => {
		onChange(null);
		setState({
			...state,
			textInputValue: '',
			selectedOption: null,
		});
	};
	const keyPressHandler = ({ keyCode }) => {
		if ([40, 9].includes(keyCode)) {
			setFocusIndex(focusedOptionIndex + 1);
		} else if ([38].includes(keyCode)) {
			setFocusIndex(focusedOptionIndex - 1);
		} else if ([13].includes(keyCode)) {
			setSelectedOption(filteredOptions[focusedOptionIndex]);
		}
	};
	return (
		<div className={cn(inputContainer, className)}>
			{label && <label htmlFor={elementId}>{label}</label>}
			{
				!selectedOption ? (
					<>
						<input
							{...rest}
							type="text"
							id={elementId}
							value={textInputValue}
							onChange={changeHandler({ minLength, search, setState, state })}
							autoComplete="off"
							onKeyDown={keyPressHandler}
						/>
						{showErrorMessage && <p className={errorText}>{error}</p>}
						{showDropdown && (
							<div className={dropdownContainer}>
								{filteredOptions.map((option, index) => (
									<TypeaheadOption
										key={option[outputField]}
										option={option}
										optionComponent={renderOption}
										resultsIndex={index}
										focusOption={setFocusIndex}
										selectOption={setSelectedOption}
										isFocused={index === focusedOptionIndex}
									/>
								))}
								{filteredOptions.length === 0 && (
									<div className={noResults}>
										<span>{`No matches found for ${textInputValue}`}</span>
									</div>
								)}
							</div>
						)}
					</>
				) : (
						<div className={selectedOptionField} onClick={clearSelectedOption}>
							<XOut size={16} />
							<span>{selectedOption[selectedDisplayField]}</span>
						</div>
					)
			}
		</div>
	);
}

Typeahead.propTypes = {
	input: object.isRequired,
	meta: object.isRequired,
	options: arrayOf(object).isRequired, // results/options to filter from
	label: string, // input label
	search: func, // function to that requests matches for input value
	optionComponent: func, // render instructions for each option
	minLength: number, // minimum number of input characters before requesting results
	searchFields: arrayOf(string), // partial match fields to search by
	exactMatchFields: arrayOf(string), // search fields that must match exactly
	outputField: string, // field from selected option that is used as the form value
	selectedDisplayField: string, // field to display selected option
	className: string, // className is passed to container element
};

Typeahead.defaultProps = {
	exactMatchFields: [],
	label: null,
	minLength: 3,
	outputField: 'id',
	optionComponent: null,
	search: null,
	searchFields: ['name'],
	selectedDisplayField: 'name',
	className: null,
};
