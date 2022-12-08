import { ArrowForward } from '@mui/icons-material';
import {
	Box,
	Card,
	CardActions,
	CardContent,
	IconButton,
	Typography
} from '@mui/material';
import { FC } from 'react';

import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { WorkoutPlanWithId } from '../../../types';

import SessionCard from './SessionDetailCard';

const WorkoutPlanDetailCard: FC<WorkoutPlanWithId> = ({
	id,
	name,
	author,
	difficulty,
	workoutsPerWeek,
	sessions,
	description,
	planLength
}) => (
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
			<Typography variant="h1" color="textSecondary" align="center">
				{name}
			</Typography>
			<Box>
				<Typography
					sx={{
						marginTop: '0.5rem'
					}}
				>
					Author: {author}
				</Typography>
				<Typography
					sx={{
						marginTop: '0.5rem'
					}}
				>
					Diffculty level: {difficulty}
				</Typography>
				<Typography
					sx={{
						marginTop: '0.5rem'
					}}
				>
					Workouts per week: {workoutsPerWeek}
				</Typography>
				<Typography
					sx={{
						marginTop: '0.5rem'
					}}
				>
					{`Plan length: ${
						planLength.timeUnit !== 'unspecified'
							? `${planLength.numberOfUnits} ${planLength.timeUnit}`
							: 'unspecified'
					}`}
				</Typography>
				<Typography
					sx={{
						marginTop: '0.5rem'
					}}
				>
					Description: {description}
				</Typography>
				<Typography
					sx={{
						marginTop: '0.5rem'
					}}
					variant="h4"
				>
					Sessions:{' '}
				</Typography>
				{sessions.map((session, i) => (
					<SessionCard key={i} session={session} counter={i} />
				))}
			</Box>
		</CardContent>
		<CardActions>
			<IconButton
				color="success"
				title="Browse"
				onClick={async () => {
					console.log('Add to my collection');
				}}
			>
				<ArrowForward />
			</IconButton>
		</CardActions>
	</Card>
);

export default WorkoutPlanDetailCard;
