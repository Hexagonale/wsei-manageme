import React, { useState } from 'react';
import { Form, Input, Button, Select, Card } from 'antd';
import styled from 'styled-components';
import { ViewWithHeader } from '../../components';
import { useCreateTask } from './use-create-task';

const { TextArea } = Input;
const { Option } = Select;

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;

	> div {
		max-width: 600px;
		width: 100%;
	}
`;

const StyledForm = styled(Form)`
	padding: 20px;
`;

const Title = styled.h2`
	text-align: center;
	margin-bottom: 20px;
`;

export const CreateTaskView: React.FC = () => {
	const { createTask } = useCreateTask();

	const [loading, setLoading] = useState(false);

	const handleFinish = async (values: any) => {
		if (loading) {
			return;
		}

		setLoading(true);
		await createTask({
			name: values.name,
			description: values.description,
			priority: values.priority,
			estimatedTime: values.estimated_time,
		});
		setLoading(false);
	};

	return (
		<ViewWithHeader>
			<Wrapper>
				<Card>
					<StyledForm name="create_task" onFinish={handleFinish} layout="vertical">
						<Title>Create New Task</Title>
						<Form.Item name="name" rules={[{ required: true, message: 'Please input the task name!' }]}>
							<Input placeholder="Task Name" />
						</Form.Item>
						<Form.Item name="description" rules={[{ required: true, message: 'Please input the task description!' }]}>
							<TextArea rows={4} placeholder="Task Description" />
						</Form.Item>
						<Form.Item name="priority" rules={[{ required: true, message: 'Please select the task priority!' }]}>
							<Select placeholder="Select Priority">
								<Option value="low">Low</Option>
								<Option value="medium">Medium</Option>
								<Option value="high">High</Option>
							</Select>
						</Form.Item>
						<Form.Item name="estimated_time" rules={[{ required: true, message: 'Please input the estimated time!' }]}>
							<Input placeholder="Estimated Time (in hours)" type="number" />
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" block loading={loading}>
								Create Task
							</Button>
						</Form.Item>
					</StyledForm>
				</Card>
			</Wrapper>
		</ViewWithHeader>
	);
};
