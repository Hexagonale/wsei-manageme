import React from 'react';
import { Button, Card, Skeleton, Typography } from 'antd';
import styled from 'styled-components';
import { useStoryDetails } from './use-story-details';
import { Breadcrumbs, ViewWithHeader } from '../../components';
import { EditStoryForm } from './edit-story-form';
import { Link } from 'react-router-dom';

const Details = styled.div`
	max-width: 800px;
	margin: 0 auto;

	> .actions {
		display: flex;
		justify-content: center;
	}
`;

const TasksContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 32px;

	> .row {
		display: flex;
		flex-direction: column;

		> div {
			display: flex;
			gap: 16px;
			overflow-x: auto;
		}
	}
`;

const TaskCard = styled(Card)`
	cursor: pointer;

	.ant-card-body {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 300px;

		> p {
			white-space: pre;
		}
	}
`;

export const StoryDetailsView: React.FC = () => {
	const { story, tasks, fetchStory } = useStoryDetails();
	if (!story || !tasks) {
		return (
			<ViewWithHeader>
				<Skeleton active />
			</ViewWithHeader>
		);
	}

	const categorizedTasks = {
		todo: tasks.filter((task) => task.status === 'todo'),
		doing: tasks.filter((task) => task.status === 'doing'),
		done: tasks.filter((task) => task.status === 'done'),
	};

	return (
		<ViewWithHeader>
			<Breadcrumbs />
			<Details>
				<EditStoryForm story={story} fetchStory={fetchStory} />
				<div className="actions">
					<Link to={`/projects/${story.projectId}/stories/${story.id}/tasks/new`}>
						<Button type="primary">Add task</Button>
					</Link>
				</div>
			</Details>
			<TasksContainer>
				<div className="row">
					<Typography.Title level={2}>Todo</Typography.Title>
					<div>
						{categorizedTasks.todo.map((task) => (
							<TaskCard key={task.id} title={task.name}>
								<p>{task.description}</p>
							</TaskCard>
						))}
					</div>
				</div>
				<div className="row">
					<Typography.Title level={2}>Doing</Typography.Title>
					<div>
						{categorizedTasks.doing.map((task) => (
							<TaskCard key={task.id} title={task.name}>
								<p>{task.description}</p>
							</TaskCard>
						))}
					</div>
				</div>
				<div className="row">
					<Typography.Title level={2}>Done</Typography.Title>
					<div>
						{categorizedTasks.done.map((task) => (
							<TaskCard key={task.id} title={task.name}>
								<p>{task.description}</p>
							</TaskCard>
						))}
					</div>
				</div>
			</TasksContainer>
		</ViewWithHeader>
	);
};
