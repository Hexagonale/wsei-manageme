import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

const StyledForm = styled(Form)`
	.ant-form-item {
		margin-bottom: 16px;
	}

	.ant-input-affix-wrapper {
		border-radius: 4px;
	}

	.ant-btn-primary {
		width: 100%;
		border-radius: 4px;
	}

	.ant-form-item-children {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.login-link {
		margin-top: 8px;
		text-align: center;
	}
`;

export interface FormValues {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	remember: boolean;
}

interface Props {
	onFinish: (values: FormValues) => Promise<void>;
}

export const RegisterForm: React.FC<Props> = ({ onFinish }) => {
	const [loading, setLoading] = useState(false);

	const _onFinish = async (values: any) => {
		setLoading(true);
		await onFinish(values as FormValues);
		setLoading(false);
	};

	return (
		<StyledForm name="register_form" initialValues={{ remember: true }} onFinish={_onFinish}>
			<Form.Item name="firstName" rules={[{ required: true, message: 'Please input your First Name!' }]}>
				<Input prefix={<UserOutlined />} placeholder="First Name" />
			</Form.Item>
			<Form.Item name="lastName" rules={[{ required: true, message: 'Please input your Last Name!' }]}>
				<Input prefix={<UserOutlined />} placeholder="Last Name" />
			</Form.Item>
			<Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
				<Input prefix={<UserOutlined />} placeholder="Email" />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
				<Input prefix={<LockOutlined />} type="password" placeholder="Password" />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" loading={loading}>
					Register
				</Button>
				<div className="login-link">
					Or <Link to="/login">login</Link>
				</div>
			</Form.Item>
		</StyledForm>
	);
};
