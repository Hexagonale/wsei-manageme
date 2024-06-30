import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormValues, RegisterForm } from './register-form';
import styled from 'styled-components';
import { useRegister } from './use-register';
import { Card, message } from 'antd';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;

	> .ant-card {
		max-width: 400px;
		margin: 0 auto;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		border-radius: 8px;

		> .ant-card-body {
			padding: 50px;
		}
	}
`;

export const RegisterView: React.FC = () => {
	const navigate = useNavigate();
	const { register } = useRegister();

	const onFinish = async (values: FormValues) => {
		await register(values.firstName, values.lastName, values.email, values.password);

		message.success('Registration successful');

		navigate('/login');
	};

	return (
		<Wrapper>
			<Card>
				<RegisterForm onFinish={onFinish} />
			</Card>
		</Wrapper>
	);
};
