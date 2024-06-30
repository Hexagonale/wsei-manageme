import React from 'react';
import { Button, Card, Skeleton, Typography } from 'antd';
import styled from 'styled-components';
import { useProjectDetails } from './use-project-details';
import { ViewWithHeader } from '../../components';
import { EditProjectForm } from './edit-project-form';
import { Link } from 'react-router-dom';

const Details = styled.div`
	max-width: 600px;
	margin: 0 auto;

	> .actions {
		display: flex;
		justify-content: center;
	}
`;

const StoriesContainer = styled.div`
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

const StoryCard = styled(Card)`
	.ant-card-body {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 300px;
	}
`;

export const ProjectDetailsView: React.FC = () => {
	const { project, stories, fetchProject } = useProjectDetails();

	if (!project || !stories) {
		return (
			<ViewWithHeader>
				<Skeleton active />
			</ViewWithHeader>
		);
	}

	const categorizedStories = {
		todo: stories.filter((story) => story.status === 'todo'),
		doing: stories.filter((story) => story.status === 'doing'),
		done: stories.filter((story) => story.status === 'done'),
	};

	return (
		<ViewWithHeader>
			<Details>
				<EditProjectForm project={project} fetchProject={fetchProject} />
				<div className="actions">
					<Link to={`/projects/${project.id}/stories/new`}>
						<Button type="primary">Add story</Button>
					</Link>
				</div>
			</Details>
			<StoriesContainer>
				<div className="row">
					<Typography.Title level={2}>Todo</Typography.Title>
					<div>
						{categorizedStories.todo.map((story) => (
							<StoryCard key={story.id} title={story.name}>
								<p>{story.description}</p>
							</StoryCard>
						))}
					</div>
				</div>
				<div className="row">
					<Typography.Title level={2}>Doing</Typography.Title>
					<div>
						{categorizedStories.doing.map((story) => (
							<StoryCard key={story.id} title={story.name}>
								<p>{story.description}</p>
							</StoryCard>
						))}
					</div>
				</div>
				<div className="row">
					<Typography.Title level={2}>Done</Typography.Title>
					<div>
						{categorizedStories.done.map((story) => (
							<StoryCard key={story.id} title={story.name}>
								<p>{story.description}</p>
							</StoryCard>
						))}
					</div>
				</div>
			</StoriesContainer>
		</ViewWithHeader>
	);
};
