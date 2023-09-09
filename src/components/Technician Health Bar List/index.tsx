import { List, ListItem, Box, Flex, Text, Button, Circle } from '@chakra-ui/react';

import FullHealthBar from '../Bicycle Full Health Bar';
import { formatText } from '../../utils/formatText';
import { categoryToColor } from '../../data/categoryToColor';
import { useState } from 'react';

const HealthBarListTechnician = ({ bicycleParts }: { bicycleParts: any[] }) => {
	const [partHealths, setPartHealths] = useState(bicycleParts.map((part) => part.health));

	const handleRestore = (index: number) => {
		const updatedHealths = [...partHealths];
		updatedHealths[index] = 100;
		setPartHealths(updatedHealths);
	};

	const handleDeplete = (index: number) => {
		const updatedHealths = [...partHealths];
		updatedHealths[index] = 0;
		setPartHealths(updatedHealths);
	};

	return (
		<>
			<Box
				p={'1rem'}
				bg={'primary'}
				borderRadius={'1rem'}>
				<List>
					{bicycleParts &&
						bicycleParts.map((part, index) => {
							return (
								<ListItem
									mt={'1rem'}
									key={index}
									color={'primary'}
									fontWeight={'700'}
									textColor={'secondary'}>
									<Flex
										alignItems="center"
										justifyContent="space-between"
										gap={'1rem'}>
										<Circle
											bg={categoryToColor[part.subpart.category as keyof typeof categoryToColor]}
											size={'1rem'}></Circle>
										<Text flex={0.5}>{formatText(part.subpart.name)}</Text>
										<Box flex={0.5}>
											<FullHealthBar health={partHealths[index]} />
										</Box>
										<Button
											onClick={() => handleRestore(index)}
											bg={'#099b09'}
											borderRadius={'1.25rem'}
											h={'2rem'}
											w={'5rem'}
											_hover={{
												bg: 'white',
												color: '#099b09',
												border: '2px solid #099b09',
											}}>
											Restore
										</Button>
										<Button
											onClick={() => handleDeplete(index)}
											bg={'red'}
											borderRadius={'1.25rem'}
											h={'2rem'}
											w={'5rem'}
											_hover={{
												bg: 'white',
												color: 'red',
												border: '2px solid red',
											}}>
											Deplete
										</Button>
									</Flex>
								</ListItem>
							);
						})}
				</List>
			</Box>
		</>
	);
};

export default HealthBarListTechnician;
