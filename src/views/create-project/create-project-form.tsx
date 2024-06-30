import React from 'react';
import { Form, Input, Button } from 'antd';
import { ProjectOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
`;

const StyledForm = styled(Form)`
	width: 400px;
`;

interface FormValues {
	name: string;
	description: string;
}

interface Props {
	onFinish: (values: FormValues) => void;
}

export const CreateProjectForm: React.FC<Props> = ({ onFinish }) => {
	const onFinishForm = (values: any) => {
		onFinish(values as FormValues);
	};

	return (
		<Wrapper>
			<StyledForm name="create_project_form" initialValues={{ remember: true }} onFinish={onFinishForm}>
				<Form.Item name="name" rules={[{ required: true, message: 'Please input project name!' }]}>
					<Input prefix={<ProjectOutlined />} placeholder="Project Name" />
				</Form.Item>
				<Form.Item name="description" rules={[{ required: true, message: 'Please input project description!' }]}>
					<Input.TextArea rows={4} placeholder="Project Description" />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Create Project
					</Button>
				</Form.Item>
			</StyledForm>
		</Wrapper>
	);
};
