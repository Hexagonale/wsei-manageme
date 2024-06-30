import { PreferencesRepository, ProjectsRepository } from '../../api';
import { useFirebase } from '../../providers/firebase.provider';
import { useCurrentUser, useMessage } from '../../providers';

export const useCreateProject = () => {
	const message = useMessage();
	const user = useCurrentUser();
	const { firestore } = useFirebase();
	const projectsRepository = new ProjectsRepository(firestore);
	const preferencesRepository = new PreferencesRepository(firestore);

	const createProject = async (name: string, description: string) => {
		try {
			if (!user) {
				return;
			}

			const project = await projectsRepository.create({
				id: '',
				name,
				description,
			});
			await preferencesRepository.setActiveProject(user.uid, project.id);

			return project;
		} catch (error) {
			console.error(error);

			message.error('Failed to create project');
		}
	};

	return {
		createProject,
	};
};
