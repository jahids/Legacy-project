import { Box, Text, Flex, Circle } from '@chakra-ui/react';
import moment from 'moment';

const caseBoxColor: Record<string, string> = {
	Active: '#80db55',
	Passive: '#e57beb',
};

const CaseBox = ({ caseType, date, clientName, time }: { caseType: string; date: Date | string; clientName: string; time: string }) => {
	const formattedDate = moment(date).format('MMMM Do, YYYY');
	const [startTimeStr, endTimeStr] = time.split('-');
	const startTime = moment(startTimeStr.trim(), 'HH:mm').format('h:mm');
	const endTime = moment(endTimeStr.trim(), 'HH:mm').format('h:mm');
	const formattedTime = `${startTime} - ${endTime}`;

	return (
		<>
			<Box
				m={'.5rem'}
				p={'1rem'}
				w={'90%'}
				bg={'primary'}
				borderRadius={'1rem'}
				boxShadow={'2xl'}>
				<Flex
					justify={'space-between'}
					alignItems={'center'}>
					<Flex
						justify={'center'}
						alignItems={'center'}
						gap={'1rem'}>
						<Circle
							size={'.75rem'}
							bg={caseBoxColor[caseType]}></Circle>
						<Text> {formattedTime}</Text>
					</Flex>

					<Text>{formattedDate}</Text>
				</Flex>
				<>
					<Text
						mt={'1rem'}
						fontSize={'1.5rem'}
						fontWeight={'500'}>
						Call with {clientName}
					</Text>
					<Text fontSize={'1rem'}>{caseType} case</Text>
				</>
			</Box>
		</>
	);
};

export default CaseBox;
