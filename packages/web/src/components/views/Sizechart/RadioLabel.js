import cn from 'classnames';
import styles from './styles.scss';

export function RadioLabel({
	defaultSelected,
	input,
	label,
	meta,
	...props
}) {
	const classNames = {
		[styles.radioLabel]: true,
		[styles.selected]: input.checked,
		[styles.defaultSelected]: defaultSelected,
	};
	return (
		<label
			{...props}
			className={cn(classNames)}>
			<span>{label}</span>
			<input type="radio" {...input} />
		</label>
	)
}
