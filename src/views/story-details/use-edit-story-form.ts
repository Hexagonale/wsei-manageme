import { StoriesRepository, UsersRepository } from '../../api';
import { useFirebase, useMessage } from '../../providers';
import { Story, User } from '../../types';
import { useEffect, useState } from 'react';

export const useEditStoryForm = ({ story, fetchStory }: { story: Story; fetchStory: () => Promise<void> }) => {
	const message = useMessage();
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

	return {
		users,
		handleSave,
	};
};
