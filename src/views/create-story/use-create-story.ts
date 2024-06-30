import { useNavigate, useParams } from 'react-router-dom';
import { StoriesRepository } from '../../api';
import { useCurrentUser, useFirebase, useMessage } from '../../providers';
import { Story } from '../../types';

export const useCreateStory = () => {
	const { projectId } = useParams<{ projectId: string }>();

	const message = useMessage();
	const navigate = useNavigate();
	const user = useCurrentUser();
	const { firestore } = useFirebase();
	const storiesRepository = new StoriesRepository(firestore);

	const createStory = async ({ name, description, priority }: Pick<Story, 'name' | 'description' | 'priority'>) => {
		if (!projectId) {
			message.error('Project ID not found');

			navigate('/projects');
			return;
		}

		if (!user) {
			message.error('User not found');

			navigate('/login');
			return;
		}

		try {
			await storiesRepository.create({
				id: '',
				name,
				description,
				priority,
				status: 'todo',
				projectId,
				creationDate: new Date().toISOString(),
				ownerId: user.uid,
			});

			message.success('Story created successfully');

			navigate(`/projects/${projectId}`, { replace: true });
		} catch (error) {
			console.trace(error);

			message.error('Failed to create story');
		}
	};

	return {
		createStory,
	};
};
