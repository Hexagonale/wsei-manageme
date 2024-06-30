import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFirebase, useMessage } from '../../providers';
import { StoriesRepository } from '../../api';
import { Story } from '../../types';

export const useStoryDetails = () => {
	const { projectId, storyId } = useParams<{ projectId: string; storyId: string }>();

	const message = useMessage();
	const navigate = useNavigate();
	const { firestore } = useFirebase();
	const storiesRepository = new StoriesRepository(firestore);

	const [story, setStory] = useState<Story>();

	useEffect(() => {
		fetchStory();
	}, [storyId]);

	const fetchStory = async () => {
		if (!storyId) {
			message.error('Story not found');

			navigate(`/projects/${projectId}/stories`);
			return;
		}

		try {
			const story = await storiesRepository.read(storyId);

			setStory(story);
		} catch (error) {
			console.trace(error);

			message.error('Failed to load story');
		}
	};

	return {
		story,
		fetchStory,
	};
};
