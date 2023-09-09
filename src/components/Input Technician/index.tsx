import { Box, FormControl, Input, Text } from '@chakra-ui/react';
import { ChangeEventHandler } from 'react';

const InputTechnician = ({ id, isRequired, type, label, name, placeholder, colorScheme, onChange, value }: { id: string; isRequired: boolean; type: string; label: string; name: string; placeholder: string; colorScheme: string; onChange: ChangeEventHandler<HTMLInputElement>; value: string }) => {
	// console.log(`${value}`, value);
	return (
		<Box>
			<FormControl
				id={id}
				isRequired={isRequired}>
				<Text
					fontSize={'1.5rem'}
					fontWeight={'500'}
					color={colorScheme}>
					{label}
				</Text>
				<Input
					mb={'2rem'}
					type={type}
					placeholder={placeholder}
					variant={'unstyled'}
					_placeholder={{ color: 'colorScheme', borderColor: 'colorScheme', fontSize: '1rem', fontWeight: '500' }}
					_focusVisible={{ borderColor: 'colorScheme' }}
					paddingBottom={'0.10rem'}
					borderRadius={'0'}
					borderBottom={'0.125rem solid'}
					borderBottomColor={colorScheme}
					color={colorScheme}
					name={name}
					onChange={onChange}
					value={value}
				/>
			</FormControl>
		</Box>
	);
};

export default InputTechnician;
