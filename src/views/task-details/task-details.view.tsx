// task-details.view.tsx
import React from 'react';
import { Skeleton } from 'antd';
import styled from 'styled-components';
import { useTaskDetails } from './use-task-details';
import { Breadcrumbs, ViewWithHeader } from '../../components';
import { EditTaskForm } from './edit-task-form';

const Details = styled.div`
	max-width: 800px;
	margin: 0 auto;
`;

export const TaskDetailsView: React.FC = () => {
	const { task, fetchTask } = useTaskDetails();
	if (!task) {
		return (
			<ViewWithHeader>
				<Skeleton active />
			</ViewWithHeader>
		);
	}

	return (
		<ViewWithHeader>
			<Breadcrumbs />
			<Details>
				<EditTaskForm task={task} fetchTask={fetchTask} />
			</Details>
		</ViewWithHeader>
	);
};
