import { Box } from '@chakra-ui/react';

const SolidVerticalRectangle = ({ width, height, marginLeft, bgColor }: { width: string; height: string; marginLeft?: string; bgColor: string }) => {
	return (
		<Box
			h={height}
			w={width}
			ml={marginLeft}
			bg={bgColor}
		/>
	);
};

export default SolidVerticalRectangle;
