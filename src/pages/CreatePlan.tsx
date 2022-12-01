import { FC } from 'react';

import CreatePlanForm from '../components/workout-plans/forms/CreatePlanForm';
import usePageTitle from '../hooks/usePageTitle';

const CreatePlan: FC = () => {
	usePageTitle('Create');

	return <CreatePlanForm />;
};

export default CreatePlan;
