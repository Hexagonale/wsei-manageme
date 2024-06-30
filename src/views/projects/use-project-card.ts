import { PreferencesRepository, ProjectsRepository } from '../../api';
import { useFirebase } from '../../providers/firebase.provider';
import { useCurrentUser, useMessage } from '../../providers';

interface Props {
	fetch: () => Promise<void>;
}

export const useProjectCard = ({ fetch }: Props) => {
	const { firestore } = useFirebase();
	const message = useMessage();
	const user = useCurrentUser();
	const preferencesRepository = new PreferencesRepository(firestore);
	const projectsRepository = new ProjectsRepository(firestore);

	const selectProject = async (projectId: string) => {
		try {
			if (!user) {
				return;
			}

			await preferencesRepository.setActiveProject(user.uid, projectId);
			await fetch();

			message.success('Project selected');
		} catch (error) {
			console.error(error);

			message.error('Failed to select the project');
		}
	};

	const deleteProject = async (projectId: string) => {
		try {
			await projectsRepository.delete(projectId);
			await fetch();
		} catch (error) {
			console.error(error);

			message.error('Failed to delete the project');
		}
	};

	return {
		selectProject,
		deleteProject,
	};
};
