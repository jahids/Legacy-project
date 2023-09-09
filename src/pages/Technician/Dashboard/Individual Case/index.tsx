import { Box, Button, Flex, Text, Icon, Select, Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react';
import VideoContainer from '../../../../components/Video Container';
import TechnicianArticles from '../../../../components/Technician Articles';
import { AiOutlineRight } from 'react-icons/ai';
import { AiOutlineLeft } from 'react-icons/ai';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { TechnicianGetCaseByIdService } from '../../../../services/technician/case';
import { formatText } from '../../../../utils/formatText';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import TechnicianAccordian from '../../../../components/TechnicianAccordian';
import { createDetailedCase } from '../../../../features/technician/slices/caseDetailsSlice';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import AddingNotes from '../../../../components/Adding Notes';

const articles = [
	{
		title: 'Repair a bike:basics',
		link: 'https://www.thecrucible.org/guides/bike-maintenance/repair-a-bike/',
		author: 'John Smith',
		date: '2023-08-16',
	},
	{
		title: 'Wikihow:Fix a brake on a bike',
		link: 'https://www.wikihow.com/Fix-Brakes-on-a-Bike',
		author: 'Jane Doe',
		date: '2023-08-15',
	},
	{
		title: 'How to adjust bike brakes',
		link: 'https://www.cycleplan.co.uk/cycle-savvy/how-to-adjust-bike-brakes/',
		author: 'Alex Johnson',
		date: '2023-08-14',
	},
];

const IndividualCase = () => {
	const src = 'https://www.youtube.com/embed/OQsiceeCZ0M';
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [Case, setCase] = useState<any[]>([]);
	const [bookMark, setBookMark] = useState<boolean>(false);
	const [bookMarkedVideos, setBookMarkedVideos] = useState<string>('');
	const [showBookMarkedVideos, setShowBookMarkedVideos] = useState<boolean>(false);

	const id = useParams();

	const handleSetBookMark = () => {
		setBookMark(!bookMark);
		if (bookMarkedVideos && bookMarkedVideos.length > 0) {
			setBookMarkedVideos('');
			return;
		}
		setBookMarkedVideos(src);
	};

	useEffect(() => {
		const fetchIndividualCaseData = async () => {
			try {
				const result = await TechnicianGetCaseByIdService(`${id.id}`);

				setCase(result);
				dispatch(createDetailedCase(result[0]));
			} catch (error) {
				console.error('Error in component while fetching !');
			}
		};
		fetchIndividualCaseData();
	}, [id]);

	return (
		<>
			{Case && Case.length > 0 ? (
				<Box color={'secondary'}>
					<Flex
						gap={'4rem'}
						m={'1rem'}
						justify={'center'}
						alignItems={'center'}>
						<Button
							onClick={() => navigate(-1)}
							bg={'#d9d9d9'}
							borderRadius={'45%'}
							color={'secondary'}>
							<Icon as={IoMdArrowRoundBack} />
						</Button>
						<Box
							fontSize={'1.40rem'}
							textAlign={'center'}>
							<Text whiteSpace={'nowrap'}> Case No</Text>
							<Text fontWeight={'700'}>#{Case[0].caseNumber}</Text>
						</Box>
						<Box
							fontSize={'1.40rem'}
							textAlign={'center'}>
							<Text whiteSpace={'nowrap'}> Case Status</Text>
							<Text fontWeight={'700'}>{formatText(Case[0].status)}</Text>
						</Box>
						<Box
							fontSize={'1.40rem'}
							textAlign={'center'}>
							<Text whiteSpace={'nowrap'}> Case Type</Text>
							<Text fontWeight={'700'}>{formatText(Case[0].type)}</Text>
						</Box>
						<Box
							fontSize={'1.40rem'}
							textAlign={'center'}>
							<Text whiteSpace={'nowrap'}> Bike Brand</Text>
							<Text fontWeight={'700'}>{formatText(Case[0].bicycle.brand)}</Text>
						</Box>
						<Box
							fontSize={'1.40rem'}
							textAlign={'center'}>
							<Text> Bike Model</Text>
							<Text fontWeight={'700'}>{formatText(Case[0].bicycle.model)}</Text>
						</Box>
						<Box
							fontSize={'1.30rem'}
							bg={'secondary'}
							color={'third'}
							rounded={'xl'}
							_hover={{ outline: '1px solid #EDCBEF', backgroundColor: 'third', color: 'secondary' }}>
							<Select
								fontWeight={'700'}
								defaultValue=""
								placeholder="Change status">
								<option
									value="Raised"
									style={{ backgroundColor: 'primary', color: '#C1FAA6' }}>
									Raise
								</option>
								<option
									value="Closed"
									style={{ backgroundColor: 'primary', color: '#C1FAA6' }}>
									Close
								</option>
							</Select>
						</Box>
					</Flex>
					<Box m={'.5rem'}>
						<Flex mt={'2rem'}>
							<Box flex={0.55}>
								<Flex direction={'column'}>
									<Box
										w={'55%'}
										m={'0 auto'}>
										<VideoContainer src={src} />
									</Box>

									<Box
										w={'90%'}
										m={'1rem auto'}
										boxShadow={'2xl'}
										borderRadius={'md'}>
										<TechnicianAccordian></TechnicianAccordian>
									</Box>
								</Flex>
							</Box>
							<Box
								flex={0.45}
								boxShadow={'2xl'}>
								<Flex
									mt={'1rem'}
									direction={'column'}
									justify={'center'}
									gap={'1rem'}>
									<Flex
										alignItems={'center'}
										w={'100%'}
										justify={'center'}
										gap={'1rem'}>
										<Button
											bg={'#d9d9d9'}
											borderRadius={'45%'}
											color={'secondary'}>
											<AiOutlineLeft size={20} />
										</Button>
										<Box w={'60%'}>
											<VideoContainer src={src} />
										</Box>

										<Button
											bg={'#d9d9d9'}
											borderRadius={'45%'}
											color={'secondary'}>
											<AiOutlineRight size={20} />
										</Button>
										<Box
											onClick={handleSetBookMark}
											style={{ fontSize: '25px', position: 'relative', marginBottom: '10rem' }}>
											{bookMark ? <BsBookmarkFill /> : <BsBookmark />}
										</Box>
									</Flex>

									<TechnicianArticles articles={articles} />

									<Accordion
										allowMultiple
										bg={'white'}
										_hover={{ backgroundColor: 'accent' }}
										h={'auto'}
										boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
										p={5}
										rounded={'2xl'}>
										<AccordionItem
											borderRadius={'md'}
											color={'secondary'}>
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
															Add your notes
														</Box>
														{isExpanded ? <MinusIcon fontSize="1.15rem" /> : <AddIcon fontSize="1.15rem" />}
													</AccordionButton>
													<Box
														h={'auto'}
														overflowY={'auto'}>
														<AccordionPanel pb={'1rem'}>
															<AddingNotes />
														</AccordionPanel>
													</Box>
												</Box>
											)}
										</AccordionItem>
									</Accordion>
									<Button
										onClick={() => setShowBookMarkedVideos(!showBookMarkedVideos)}
										margin={'1rem auto'}
										color={'third'}
										bg={'secondary'}
										_hover={{ color: 'secondary', bg: 'primary', border: '2px solid #001f3f' }}>
										Filter Bookmarks
									</Button>

									{showBookMarkedVideos && (
										<Box
											w={'60%'}
											margin={'0 auto'}>
											<VideoContainer src={bookMarkedVideos} />
										</Box>
									)}
								</Flex>
							</Box>
						</Flex>
					</Box>
				</Box>
			) : (
				<> null</>
			)}
		</>
	);
};

export default IndividualCase;
