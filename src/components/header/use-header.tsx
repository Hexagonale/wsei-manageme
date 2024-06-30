import { useEffect, useMemo, useState } from 'react';
import { AuthService, PreferencesRepository, ProjectsRepository } from '../../api';
import { useCurrentUser, useFirebase } from '../../providers';
import { Project } from '../../types';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export const NOT_YET_FETCHED = 'NOT_YET_FETCHED';

export const useHeader = () => {
	const navigate = useNavigate();
	const { auth, firestore } = useFirebase();
	const user = useCurrentUser();
	const authService = new AuthService(auth, firestore);
	const preferencesRepository = new PreferencesRepository(firestore);
	const projectsRepository = new ProjectsRepository(firestore);

	const [projects, setProjects] = useState<Project[]>();
	const [currentProjectId, setCurrentProjectId] = useState<string | undefined>(NOT_YET_FETCHED);

	useEffect(() => {
		fetchProjects();
		fetchCurrentProjectId();
	}, [user]);

	const currentProject = useMemo(() => {
		if (!projects || currentProjectId === NOT_YET_FETCHED) {
			return;
		}

		return projects.find((project) => project.id === currentProjectId);
	}, [JSON.stringify(projects), currentProjectId]);

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

	const selectProject = async (projectId: string) => {
		try {
			if (!user) {
				return;
			}

			await preferencesRepository.setActiveProject(user.uid, projectId);
			await fetchProjects();
			await fetchCurrentProjectId();

			navigate(`/projects/${projectId}`);

			message.success('Project selected');
		} catch (error) {
			console.error(error);

			message.error('Failed to select the project');
		}
	};

	const logout = async () => {
		try {
			await authService.logout();

			navigate('/login?logout=1');
		} catch (error) {
			console.error(error);

			message.error('Failed to logout');
		}
	};

	return {
		projects,
		currentProjectId,
		currentProject,
		selectProject,
		logout,
		fetch: async () => {
			await fetchProjects();
			await fetchCurrentProjectId();
		},
	};
};
