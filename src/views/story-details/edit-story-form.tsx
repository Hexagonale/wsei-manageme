import React from 'react';
import styled from 'styled-components';
import { Story } from '../../types';
import { EditableText } from '../../components';
import { useEditStoryForm } from './use-edit-story-form';
import { Button, Select, Skeleton, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { formatDateTime } from '../../utils';

const Wrapper = styled.div`
	padding: 16px;
	display: flex;
	gap: 16px;

	> div {
		display: flex;
		flex-direction: column;

		&:first-child {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		&:last-child {
			width: 200px;
			gap: 16px;

			> div {
				display: flex;
				flex-direction: column;
				gap: 4px;
			}
		}
	}
`;

interface EditStoryFormProps {
	story: Story;
	fetchStory: () => Promise<void>;
}

export const EditStoryForm: React.FC<EditStoryFormProps> = ({ story, fetchStory }) => {
	const { users, handleSave, handleDelete } = useEditStoryForm({
		story,
		fetchStory,
	});

	if (!users) {
		return <Skeleton active />;
	}

	return (
		<Wrapper>
			<div>
				<EditableText value={story.name} save={(name) => handleSave({ name })} fontSize="1.5em" fontWeight="600" />
				<EditableText textArea value={story.description} save={(description) => handleSave({ description })} />
			</div>
			<div>
				<div>
					<Typography.Text strong>State</Typography.Text>
					<Select value={story.status} onSelect={(status) => handleSave({ status })}>
						<Select.Option value="todo">todo</Select.Option>
						<Select.Option value="doing">doing</Select.Option>
						<Select.Option value="done">done</Select.Option>
					</Select>
				</div>
				<div>
					<Typography.Text strong>Priority</Typography.Text>
					<Select value={story.priority} onSelect={(priority) => handleSave({ priority })}>
						<Select.Option value="low">Low</Select.Option>
						<Select.Option value="medium">Medium</Select.Option>
						<Select.Option value="high">High</Select.Option>
					</Select>
				</div>
				<div>
					<Typography.Text strong>Owner</Typography.Text>
					<Select
						value={story.ownerId}
						onSelect={(ownerId) => handleSave({ ownerId })}
						options={users.map((user) => ({
							label: `${user.firstName} ${user.lastName}`,
							value: user.id,
						}))}
					/>
				</div>
				<div>
					<Typography.Text strong>Creation Date</Typography.Text>
					<Typography.Text>{formatDateTime(story.creationDate)}</Typography.Text>
				</div>
				<div>
					<Button type="primary" danger onClick={handleDelete}>
						<DeleteOutlined /> Delete
					</Button>
				</div>
			</div>
		</Wrapper>
	);
};
