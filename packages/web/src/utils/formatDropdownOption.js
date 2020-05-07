export function formatDropdownOption({ id, name }) {
	return {
		value: id,
		children: name,
	};
}
