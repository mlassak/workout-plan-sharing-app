import { Delete } from '@mui/icons-material';
import {
	Box,
	Card,
	CardActions,
	CardContent,
	IconButton,
	Typography
} from '@mui/material';
import { deleteDoc } from 'firebase/firestore';
import { FC } from 'react';

import useLoggedInUser from '../../hooks/useLoggedInUser';
import { WorkoutPlanMetadataWithId } from '../../types';
import { workoutPlanDocument } from '../../utils/firebase';

const WorkoutPlanCard: FC<WorkoutPlanMetadataWithId> = ({
	id,
	name,
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
				textAlign: 'left',
				marginTop: '0.5rem'
			}}
		>
			<CardContent>
				<Typography variant="h5" color="textSecondary">
					{name}
				</Typography>
				<Box>
					<Typography>Author: {author}</Typography>
					<Typography>Diffculty level: {difficulty}</Typography>
					<Typography>Workouts per week: {workoutsPerWeek}</Typography>
					<Typography>{`Plan length: ${
						planLength.timeUnit !== 'unspecified'
							? `${planLength.numberOfUnits} ${planLength.timeUnit}`
							: 'unspecified'
					}`}</Typography>
				</Box>
			</CardContent>
			{user?.email === author && (
				<CardActions>
					<IconButton
						color="error"
						title="Delete"
						onClick={async () => await deleteDoc(workoutPlanDocument(id))}
					>
						<Delete />
					</IconButton>
				</CardActions>
			)}
		</Card>
	);
};

export default WorkoutPlanCard;
