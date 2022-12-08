import { Delete, ArrowForward } from '@mui/icons-material';
import {
	Grid,
	Card,
	CardActions,
	CardContent,
	IconButton,
	Typography
} from '@mui/material';
import { deleteDoc } from 'firebase/firestore';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { WorkoutSession } from '../../../types';
import { workoutPlanDocument } from '../../../utils/firebase';

import ExcerciseCard from './ExcerciseCard';

type Props = {
	session: WorkoutSession;
	counter: number;
};

const SessionCardDetail: FC<WorkoutSession> = ({ id, name, exercises }) => (
	<>
		<Typography variant="h5" color="textPrimary">
			{name}
		</Typography>
		<Grid container spacing={2} marginTop="0.5rem">
			{exercises.map((exercise, i) => (
				<Grid key={i} item xs={6}>
					<ExcerciseCard key={i} {...exercise} />
				</Grid>
			))}
		</Grid>
	</>
);

const SessionCard: FC<Props> = props => (
	<Card
		sx={{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			bgcolor: props.counter % 2 === 0 ? 'darkgreen' : 'darkblue',
			width: '100%',
			textAlign: 'left',
			marginTop: '2rem'
		}}
	>
		<CardContent>
			<SessionCardDetail {...props.session} />
		</CardContent>
	</Card>
);

export default SessionCard;
