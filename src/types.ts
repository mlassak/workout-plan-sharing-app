import { Timestamp } from 'firebase/firestore';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type TimeUnit = 'days' | 'weeks' | 'months' | 'years' | 'unspecified';

export type PlanLength = {
	numberOfUnits: number;
	timeUnit: TimeUnit;
};

export type ExerciseVolume = {
	usesRange: boolean;
	values: ExerciseVolumeRange;
};

export type ExerciseVolumeRange = {
	min: number;
	max: number;
};

export type Exercise = {
	name: string;
	reps: ExerciseVolume;
	sets: ExerciseVolume;
};

export type WorkoutSession = {
	id: number;
	name?: string;
	exercises: Exercise[];
};

export type WorkoutPlanMetadata = {
	name: string;
	author: string;
	difficulty: DifficultyLevel;
	workoutsPerWeek: number;
	planLength: PlanLength;
};

export type WorkoutPlanMetadataWithId = WorkoutPlanMetadata & { id: string };

export type WorkoutPlan = WorkoutPlanMetadata & {
	description: string;
	sessions: WorkoutSession[];
	createdAt: Timestamp;
};

export type WorkoutPlanWithId = WorkoutPlan & { id: string };
