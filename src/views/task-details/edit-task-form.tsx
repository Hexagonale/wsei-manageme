// edit-task-form.tsx
import React from 'react';
import styled from 'styled-components';
import { Task } from '../../types';
import { EditableText } from '../../components';
import { useEditTaskForm } from './use-edit-task-form';
import { Button, Select, Skeleton, Typography } from 'antd';
import { formatDateTime } from '../../utils';
import { DeleteOutlined } from '@ant-design/icons';

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

interface EditTaskFormProps {
	task: Task;
	fetchTask: () => Promise<void>;
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, fetchTask }) => {
	const { users, handleSave, handleDelete } = useEditTaskForm({
		task,
		fetchTask,
	});

	if (!users) {
		return <Skeleton active />;
	}

	return (
		<Wrapper>
			<div>
				<EditableText value={task.name} save={(name) => handleSave({ name })} fontSize="1.5em" fontWeight="600" />
				<EditableText textArea value={task.description} save={(description) => handleSave({ description })} />
			</div>
			<div>
				<div>
					<Typography.Text strong>Status</Typography.Text>
					<Select value={task.status} onSelect={(status) => handleSave({ status })}>
						<Select.Option value="todo">todo</Select.Option>
						<Select.Option value="doing">doing</Select.Option>
						<Select.Option value="done">done</Select.Option>
					</Select>
				</div>
				<div>
					<Typography.Text strong>Priority</Typography.Text>
					<Select value={task.priority} onSelect={(priority) => handleSave({ priority })}>
						<Select.Option value="low">Low</Select.Option>
						<Select.Option value="medium">Medium</Select.Option>
						<Select.Option value="high">High</Select.Option>
					</Select>
				</div>
				<div>
					<Typography.Text strong>Assigned User</Typography.Text>
					<Select
						value={task.assignedUserId}
						onSelect={(assignedUserId) => handleSave({ assignedUserId })}
						options={users
							.filter((user) => user.role !== 'admin')
							.map((user) => ({
								label: `${user.firstName} ${user.lastName}`,
								value: user.id,
							}))}
					/>
				</div>
				<div>
					<Typography.Text strong>Estimated Time</Typography.Text>
					<Typography.Text>
						<EditableText
							value={task.estimatedTime.toString()}
							save={(estimatedTime) => handleSave({ estimatedTime })}
							type="number"
							suffix="h"
						/>
					</Typography.Text>
				</div>
				<div>
					<Typography.Text strong>Start Date</Typography.Text>
					<Typography.Text>{task.startDate ? formatDateTime(task.startDate) : '-'}</Typography.Text>
				</div>
				<div>
					<Typography.Text strong>Completion Date</Typography.Text>
					<Typography.Text>{task.completionDate ? formatDateTime(task.completionDate) : '-'}</Typography.Text>
				</div>
				<div>
					<Typography.Text strong>Creation Date</Typography.Text>
					<Typography.Text>{formatDateTime(task.creationDate)}</Typography.Text>
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
