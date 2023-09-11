/* eslint-disable  */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Flex, Text, VStack, Image } from '@chakra-ui/react';
import TableComponent from '../../../../components/Table';
import logo from './../../../../assets/logo(Midnight Blue).svg';
import SearchBox from '../../../../components/Search Box';
import FilterComponent from '../../../../components/Filter';
import PaginationComponent from '../../../../components/Pagination';
import { useEffect, useState } from 'react';
import { Case } from './../../../../interfaces/case.interface';
import { TechnicianGetAllCasesService } from '../../../../services/technician/case';
import { createCases, updateCaseStatus } from '../../../../features/technician/slices/technicianCasesSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { createPresentableCases, updatePresentableCaseStatus } from '../../../../features/technician/slices/casesPresentationSlice';
import moment from 'moment';
import { Cyclist } from '../../../../interfaces/cyclist.interface';

export const extractCaseData = (cases: any[]) => {
	return cases.map((caseItem: any) => ({
	  'Case No': `#${caseItem.caseNumber}`,
	  'Case Type': caseItem.type,
	  Status: caseItem.status,
	  'Client Name': caseItem.cyclist?.name || '', // Use an empty string as fallback if cyclist.name is undefined
	  'Date Created': moment(caseItem?.supportTime?.timeStamp).format('DD-MM-YYYY'),
	  'Bicycle Health': caseItem?.bicycle?.totalHealth || 0, // Use 0 as fallback if totalHealth is undefined
	  'Case Id': caseItem._id || '',
	}));
  };

const Cases = () => {
	const dispatch = useAppDispatch();
	const [cases, setCases] = useState<Case[]>([]);
	const [tabledata, settabledata] = useState([])

	const handleStatusFilter = (selectedStatus: string) => {
		if (selectedStatus.length === 0) {
			dispatch(createPresentableCases(extractCaseData(cases)));
			return;
		}

		const filteredData = cases.filter((caseItem: Case) => {
			return caseItem.status === selectedStatus;
		});

		dispatch(createPresentableCases(extractCaseData(filteredData)));
	};
	const handleTypeFilter = (selectedType: string) => {
		if (selectedType.length === 0) {
			dispatch(createPresentableCases(extractCaseData(cases)));
			return;
		}
		const filteredData = cases.filter((caseItem: Case) => {
			return caseItem.type === selectedType;
		});

		dispatch(createPresentableCases(extractCaseData(filteredData)));
	};

	const handleInputChange = (input: string) => {
		if (input.length === 0) {
			dispatch(createPresentableCases(extractCaseData(cases)));
			return;
		}

		const filteredCases = cases.filter((singleCase: Case) => {
			const clientName = typeof singleCase.cyclist === 'object' && 'name' in singleCase.cyclist ? (singleCase.cyclist as Cyclist).name.toLowerCase() : '';

			return clientName.includes(input.toLowerCase());
		});

		dispatch(createPresentableCases(extractCaseData(filteredCases)));
	};

	const handleActionChange = (input: string, index: number) => {
		dispatch(updateCaseStatus({ index, status: input }));
		dispatch(updatePresentableCaseStatus({ index, status: input }));
	};

	useEffect(() => {
		const fetchCaseData = async () => {
			try {
				const result = await TechnicianGetAllCasesService();
				console.log("data come api first time", result);
			 settabledata(extractCaseData(result))
				dispatch(createCases(tabledata));
				
				//dispatch(createPresentableCases(extractCaseData(tabledata)));
				dispatch(createPresentableCases(tabledata));
				setCases(tabledata);
			} catch (error) {
				console.error('Error while fetching!');
			}
		};
		fetchCaseData();
	}, [ tabledata.length]);

	return (
		<>
			<VStack color={'secondary'}>
				<Flex
					w={'100%'}
					direction={'row'}
					p={2}
					m={2}
					justifyContent={'space-between'}>
					<Flex
						direction={'column'}
						justify={'flex-start'}>
						<Text
							as="b"
							fontSize="1.5rem"
							fontFamily={'Inter'}>
							Support Cases
						</Text>
						<Text
							as="b"
							fontSize="1.25rem"
							color={'#E180E7'}
							fontFamily={'Inter'}>
							Total:{cases.length}
						</Text>
					</Flex>
					<Flex gap={'.45rem'}>
						<Text
							as="b"
							fontSize="3rem"
							fontFamily={'Inter'}>
							SlipStream
						</Text>

						<Image
							src={logo}
							alt="Slipstream logo"></Image>
					</Flex>
				</Flex>

				<Box
					w={'100%'}
					h={'100%'}>
					<Flex
						w={'100%'}
						direction={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
						mb={2}>
						<SearchBox handleInputChange={handleInputChange} />

						<Flex mr={3}>
							<FilterComponent
								name={'Status'}
								options={['ongoing', 'Finished', 'Closed', 'Raised']}
								onChange={handleStatusFilter}
							/>
							<FilterComponent
								name={'Case Type'}
								options={['Active', 'Passive']}
								onChange={handleTypeFilter}
							/>
						</Flex>
					</Flex>
					<TableComponent handleActionChange={handleActionChange} />
				</Box>
				{cases && cases?.length > 0 ? (
					<Box
						h={'6vh'}
						mt={'1rem'}>
						<PaginationComponent
							currentPage={1}
							totalPages={Math.floor(cases.length / 5)}
							onPageChange={undefined}
						/>
					</Box>
				) : null}
			</VStack>
		</>
	);
};

export default Cases;
