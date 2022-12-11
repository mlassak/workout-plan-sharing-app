import { Delete, ArrowForward } from '@mui/icons-material';
import {
	Box,
	Card,
	CardActions,
	CardContent,
	IconButton,
	Typography
} from '@mui/material';
import { deleteDoc } from 'firebase/firestore';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
	const [isDeleted, setIsDeleted] = useState<boolean>(false);

	const navigate = useNavigate();
	const user = useLoggedInUser();

	return !isDeleted ? (
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
			<CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<IconButton
					color="success"
					title="Browse"
					onClick={async () => {
						console.log('Show');
						navigate(`/plan/${id}`);
					}}
				>
					<ArrowForward />
				</IconButton>
				{user?.email === author && (
					<IconButton
						color="error"
						title="Delete"
						onClick={async () => {
							setIsDeleted(true);
							await deleteDoc(workoutPlanDocument(id));
						}}
					>
						<Delete />
					</IconButton>
				)}
			</CardActions>
		</Card>
	) : null;
};

export default WorkoutPlanCard;
