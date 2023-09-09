import { Box, FormControl, Input } from '@chakra-ui/react';

const InputField = ({
	id,
	isRequired,
	type,
	placeholder,
	borderRadius,
	onChange,
	name,
	borderColor,
	_placeholder,
	color,
	onToggle,
	location,
}: {
	id: string;
	isRequired: boolean;
	type: string;
	placeholder: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	name: string;
	borderColor: string;
	_placeholder?: {
		color: string;
		opacity: string;
	};
	color: string;
	location?: string;
	borderRadius: string;
	onToggle?: Function;
}) => {
	return (
		<Box>
			<FormControl
				id={id}
				isRequired={isRequired}>
				<Input
					value={location}
					type={type}
					borderRadius={borderRadius}
					placeholder={placeholder}
					rounded={'2xl'}
					onChange={onChange}
					color={color}
					name={name}
					borderColor={borderColor}
					_placeholder={_placeholder}
					onFocus={() => {
						if (onToggle) return onToggle();
					}}
				/>
			</FormControl>
		</Box>
	);
};
export default InputField;
