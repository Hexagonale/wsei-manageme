import React from 'react';
import { Card, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NOT_YET_FETCHED, useProjects } from './use-projects';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { ProjectCard } from './project-card';
import { blue } from '@ant-design/colors';
import { ViewWithHeader } from '../../components';

const ProjectsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 20px;
	max-width: 1200px;
	width: 100%;
	margin: 0 auto;

	> .create-new-project-card {
		display: flex;
		flex-direction: column;

		> .ant-card-body {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 56px;
			cursor: pointer;
			color: ${blue[5]};
			flex: 1;
		}
	}
`;

export const ProjectsView: React.FC = () => {
	const navigate = useNavigate();
	const { projects, currentProjectId, fetch } = useProjects();

	if (!projects || currentProjectId === NOT_YET_FETCHED) {
		return (
			<ViewWithHeader>
				<Skeleton active />
			</ViewWithHeader>
		);
	}

	return (
		<ViewWithHeader>
			<ProjectsContainer>
				{projects.map((project) => (
					<ProjectCard
						key={project.id}
						project={project}
						fetchProjects={fetch}
						current={project.id === currentProjectId}
					/>
				))}
				<Card className="create-new-project-card" title="Create New Project" onClick={() => navigate('/projects/new')}>
					<AppstoreAddOutlined />
				</Card>
			</ProjectsContainer>
		</ViewWithHeader>
	);
};
