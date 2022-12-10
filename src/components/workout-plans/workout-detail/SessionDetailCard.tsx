import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
	Grid,
	Card,
	Collapse,
	CardContent,
	IconButton,
	CardHeader,
	Container
} from '@mui/material';
import { FC, useState } from 'react';

import { WorkoutSession } from '../../../types';

import ExcerciseCard from './ExcerciseCard';

type Props = {
	session: WorkoutSession;
	counter: number;
};

const SessionCardDetail: FC<WorkoutSession> = ({ exercises }) => (
	<Grid container spacing={2} marginTop="0.5rem">
		{exercises.map((exercise, i) => (
			<Grid key={i} item xs={12} md={6}>
				<ExcerciseCard key={i} {...exercise} />
			</Grid>
		))}
	</Grid>
);

const SessionCard: FC<Props> = props => {
	const [open, setOpen] = useState(false);
	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				bgcolor: props.counter % 2 === 0 ? '#1a237e' : '#311b92',
				width: '100%',
				textAlign: 'left',
				marginTop: '2rem'
			}}
		>
			<CardHeader
				title={props.session.name}
				onClick={() => setOpen(!open)}
				action={
					<IconButton aria-label="expand" size="small">
						{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
					</IconButton>
				}
			/>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<CardContent>
					<Container>
						<SessionCardDetail {...props.session} />
					</Container>
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default SessionCard;
