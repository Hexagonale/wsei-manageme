import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { Project, Story, Task } from '../types';
import { useFirebase } from '../providers';
import { ProjectsRepository, StoriesRepository, TasksRepository } from '../api';

export const Breadcrumbs: React.FC = () => {
	const { projectId, storyId, taskId } = useParams<{ projectId: string; storyId: string; taskId: string }>();

	const navigate = useNavigate();
	const { firestore } = useFirebase();
	const projectsRepository = new ProjectsRepository(firestore);
	const storiesRepository = new StoriesRepository(firestore);
	const tasksRepository = new TasksRepository(firestore);

	const [project, setProject] = useState<Project>();
	const [story, setStory] = useState<Story>();
	const [task, setTask] = useState<Task>();

	useEffect(() => {
		fetchProject();
	}, [projectId]);

	useEffect(() => {
		fetchStory();
	}, [storyId]);

	useEffect(() => {
		fetchTask();
	}, [taskId]);

	const fetchProject = async () => {
		if (!projectId) {
			return;
		}

		try {
			const project = await projectsRepository.read(projectId);

			setProject(project);
		} catch (error) {
			console.trace(error);
		}
	};

	const fetchStory = async () => {
		if (!storyId) {
			return;
		}

		try {
			const story = await storiesRepository.read(storyId);

			setStory(story);
		} catch (error) {
			console.trace(error);
		}
	};

	const fetchTask = async () => {
		if (!taskId) {
			return;
		}

		try {
			const task = await tasksRepository.read(taskId);

			setTask(task);
		} catch (error) {
			console.trace(error);
		}
	};

	const items: BreadcrumbItemType[] = [];

	if (projectId && project) {
		items.push({
			title: project.name,
			href: '',
			onClick: (e) => {
				e.preventDefault();

				navigate(`/projects/${projectId}`);
			},
		});
	}

	if (projectId && project && storyId && story) {
		items.push({
			title: story.name,
			href: '',
			onClick: (e) => {
				e.preventDefault();

				navigate(`/projects/${projectId}/stories/${storyId}`);
			},
		});
	}

	if (projectId && project && storyId && story && taskId && task) {
		items.push({
			title: task.name,
			href: '',
			onClick: (e) => {
				e.preventDefault();

				navigate(`/projects/${projectId}/stories/${storyId}/tasks/${taskId}`);
			},
		});
	}

	return <Breadcrumb items={items}></Breadcrumb>;
};
