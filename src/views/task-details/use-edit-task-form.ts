import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TasksRepository, UsersRepository } from '../../api';
import { useCurrentUser, useFirebase, useMessage, useNotifications } from '../../providers';
import { Task, User } from '../../types';

export const useEditTaskForm = ({ task, fetchTask }: { task: Task; fetchTask: () => Promise<void> }) => {
	const { projectId, storyId } = useParams<{ projectId: string; storyId: string }>();

	const navigate = useNavigate();
	const message = useMessage();
	const currentUser = useCurrentUser();
	const notifications = useNotifications();
	const { firestore } = useFirebase();
	const tasksRepository = new TasksRepository(firestore);
	const usersRepository = new UsersRepository(firestore);

	const [users, setUsers] = useState<User[]>();

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const users = await usersRepository.list();

			setUsers(users);
		} catch (error) {
			console.trace(error);

			message.error('Failed to fetch users');
		}
	};

	const handleSave = async ({
		name,
		description,
		priority,
		assignedUserId,
		status,
		estimatedTime,
	}: {
		name?: Task['name'];
		description?: Task['description'];
		priority?: Task['priority'];
		assignedUserId?: Task['assignedUserId'];
		status?: Task['status'];
		estimatedTime?: string;
	}) => {
		const parsedEstimatedTime = Number.parseInt(estimatedTime ?? '0');
		if (isNaN(parsedEstimatedTime)) {
			message.error('Invalid estimated time');
			return false;
		}

		try {
			let startDate: string | undefined = undefined;
			if (assignedUserId && assignedUserId !== task.assignedUserId) {
				if (task.status === 'todo') {
					status = 'doing';
					startDate = new Date().toISOString();
				}
			}

			let completionDate: string | undefined = undefined;
			if (status === 'done' && task.status !== 'done') {
				completionDate = new Date().toISOString();
			}

			if (assignedUserId && assignedUserId !== task.assignedUserId && currentUser?.uid === assignedUserId) {
				notifications?.send({
					title: 'Story assigned',
					message: `You have been assigned to the task "${name ?? task.name}"`,
					priority: 'high',
				});
			}

			await tasksRepository.update({
				id: task.id,
				name: name ?? task.name,
				description: description ?? task.description,
				priority: priority ?? task.priority,
				assignedUserId: assignedUserId ?? task.assignedUserId,
				status: status ?? task.status,
				estimatedTime: estimatedTime ? parsedEstimatedTime : task.estimatedTime,
				startDate: startDate ?? task.startDate,
				completionDate: completionDate ?? task.completionDate,
			});
			await fetchTask();

			message.success('Task updated successfully');

			return true;
		} catch (error) {
			console.trace(error);

			message.error('Failed to update task');
			return false;
		}
	};

	const handleDelete = async () => {
		if (!projectId) {
			message.error('Project ID not found');
			navigate('/projects', { replace: true });
			return;
		}

		if (!storyId) {
			message.error('Story ID not found');
			navigate(`/projects/${projectId}`, { replace: true });
			return;
		}

		try {
			await tasksRepository.delete(task.id);

			message.success('Task deleted successfully');

			navigate(`/projects/${projectId}/stories/${storyId}`, { replace: true });
		} catch (error) {
			console.trace(error);

			message.error('Failed to delete task');
		}
	};

	return {
		users,
		handleSave,
		handleDelete,
	};
};
