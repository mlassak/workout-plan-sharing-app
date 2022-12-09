import { Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

import { Exercise } from '../../../types';

const SessionCard: FC<Exercise> = ({ name, reps, sets }) => (
	<Card
		sx={{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			bgcolor: '#616161',
			width: '100%',
			textAlign: 'left',
			padding: '5px'
		}}
	>
		<CardContent>
			<Typography>Excercise: {name}</Typography>
			<Typography>
				Reps:{' '}
				{reps.usesRange && (
					<>
						{reps.values.min}-{reps.values.max} Repeats
					</>
				)}
				{!reps.usesRange && <> {reps.values.min} Repeats</>}
			</Typography>
			<Typography>
				Sets:{' '}
				{sets.usesRange && (
					<>
						{sets.values.min}-{sets.values.max} Repeats
					</>
				)}
				{!sets.usesRange && <> {sets.values.min} Repeats</>}
			</Typography>
		</CardContent>
	</Card>
);

export default SessionCard;
