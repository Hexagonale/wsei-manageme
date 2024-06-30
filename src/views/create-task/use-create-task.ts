import { useNavigate, useParams } from 'react-router-dom';
import { TasksRepository } from '../../api';
import { useCurrentUser, useFirebase, useMessage } from '../../providers';
import { Task } from '../../types';

export const useCreateTask = () => {
	const { projectId, storyId } = useParams<{ projectId: string; storyId: string }>();

	const message = useMessage();
	const navigate = useNavigate();
	const user = useCurrentUser();
	const { firestore } = useFirebase();
	const tasksRepository = new TasksRepository(firestore);

	const createTask = async ({
		name,
		description,
		priority,
		estimatedTime,
	}: Pick<Task, 'name' | 'description' | 'priority' | 'estimatedTime'>) => {
		if (!projectId) {
			message.error('Project not found');

			navigate('/projects');
			return;
		}

		if (!storyId) {
			message.error('Story not found');

			navigate(`/projects/${projectId}`);
			return;
		}

		if (!user) {
			message.error('User not found');

			navigate('/login');
			return;
		}

		try {
			await tasksRepository.create({
				id: '',
				name,
				description,
				priority,
				estimatedTime,
				storyId,
				status: 'todo',
				creationDate: new Date().toISOString(),
			});

			message.success('Task created successfully');

			navigate(`/projects/${projectId}/stories/${storyId}`, { replace: true });
		} catch (error) {
			console.trace(error);

			message.error('Failed to create task');
		}
	};

	return {
		createTask,
	};
};
