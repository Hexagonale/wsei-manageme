import React from 'react';
import styled from 'styled-components';
import { Project } from '../../types';
import { EditableText } from '../../components';
import { useEditProjectForm } from './use-edit-project-form';

const Wrapper = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

interface EditProjectFormProps {
	project: Project;
	fetchProject: () => Promise<void>;
}

export const EditProjectForm: React.FC<EditProjectFormProps> = ({ project, fetchProject }) => {
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
