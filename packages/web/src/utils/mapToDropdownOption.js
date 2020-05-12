export function mapToDropdownOption({ id, name }) {
	return {
		value: id,
		children: name,
	};
}
