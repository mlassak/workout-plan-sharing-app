import { Timestamp } from 'firebase/firestore';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type WorkoutSessionType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export type TimeUnit = 'd.' | 'w.' | 'm.' | 'y.';

export type TimePeriod = {
	numberOfUnits: number;
	unit: TimeUnit;
};

export type PlanLength = 'Unspecified' | TimePeriod;

export type Exercise = {
	name: string;
	reps: number;
	sets: number;
};

export type WorkoutSession = {
	type: WorkoutSessionType;
	exercises: Exercise[];
};

export type WorkoutPlanMetadata = {
	title: string;
	author: string;
	difficulty: DifficultyLevel;
	workoutsPerWeek: number;
	planLength: PlanLength;
};

export type WorkoutPlan = WorkoutPlanMetadata & {
	description: string;
	sessions: WorkoutSession[];
	createdAt: Timestamp;
};
