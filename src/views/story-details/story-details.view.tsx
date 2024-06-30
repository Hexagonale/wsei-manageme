import React from 'react';
import { Skeleton } from 'antd';
import styled from 'styled-components';
import { useStoryDetails } from './use-story-details';
import { ViewWithHeader } from '../../components';
import { EditStoryForm } from './edit-story-form';

const Details = styled.div`
	max-width: 800px;
	margin: 0 auto;

	> .actions {
		display: flex;
		justify-content: center;
	}
`;

export const StoryDetailsView: React.FC = () => {
	const { story, fetchStory } = useStoryDetails();

	if (!story) {
		return (
			<ViewWithHeader>
				<Skeleton active />
			</ViewWithHeader>
		);
	}

	return (
		<ViewWithHeader>
			<Details>
				<EditStoryForm story={story} fetchStory={fetchStory} />
			</Details>
		</ViewWithHeader>
	);
};
