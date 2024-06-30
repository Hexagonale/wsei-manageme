import React from 'react';
import { FormValues, LoginForm } from './login-form';
import styled from 'styled-components';
import { useLogin } from './use-login';
import { Card } from 'antd';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;

	> .ant-card {
		max-width: 400px;
		margin: 0 auto;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

		> .ant-card-body {
			padding: 50px;
		}
	}
`;

export const LoginView: React.FC = () => {
	const { login } = useLogin();

	const onFinish = async (values: FormValues) => login(values.email, values.password);

	return (
		<Wrapper>
			<Card>
				<LoginForm onFinish={onFinish} />
			</Card>
		</Wrapper>
	);
};
