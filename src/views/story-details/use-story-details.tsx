import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFirebase, useMessage } from '../../providers';
import { StoriesRepository, TasksRepository } from '../../api';
import { Story, Task } from '../../types';

export const useStoryDetails = () => {
	const { projectId, storyId } = useParams<{ projectId: string; storyId: string }>();

	const message = useMessage();
	const navigate = useNavigate();
	const { firestore } = useFirebase();
	const storiesRepository = new StoriesRepository(firestore);
	const tasksRepository = new TasksRepository(firestore);

	const [story, setStory] = useState<Story>();
	const [tasks, setTasks] = useState<Task[]>();

	useEffect(() => {
		fetchStory();
		fetchTasks();
	}, [storyId]);

	const fetchStory = async () => {
		if (!storyId) {
			message.error('Story not found');

			navigate(`/projects/${projectId}/stories`);
			return;
		}

		try {
			const story = await storiesRepository.read(storyId);

			setStory(story);
		} catch (error) {
			console.trace(error);

			message.error('Failed to load story');
		}
	};

	const fetchTasks = async () => {
		if (!storyId) {
			message.error('Story not found');

			navigate(`/projects/${projectId}/stories`);
			return;
		}

		try {
			const tasks = await tasksRepository.list(storyId);

			setTasks(tasks);
		} catch (error) {
			console.trace(error);

			message.error('Failed to load tasks');
		}
	};

	return {
		story,
		tasks,
		fetchStory,
	};
};
