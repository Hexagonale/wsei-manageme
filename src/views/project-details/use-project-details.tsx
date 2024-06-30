import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase, useMessage } from '../../providers';
import { ProjectsRepository, StoriesRepository } from '../../api';
import { Project, Story } from '../../types';

export const useProjectDetails = () => {
	const { projectId } = useParams<{ projectId: string }>();
	const message = useMessage();
	const { firestore } = useFirebase();
	const projectsRepository = new ProjectsRepository(firestore);
	const storiesRepository = new StoriesRepository(firestore);
	const [project, setProject] = useState<Project>();
	const [stories, setStories] = useState<Story[]>();

	useEffect(() => {
		fetchProject();
		fetchStories();
	}, [projectId]);

	const fetchProject = async () => {
		if (!projectId) {
			return;
		}

		try {
			const project = await projectsRepository.read(projectId);

			setProject(project);
		} catch (error) {
			console.error(error);

			message.error('Failed to fetch project details');
		}
	};

	const fetchStories = async () => {
		if (!projectId) {
			return;
		}

		try {
			const stories = await storiesRepository.list(projectId);

			setStories(stories);
		} catch (error) {
			console.error(error);

			message.error('Failed to fetch stories');
		}
	};

	return {
		project,
		stories,
		fetchProject,
	};
};
