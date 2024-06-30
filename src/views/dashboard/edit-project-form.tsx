import React from 'react';
import styled from 'styled-components';
import { Project } from '../../types';
import { EditableText } from '../../components';
import { useEditProjectForm } from './use-edit-project-form';

const Wrapper = styled.div`
	padding: 20px;
`;

interface ProjectDetailsProps {
	project: Project;
	fetchProject: () => Promise<void>;
}

export const EditProjectForm: React.FC<ProjectDetailsProps> = ({ project, fetchProject }) => {
	const { handleSave } = useEditProjectForm({
		project,
		fetchProject,
	});

	return (
		<Wrapper>
			<EditableText value={project.name} save={(name) => handleSave({ name })} fontSize="1.5em" fontWeight="600" />
			<EditableText textArea value={project.description} save={(description) => handleSave({ description })} />
		</Wrapper>
	);
};
