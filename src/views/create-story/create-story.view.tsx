import React, { useState } from 'react';
import { Form, Input, Button, Select, Card } from 'antd';
import styled from 'styled-components';
import { ViewWithHeader } from '../../components';
import { useCreateStory } from './use-create-story';

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

export const CreateStoryView: React.FC = () => {
	const { createStory } = useCreateStory();

	const [loading, setLoading] = useState(false);

	const handleFinish = async (values: any) => {
		if (loading) {
			return;
		}

		setLoading(true);
		await createStory({
			name: values.name,
			description: values.description,
			priority: values.priority,
		});
		setLoading(false);
	};

	return (
		<ViewWithHeader>
			<Wrapper>
				<Card>
					<StyledForm name="create_story" onFinish={handleFinish} layout="vertical">
						<Title>Create New Story</Title>
						<Form.Item name="name" rules={[{ required: true, message: 'Please input the story name!' }]}>
							<Input placeholder="Story Name" />
						</Form.Item>
						<Form.Item name="description" rules={[{ required: true, message: 'Please input the story description!' }]}>
							<TextArea rows={4} placeholder="Story Description" />
						</Form.Item>
						<Form.Item name="priority" rules={[{ required: true, message: 'Please select the story priority!' }]}>
							<Select placeholder="Select Priority">
								<Option value="low">Low</Option>
								<Option value="medium">Medium</Option>
								<Option value="high">High</Option>
							</Select>
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" block loading={loading}>
								Create Story
							</Button>
						</Form.Item>
					</StyledForm>
				</Card>
			</Wrapper>
		</ViewWithHeader>
	);
};
