import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Stack, Text, Icon, Button } from '@chakra-ui/react';
import { FaPoundSign } from 'react-icons/fa';
import { BiPound } from 'react-icons/bi';
import { useAppSelector } from '../../app/hooks';
import { ObjectId } from 'mongoose';
import { useState } from 'react';
import formatComponentName from '../../utils/formatComponentName';

interface Part {
	name: string;
	category: string;
	depreciationRate: number;
	plan: string[];
	price: number;
	__v: number;
	_id: ObjectId;
}

const ReplacementParts = ({ replacableParts }: { replacableParts: any[] }) => {
	const Case = useAppSelector((state: any) => state.caseDetails);
	const order = Case.order;

	const [partsQuantity, setPartsQuantity] = useState(replacableParts.map(() => 0));

	const handleAddPart = (index: number) => {
		if (partsQuantity[index] < 1) {
			const newPartsQuantity = [...partsQuantity];
			newPartsQuantity[index] += 1;
			setPartsQuantity(newPartsQuantity);
		}
	};

	const handleRemovePart = (index: number) => {
		if (partsQuantity[index] > 0) {
			const newPartsQuantity = [...partsQuantity];
			newPartsQuantity[index] -= 1;
			setPartsQuantity(newPartsQuantity);
		}
	};

	return (
		<>
			{order && Case.type === 'Passive' ? (
				<Flex
					direction={'column'}
					alignItems={'center'}>
					{order.bicycleParts &&
						order.bicycleParts.length > 0 &&
						order.bicycleParts.map((part: Part, index: number) => {
							return (
								<Box
									key={index}
									borderRadius={'md'}
									boxShadow={'lg'}
									w={'90%'}
									p={'1rem'}
									m={'.5rem'}
									h={'auto'}
									bg={'primary'}>
									<Stack
										direction={'row'}
										justifyContent={'space-between'}>
										<Flex direction={'column'}>
											<Text
												fontSize={'1.25rem'}
												fontWeight={'700'}>
												{formatComponentName(part.name)}
											</Text>
											<Flex
												justify={'start'}
												alignItems={'center'}>
												<Text
													mt={1}
													fontWeight={'600'}>
													{part.price}
												</Text>
												<FaPoundSign />
											</Flex>
										</Flex>

										<Center>
											<Flex
												gap={'1rem'}
												alignItems={'center'}>
												<Button
													bg={'primary'}
													onClick={() => handleAddPart(index)}>
													<AddIcon
														boxSize={'1rem'}
														color="secondary"
													/>
												</Button>

												<Text fontWeight={'600'}> 1 pc</Text>
												<Button
													bg={'primary'}
													onClick={() => handleRemovePart(index)}>
													<MinusIcon
														boxSize={'1rem'}
														color="secondary"
													/>
												</Button>
											</Flex>
										</Center>
									</Stack>
								</Box>
							);
						})}
				</Flex>
			) : (
				<Flex
					direction={'column'}
					alignItems={'center'}>
					{replacableParts &&
						replacableParts.map((part, index) => {
							return (
								<Box
									key={index}
									borderRadius={'md'}
									boxShadow={'lg'}
									w={'90%'}
									p={'1rem'}
									m={'.5rem'}
									h={'auto'}
									bg={'primary'}>
									<Stack
										direction={'row'}
										justifyContent={'space-between'}>
										<Flex direction={'column'}>
											<Text
												fontSize={'1.25rem'}
												fontWeight={'700'}>
												{formatComponentName(part.subpart.name)}
											</Text>
											<Flex
												justify={'start'}
												alignItems={'center'}>
												<Text
													mt={1}
													fontWeight={'600'}>
													{part.subpart.price}
												</Text>
												<FaPoundSign />
											</Flex>
										</Flex>

										<Center>
											<Flex
												gap={'1rem'}
												alignItems={'center'}>
												<Button
													bg={'primary'}
													onClick={() => handleAddPart(index)}>
													<AddIcon
														boxSize={'1rem'}
														color="secondary"
													/>
												</Button>

												<Text fontWeight={'600'}> {partsQuantity[index]} pc</Text>
												<Button
													bg={'primary'}
													onClick={() => handleRemovePart(index)}>
													<MinusIcon
														boxSize={'1rem'}
														color="secondary"
													/>
												</Button>
											</Flex>
										</Center>
									</Stack>
								</Box>
							);
						})}
					<Button
						m={'1rem'}
						bg={'secondary'}
						color={'third'}>
						<Text m={'1rem'}> Send Invoice </Text>
						<Text> {partsQuantity.reduce((sum, quantity, index) => sum + quantity * replacableParts[index].subpart.price, 0)}</Text>
						<Text>
							<Icon
								as={BiPound}
								boxSize={'1.2rem'}
							/>
						</Text>
					</Button>
				</Flex>
			)}
		</>
	);
};

export default ReplacementParts;
