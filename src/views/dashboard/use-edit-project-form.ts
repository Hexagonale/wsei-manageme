import { message } from 'antd';
import { ProjectsRepository } from '../../api';
import { useFirebase } from '../../providers';
import { Project } from '../../types';

export const useEditProjectForm = ({
	project,
	fetchProject,
}: {
	project: Project;
	fetchProject: () => Promise<void>;
}) => {
	const { firestore } = useFirebase();
	const projectsRepository = new ProjectsRepository(firestore);

	const handleSave = async ({ name, description }: { name?: string; description?: string }) => {
		try {
			await projectsRepository.update({
				id: project.id,
				name: name ?? project.name,
				description: description ?? project.description,
			});
			await fetchProject();

			message.success('Project updated successfully');

			return true;
		} catch (error) {
			console.trace(error);

			message.error('Failed to update project');
			return false;
		}
	};

	return {
		handleSave,
	};
};
