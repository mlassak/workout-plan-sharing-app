import { Box, Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';

const Home = () => {
	usePageTitle('Home');
	const user = useLoggedInUser();

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<FitnessCenterIcon
					sx={{
						color: 'primary.main',
						fontSize: '24rem',
						mixBlendMode: 'difference'
					}}
				/>
				<Typography variant="h1" fontWeight="bolder" align="center">
					Fedor&apos;s iron archive
				</Typography>
			</Box>
			{user?.email && (
				<Typography variant="h4" textAlign="center">
					{`Welcome to the iron sanctuary, ${user.email}!`}
				</Typography>
			)}
		</>
	);
};

export default Home;