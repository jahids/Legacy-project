import { Circle, HStack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export interface Day {
	id: string;
	label: string;
	chosen: boolean;
}
const TechnicianWorkingDays = ({ colorScheme, outline, onDaysSelect }: { colorScheme: string; outline: boolean; onDaysSelect: (days: string[]) => void }) => {
	const [sevenDays, setSevenDays] = useState<Day[]>([]);
	const allDays = [
		{
			label: 'M',
			id: 'Monday',
			chosen: false,
		},
		{
			label: 'T',
			id: 'Tuesday',
			chosen: false,
		},
		{
			label: 'W',
			id: 'Wednesday',
			chosen: false,
		},
		{
			label: 'T',
			id: 'Thursday',
			chosen: false,
		},
		{
			label: 'F',
			id: 'Friday',
			chosen: false,
		},
		{
			label: 'S',
			id: 'Saturday',
			chosen: false,
		},
		{
			label: 'S',
			id: 'Sunday',
			chosen: false,
		},
	];
	useEffect(() => {
		setSevenDays(allDays);
	}, []);

	const handleChange = (day: Day) => {
		const updatedSevenDays = sevenDays.map((d) => (d.id === day.id ? { ...d, chosen: !day.chosen } : d));

		setSevenDays(updatedSevenDays);
		onDaysSelect(updatedSevenDays.filter((d) => d.chosen).map((d) => d.id));
	};

	return (
		<HStack>
			{sevenDays.map((day, index) => (
				<Circle
					key={index}
					bg={day.chosen ? colorScheme : 'secondary'}
					color={day.chosen ? 'secondary' : colorScheme}
					border={day.chosen ? 'none' : '.01rem solid'}
					borderColor={day.chosen ? 'none' : colorScheme}
					outline={outline ? '.01rem solid' : 'none'}
					outlineColor={outline && day.chosen ? 'accent' : 'none'}
					onClick={() => handleChange(day)}
					size={'3rem'}>
					<Text
						as="b"
						fontSize={'1.75rem'}
						fontWeight={'600'}
						fontFamily={'Inter'}>
						{day.label}
					</Text>
				</Circle>
			))}
		</HStack>
	);
};

export default TechnicianWorkingDays;
