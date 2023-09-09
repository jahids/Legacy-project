import { GridItem, Progress } from '@chakra-ui/react';
import { healthColorChoose } from '../../utils/healthColorChoose';

export default function FullHealthBar({ health }: { health: number }) {
	return (
		<GridItem
			colSpan={4}
			alignItems={'center'}
			marginTop={'auto'}
			marginBottom={'auto'}>
			<Progress
				bg={'gray.500'}
				value={health}
				colorScheme={`${healthColorChoose(health)}`}
				borderRadius={'8px'}
			/>
		</GridItem>
	);
}
