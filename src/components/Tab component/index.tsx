import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import HealthBarListTechnician from '../Technician Health Bar List';
import AddingNotes from '../Adding Notes';
import ReplacementParts from '../Replacement Parts';
import { useAppSelector } from '../../app/hooks';

const bicycleParts = [
	{
		name: 'Wheel',
		health: 12,
		price: 50,
		quantity: 1,
	},
	{
		name: 'Tyres',
		health: 62,
		price: 30,
		quantity: 1,
	},
	{
		name: 'Brakes',
		health: 92,
		price: 25,
		quantity: 1,
	},
	{
		name: 'Wheel',
		health: 12,
		price: 50,
		quantity: 1,
	},
	{
		name: 'Tyres',
		health: 62,
		price: 30,
		quantity: 1,
	},
	{
		name: 'Brakes',
		health: 92,
		price: 25,
		quantity: 1,
	},
	{
		name: 'Wheel',
		health: 12,
		price: 50,
		quantity: 1,
	},
	{
		name: 'Tyres',
		health: 62,
		price: 30,
		quantity: 1,
	},
	{
		name: 'Brakes',
		health: 92,
		price: 25,
		quantity: 1,
	},
	{
		name: 'Wheel',
		health: 12,
		price: 50,
		quantity: 1,
	},
	{
		name: 'Tyres',
		health: 62,
		price: 30,
		quantity: 1,
	},
];

const TechnicianTab = () => {
	const bicycle = useAppSelector((state: any) => state.bikeDetails);
	console.log('bicycle', bicycle);

	return (
		<>
			<Tabs
				bg={'secondary'}
				variant="soft-rounded"
				colorScheme={'secondary'}
				borderRadius={'.75rem'}>
				<TabList
					bg={'#d9d9d9'}
					borderRadius={'.75rem'}
					justifyContent={'center'}>
					<Tab _selected={{ backgroundColor: '#001f3f', color: '#d9d9d9', border: '1px solid #d9d9d9' }}>Health Bar</Tab>
					<Tab _selected={{ backgroundColor: '#001f3f', color: '#d9d9d9', border: '1px solid #d9d9d9' }}>Need Replacement</Tab>
					<Tab _selected={{ backgroundColor: '#001f3f', color: '#d9d9d9', border: '1px solid #d9d9d9' }}>Notes</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<HealthBarListTechnician bicycleParts={bicycle.bicycleParts} />
					</TabPanel>
					<TabPanel>
						<ReplacementParts replacableParts={bicycle.bicycleParts} />
					</TabPanel>

					<TabPanel>
						<AddingNotes />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	);
};

export default TechnicianTab;
