import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box } from '@chakra-ui/react';
import { useAppSelector } from '../../app/hooks';
import ReplacementParts from '../Replacement Parts';
import HealthBarListTechnician from '../Technician Health Bar List';
import ActiveTags from '../ActiveTags';

const TechnicianAccordian = () => {
	const Case = useAppSelector((state: any) => state.caseDetails);
	const bicycle = Case.bicycle;

	return (
		<Accordion
			allowMultiple
			bg={'white'}
			h={'auto'}
			boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
			p={5}
			rounded={'2xl'}>
			<AccordionItem
				borderRadius={'md'}
				color={'secondary'}
				_hover={{ backgroundColor: 'third' }}>
				{({ isExpanded }) => (
					<Box>
						<AccordionButton>
							<Box
								borderTop={'none'}
								m={'30px 0 36px 0'}
								flex=".95"
								textAlign="left"
								fontWeight={'700'}
								fontSize={'xl'}>
								Bicycle Health
							</Box>
							{isExpanded ? <MinusIcon fontSize="1.15rem" /> : <AddIcon fontSize="1.15rem" />}
						</AccordionButton>

						<Box
							h={'auto'}
							overflowY={'auto'}>
							<AccordionPanel pb={'1rem'}>
								<HealthBarListTechnician bicycleParts={bicycle.bicycleParts} />
							</AccordionPanel>
						</Box>
					</Box>
				)}
			</AccordionItem>
			<AccordionItem
				color={'secondary'}
				borderRadius={'md'}
				_hover={{ backgroundColor: 'fourth' }}>
				{({ isExpanded }) => (
					<Box>
						<AccordionButton>
							<Box
								borderTop={'none'}
								m={'30px 0 36px 0'}
								flex=".95"
								textAlign="left"
								fontWeight={'700'}
								fontSize={'xl'}>
								Replacement Kit
							</Box>
							{isExpanded ? <MinusIcon fontSize="1.15rem" /> : <AddIcon fontSize="1.15rem" />}
						</AccordionButton>

						<Box
							h={'auto'}
							overflowY={'auto'}>
							<AccordionPanel pb={'1rem'}>
								<ReplacementParts replacableParts={bicycle.bicycleParts} />
							</AccordionPanel>
						</Box>
					</Box>
				)}
			</AccordionItem>

			{Case.type === 'Active' ? (
				<AccordionItem
					color={'secondary'}
					borderRadius={'md'}
					_hover={{ backgroundColor: 'third' }}>
					{({ isExpanded }) => (
						<Box>
							<AccordionButton>
								<Box
									borderTop={'none'}
									m={'30px 0 36px 0'}
									flex=".95"
									textAlign="left"
									fontWeight={'700'}
									fontSize={'xl'}>
									Chatbot Tags
								</Box>
								{isExpanded ? <MinusIcon fontSize="1.15rem" /> : <AddIcon fontSize="1.15rem" />}
							</AccordionButton>

							<Box
								h={'auto'}
								overflowY={'auto'}>
								<AccordionPanel pb={'1rem'}>
									<ActiveTags></ActiveTags>
								</AccordionPanel>
							</Box>
						</Box>
					)}
				</AccordionItem>
			) : null}
		</Accordion>
	);
};

export default TechnicianAccordian;
