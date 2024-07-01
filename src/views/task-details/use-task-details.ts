// use-task-details.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFirebase, useMessage } from '../../providers';
import { TasksRepository } from '../../api';
import { Task } from '../../types';

export const useTaskDetails = () => {
	const { projectId, storyId, taskId } = useParams<{ projectId: string; storyId: string; taskId: string }>();

	const message = useMessage();
	const navigate = useNavigate();
	const { firestore } = useFirebase();
	const tasksRepository = new TasksRepository(firestore);

	const [task, setTask] = useState<Task>();

	useEffect(() => {
		fetchTask();
	}, [taskId]);

	const fetchTask = async () => {
		if (!taskId) {
			message.error('Task not found');

			navigate(`/projects/${projectId}/stories/${storyId}`);
			return;
		}

		try {
			const task = await tasksRepository.read(taskId);

			setTask(task);
		} catch (error) {
			console.trace(error);

			message.error('Failed to load task');
		}
	};

	return {
		task,
		fetchTask,
	};
};
