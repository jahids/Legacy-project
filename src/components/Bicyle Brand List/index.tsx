import { Box, Center } from '@chakra-ui/react';

const BicycleBrandList = ({ item }: { item: string }) => {
	return (
		<Box
			w={'5.75rem'}
			m={1}
			bg={'accent'}
			color={'secondary'}
			borderRadius={'.63rem'}
			p={'.45rem'}
			fontSize={'.95rem'}
			fontFamily={'Inter'}>
			<Center>
				<strong>{item}</strong>
			</Center>
		</Box>
	);
};

export default BicycleBrandList;
