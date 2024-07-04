import { useNavigate, useParams } from 'react-router-dom';
import { StoriesRepository, UsersRepository } from '../../api';
import { useCurrentUser, useFirebase, useMessage, useNotifications } from '../../providers';
import { Story, User } from '../../types';
import { useEffect, useState } from 'react';

export const useEditStoryForm = ({ story, fetchStory }: { story: Story; fetchStory: () => Promise<void> }) => {
	const { projectId } = useParams<{ projectId: string }>();

	const navigate = useNavigate();
	const message = useMessage();
	const currentUser = useCurrentUser();
	const notifications = useNotifications();
	const { firestore } = useFirebase();
	const storiesRepository = new StoriesRepository(firestore);
	const usersRepository = new UsersRepository(firestore);

	const [users, setUsers] = useState<User[]>();

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const users = await usersRepository.list();

			setUsers(users);
		} catch (error) {
			console.trace(error);

			message.error('Failed to fetch users');
		}
	};

	const handleSave = async ({
		name,
		description,
		priority,
		ownerId,
		status,
	}: {
		name?: Story['name'];
		description?: Story['description'];
		priority?: Story['priority'];
		ownerId?: Story['ownerId'];
		status?: Story['status'];
	}) => {
		if (ownerId && ownerId !== story.ownerId && currentUser?.uid === ownerId) {
			notifications?.send({
				title: 'Story assigned',
				message: `You have been assigned to the story "${name ?? story.name}"`,
				priority: 'low',
			});
		}

		try {
			await storiesRepository.update({
				id: story.id,
				name: name ?? story.name,
				description: description ?? story.description,
				priority: priority ?? story.priority,
				ownerId: ownerId ?? story.ownerId,
				status: status ?? story.status,
			});
			await fetchStory();

			message.success('Story updated successfully');

			return true;
		} catch (error) {
			console.trace(error);

			message.error('Failed to update story');
			return false;
		}
	};

	const handleDelete = async () => {
		if (!projectId) {
			message.error('Project ID not found');
			navigate('/projects', { replace: true });
			return;
		}

		try {
			await storiesRepository.delete(story.id);

			message.success('Story deleted successfully');

			navigate(`/projects/${projectId}`, { replace: true });
		} catch (error) {
			console.trace(error);

			message.error('Failed to delete Story');
		}
	};

	return {
		users,
		handleSave,
		handleDelete,
	};
};
