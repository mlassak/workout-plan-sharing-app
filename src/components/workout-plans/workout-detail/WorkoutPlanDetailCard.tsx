import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Collapse,
	Container,
	IconButton,
	Typography
} from '@mui/material';
import { FC, useState } from 'react';

import { WorkoutPlanWithId } from '../../../types';

import SessionCard from './SessionDetailCard';

const WorkoutPlanDetailCard: FC<WorkoutPlanWithId> = ({
	name,
	author,
	difficulty,
	workoutsPerWeek,
	sessions,
	description,
	planLength
}) => {
	const [openDesc, setOpenDec] = useState(false);
	const [open, setOpen] = useState(false);
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
				<Typography variant="h2" color="textSecondary" align="center">
					{name}
				</Typography>
				<Box>
					<Card
						sx={{
							marginTop: '0.5rem'
						}}
					>
						<CardHeader
							title="Workout plan info"
							onClick={() => setOpen(!open)}
							action={
								<IconButton aria-label="expand" size="small">
									{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
								</IconButton>
							}
						/>
						<div style={{ backgroundColor: 'rgba(211,211,211,0.4)' }}>
							<Collapse in={open} timeout="auto" unmountOnExit>
								<CardContent>
									<Container>
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
									</Container>
								</CardContent>
							</Collapse>
						</div>
					</Card>
					<Card
						sx={{
							marginTop: '0.5rem'
						}}
					>
						<CardHeader
							title="Description"
							onClick={() => setOpenDec(!openDesc)}
							action={
								<IconButton aria-label="expand" size="small">
									{openDesc ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
								</IconButton>
							}
						/>
						<div style={{ backgroundColor: 'rgba(211,211,211,0.4)' }}>
							<Collapse in={openDesc} timeout="auto" unmountOnExit>
								<CardContent>
									<Container>
										<Typography>{description}</Typography>
									</Container>
								</CardContent>
							</Collapse>
						</div>
					</Card>
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
		</Card>
	);
};

export default WorkoutPlanDetailCard;
