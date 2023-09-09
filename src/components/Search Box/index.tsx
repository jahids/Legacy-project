import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

const SearchBox = ({ handleInputChange }: { handleInputChange: (input: string) => void }) => {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const inputValue = event.target.value;

		handleInputChange(inputValue);
	};

	return (
		<Flex
			alignItems="center"
			justifyContent="flex-start"
			p={2}
			gap={2}
			w="350px"
			borderRadius="15px"
			bg="rgba(217, 217, 217, 0.01)">
			<InputGroup>
				<InputLeftElement pointerEvents="none">
					<SearchIcon
						color="gray.500"
						fontSize={20}
					/>
				</InputLeftElement>
				<Input
					type="text"
					placeholder="Search Cases By Name..."
					focusBorderColor="secondary"
					onChange={handleChange}
					bg="#f7f7f7"
					color="#001f3f"
					borderColor="#001f3f"
					width="350px"
					fontFamily="Inter, sans-serif"
					fontSize="16px"
					fontStyle="normal"
					fontWeight="400"
					lineHeight="6px"
					_placeholder={{ color: '#757474', opacity: 1 }}
				/>
			</InputGroup>
		</Flex>
	);
};

export default SearchBox;
