import { useEffect, useState } from 'react';
import { PreferencesRepository, ProjectsRepository } from '../../api';
import { useFirebase } from '../../providers/firebase.provider';
import { Project } from '../../types';
import { useCurrentUser, useMessage } from '../../providers';

export const NOT_YET_FETCHED = 'NOT_YET_FETCHED';

export const useProjects = () => {
	const { firestore } = useFirebase();
	const message = useMessage();
	const user = useCurrentUser();
	const preferencesRepository = new PreferencesRepository(firestore);
	const projectsRepository = new ProjectsRepository(firestore);

	const [projects, setProjects] = useState<Project[]>();
	const [currentProjectId, setCurrentProjectId] = useState<string | undefined>(NOT_YET_FETCHED);

	useEffect(() => {
		fetchProjects();
		fetchCurrentProjectId();
	}, [user]);

	const fetchProjects = async () => {
		try {
			const projects = await projectsRepository.list();

			setProjects(projects);
		} catch (error) {
			console.error(error);

			message.error('Failed to fetch projects');
		}
	};

	const fetchCurrentProjectId = async () => {
		try {
			if (!user) {
				return;
			}

			const projectId = await preferencesRepository.getActiveProject(user.uid);

			setCurrentProjectId(projectId);
		} catch (error) {
			console.error(error);

			message.error('Failed to fetch the current project');
		}
	};

	return {
		projects,
		currentProjectId,
		fetch: async () => {
			await fetchProjects();
			await fetchCurrentProjectId();
		},
	};
};
