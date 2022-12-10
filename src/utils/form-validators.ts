import { Exercise, ExerciseVolume, WorkoutSession } from '../types';

const validateExerciseVolume = (exerciseVolume: ExerciseVolume) => {
	if (exerciseVolume.usesRange) {
		return exerciseVolume.values.min < exerciseVolume.values.max;
	}
	return exerciseVolume.values.min !== 0;
};

const validateExercise = (exercise: Exercise) => {
	if (!validateExerciseVolume(exercise.reps)) {
		return false;
	}

	if (!validateExerciseVolume(exercise.sets)) {
		return false;
	}

	return exercise.name.length !== 0;
};

export const validateWorkoutSession = (workout: WorkoutSession) => {
	if (workout.exercises.length === 0) {
		return false;
	}

	for (let i = 0; i < workout.exercises.length; ++i) {
		if (!validateExercise(workout.exercises[i])) {
			return false;
		}
	}

	return true;
};

export const validateNumericInput = (value: string): boolean => {
	const translatedValue = Number(value);

	if (isNaN(translatedValue)) {
		return false;
	}

	return Math.round(translatedValue) > 0;
};
