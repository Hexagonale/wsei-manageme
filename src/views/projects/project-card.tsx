import { styled } from 'styled-components';
import { Project } from '../../types';
import { Button, Card, Popconfirm, Space, Tooltip, message } from 'antd';
import { green, red } from '@ant-design/colors';
import { useProjectCard } from './use-project-card';
import { useState } from 'react';
import { CheckCircleOutlined, InfoCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)`
	.ant-card-body {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
		padding-top: 0;

		> p {
			margin-bottom: 32px;
		}

		> .actions {
			display: flex;
			flex-direction: column;
			gap: 8px;
			align-items: stretch;

			> a > button {
				width: 100%;
			}
		}
	}
`;

interface Props {
	project: Project;
	fetchProjects: () => Promise<void>;
	current: boolean;
}

export const ProjectCard: React.FC<Props> = ({ current, project, fetchProjects }) => {
	const [loading, setLoading] = useState(false);
	const { selectProject, deleteProject } = useProjectCard({ fetch: fetchProjects });

	const _selectProject = async () => {
		if (loading) {
			return;
		}

		setLoading(true);
		await selectProject(project.id);
		setLoading(false);
	};

	const _deleteProject = async () => {
		if (loading) {
			return;
		}

		if (current) {
			message.error('Cannot delete the current project');

			return;
		}

		setLoading(true);
		await deleteProject(project.id);
		setLoading(false);
	};

	return (
		<StyledCard
			key={project.id}
			title={
				<Space size={8} direction="horizontal">
					{project.name}
					{current && (
						<Tooltip title="This is your current project">
							<CheckCircleOutlined style={{ color: green[5] }} />
						</Tooltip>
					)}
				</Space>
			}
		>
			<p>{project.description}</p>
			<div className="actions">
				{current ? (
					<Link to={`/projects/${project.id}`}>
						<Button type="primary" loading={loading}>
							Go to the project
						</Button>
					</Link>
				) : (
					<Button type="primary" loading={loading} onClick={_selectProject}>
						Select project
					</Button>
				)}
				<Popconfirm
					icon={<InfoCircleFilled style={{ color: red[6] }} />}
					title="Delete the project"
					description="Are you sure to delete this project? This action cannot be undone!"
					onConfirm={_deleteProject}
					okText="Yes"
					okButtonProps={{ danger: true }}
					cancelText="No"
				>
					<Button type="primary" danger loading={loading}>
						Delete project
					</Button>
				</Popconfirm>
			</div>
		</StyledCard>
	);
};
