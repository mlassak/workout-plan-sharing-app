import { Delete } from '@mui/icons-material';
import {
	Box,
	Card,
	CardActions,
	CardContent,
	IconButton,
	Typography
} from '@mui/material';
import { FC } from 'react';

import useLoggedInUser from '../../hooks/useLoggedInUser';
import { WorkoutPlanMetadata } from '../../types';

const WorkoutPlanCard: FC<WorkoutPlanMetadata> = ({
	title,
	author,
	difficulty,
	workoutsPerWeek,
	planLength
}) => {
	const user = useLoggedInUser();

	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: '100%',
				textAlign: 'left'
			}}
		>
			<CardContent>
				<Typography variant="h5" color="textSecondary">
					{title}
				</Typography>
				<Box>
					<Typography>Author: {author}</Typography>
					<Typography>Diffculty level: {difficulty}</Typography>
					<Typography>Workouts per week: {workoutsPerWeek}</Typography>
					{!!planLength && <Typography>Length: {planLength}</Typography>}
				</Box>
			</CardContent>
			{user?.email === author && (
				<CardActions>
					<IconButton color="error" title="Delete">
						<Delete />
					</IconButton>
				</CardActions>
			)}
		</Card>
	);
};

export default WorkoutPlanCard;
