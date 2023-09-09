import { Flex, Icon, chakra } from '@chakra-ui/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: any }) => {
	const PagButton = (props: any) => {
		const activeStyle = {
			bg: 'secondary',
			_dark: {
				bg: 'secondary',
			},
			color: 'third',
			boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25);',
		};

		const handleButtonClick = () => {
			if (!props.disabled && onPageChange) {
				onPageChange(props.pageNumber);
			}
		};

		return (
			<chakra.button
				mx={1}
				px={4}
				py={2}
				rounded="md"
				bg="secondary"
				_dark={{
					bg: 'secondary',
				}}
				color="accent"
				opacity={props.disabled ? 0.6 : 1}
				_hover={!props.disabled && activeStyle}
				cursor={props.disabled && 'not-allowed'}
				onClick={handleButtonClick}
				{...(props.active && activeStyle)}>
				{props.children}
			</chakra.button>
		);
	};

	return (
		<Flex
			bg="#ffffff"
			_dark={{
				bg: '#ffffff',
			}}
			w="full"
			alignItems="center"
			justifyContent="center">
			<Flex>
				<PagButton
					disabled={currentPage === 1}
					pageNumber={currentPage - 1}>
					<Icon
						as={IoIosArrowBack}
						color="accent"
						_dark={{
							color: 'accent',
						}}
						boxSize={3}
					/>
				</PagButton>
				{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
					<PagButton
						key={page}
						active={currentPage === page}
						pageNumber={page}>
						{page}
					</PagButton>
				))}
				<PagButton
					disabled={currentPage === totalPages}
					pageNumber={currentPage + 1}>
					<Icon
						as={IoIosArrowForward}
						color="accent"
						_dark={{
							color: 'accent',
						}}
						boxSize={3}
					/>
				</PagButton>
			</Flex>
		</Flex>
	);
};

export default PaginationComponent;
