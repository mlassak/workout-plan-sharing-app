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

import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { Exercise } from '../../../types';
import { workoutPlanDocument } from '../../../utils/firebase';

const SessionCard: FC<Exercise> = ({ name, reps, sets }) => (
	<Card
		sx={{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			width: '100%',
			textAlign: 'left',
			padding: '5px'
		}}
	>
		<CardContent>
			<Typography>Excercise: {name}</Typography>
			<Typography>
				Reps:{' '}
				<>
					{reps.usesRange && (
						<>
							Range: {reps.values.min} {reps.values.max}
						</>
					)}
					{!reps.usesRange && <>Repeats: {reps.values.min}</>}
				</>
			</Typography>
			<Typography>
				Sets:{' '}
				<>
					{sets.usesRange && (
						<>
							Range: {sets.values.min} {sets.values.max}
						</>
					)}
					{!sets.usesRange && <>Repeats: {sets.values.min}</>}
				</>
			</Typography>
		</CardContent>
	</Card>
);

export default SessionCard;
