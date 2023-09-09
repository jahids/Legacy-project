import { HStack, Box, Flex } from '@chakra-ui/react';

function TechnicianProgressBar({ pagenumber }: { pagenumber: number }) {
	return (
		<Box>
			<HStack gap="1.5rem">
				<Flex
					justify={'center'}
					alignItems={'center'}
					bgColor={'third'}
					border={'0.10rem solid '}
					borderColor={'third'}
					h={'2.5rem'}
					w={'6rem'}
					transform={'skew(30deg)'}>
					<Box
						h={'1.75rem'}
						w={'1.75rem'}
						color={'secondary'}
						transform={'skew(-30deg)'}
						border={'.15rem solid '}
						borderColor={'secondary'}
						borderRadius={'50%'}
						textAlign={'center'}
						fontWeight={'700'}>
						1
					</Box>
				</Flex>
				<Flex
					justify={'center'}
					alignItems={'center'}
					bgColor={pagenumber >= 2 ? 'third' : 'secondary'}
					border={'0.10rem solid '}
					borderColor={'third'}
					h={'2.5rem'}
					w={'6rem'}
					transform={'skew(30deg)'}>
					<Box
						h={'1.75rem'}
						w={'1.75rem'}
						color={pagenumber < 2 ? 'third' : 'secondary'}
						transform={'skew(-30deg)'}
						border={'.15rem solid '}
						borderColor={pagenumber < 2 ? 'third' : ''}
						borderRadius={'50%'}
						textAlign={'center'}
						fontWeight={'700'}>
						2
					</Box>
				</Flex>
				<Flex
					justify={'center'}
					alignItems={'center'}
					bgColor={pagenumber >= 3 ? 'third' : 'secondary'}
					border={'0.10rem solid '}
					borderColor={'third'}
					h={'2.5rem'}
					w={'6rem'}
					transform={'skew(30deg)'}>
					<Box
						h={'1.75rem'}
						w={'1.75rem'}
						color={pagenumber < 3 ? 'third' : 'secondary'}
						transform={'skew(-30deg)'}
						border={'.15rem solid '}
						borderColor={pagenumber < 3 ? 'third' : ''}
						borderRadius={'50%'}
						textAlign={'center'}
						fontWeight={'700'}>
						3
					</Box>
				</Flex>
			</HStack>
		</Box>
	);
}

export default TechnicianProgressBar;
