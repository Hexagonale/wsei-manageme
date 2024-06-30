import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Input } from 'antd';
import { ProjectOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';
import { useCreateProject } from './use-create-project';
import { ViewWithHeader } from '../../components';
import { useMessage } from '../../providers';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;

	> div {
		max-width: 400px;
		width: 100%;
	}
`;

const StyledForm = styled(Form)`
	padding: 24px;
`;

const Title = styled.h1`
	text-align: center;
	margin-bottom: 24px;
`;

const StyledInput = styled(Input)`
	border-radius: 4px;
`;

const SubmitButton = styled(Button)`
	width: 100%;
	border-radius: 4px;
`;

export const CreateProjectView: React.FC = () => {
	const message = useMessage();
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState(false);
	const { createProject } = useCreateProject();

	const onFinish = async (values: any) => {
		setLoading(true);
		const project = await createProject(values.name, values.description);
		setLoading(false);

		if (!project) {
			return;
		}

		message.success('Project created successfully');
		navigate(`/projects/${project.id}`, { replace: true });
	};

	return (
		<ViewWithHeader>
			<Wrapper>
				<Card>
					<StyledForm name="create_project_form" initialValues={{ remember: true }} onFinish={onFinish}>
						<Title>Create New Project</Title>
						<Form.Item name="name" rules={[{ required: true, message: 'Please input project name!' }]}>
							<StyledInput prefix={<ProjectOutlined />} placeholder="Project Name" />
						</Form.Item>
						<Form.Item name="description" rules={[{ required: true, message: 'Please input project description!' }]}>
							<Input.TextArea rows={4} placeholder="Project Description" />
						</Form.Item>
						<Form.Item>
							<SubmitButton type="primary" htmlType="submit" loading={loading}>
								Create Project
							</SubmitButton>
						</Form.Item>
					</StyledForm>
				</Card>
			</Wrapper>
		</ViewWithHeader>
	);
};
