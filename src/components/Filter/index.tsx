import { Select } from '@chakra-ui/react';

const FilterComponent = ({ name, options, onChange }: { name: string; options: string[]; onChange: (newOption: string) => void }) => {
	const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		const selectedValue = event.target.value;

		if (onChange) {
			onChange(selectedValue);
		}
	};
	return (
		<>
			<Select
				w={'fit-content'}
				bg={'inherit'}
				color="secondary"
				variant="unstyled"
				placeholder={name}
				_placeholder={{ backgroundColor: 'white' }}
				size="md"
				fontFamily={'Inter'}
				fontSize={16}
				fontWeight={400}
				focusBorderColor="secondary"
				iconSize="30"
				textAlign={'end'}
				mr={2}
				onChange={handleOptionChange}>
				{options.map((option, index) => (
					<option
						style={{ backgroundColor: 'white' }}
						key={index}
						value={option}
						color="secondary">
						{option}
					</option>
				))}
			</Select>
		</>
	);
};

export default FilterComponent;
