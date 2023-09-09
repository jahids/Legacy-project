import { AspectRatio, Flex, Text, Icon } from '@chakra-ui/react';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
const VideoContainer = ({ src }: { src: string }) => {
	return (
		<>
			<AspectRatio
				ratio={16 / 9}
				flex={0.9}>
				<iframe
					title="brakes"
					src=""
					allowFullScreen
				/>
			</AspectRatio>
		</>
	);
};

export default VideoContainer;
