import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import NavbarDashboard from '../../../components/NavbarDashboard';

const Dashboard = () => {
	return (
		<Flex>
			<NavbarDashboard />
			<Box
				bg="primary"
				p={2}
				h={'auto'}
				w={'87vw'}>
				<Outlet />
			</Box>
		</Flex>
	);
};

export default Dashboard;
