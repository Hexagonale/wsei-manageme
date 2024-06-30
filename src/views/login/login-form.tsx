import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
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

	.register-now-link {
		margin-top: 8px;
		text-align: center;
	}
`;

export interface FormValues {
	email: string;
	password: string;
	remember: boolean;
}

interface Props {
	onFinish: (values: FormValues) => Promise<void>;
}

export const LoginForm: React.FC<Props> = ({ onFinish }) => {
	const [loading, setLoading] = useState(false);

	const _onFinish = async (values: any) => {
		setLoading(true);
		await onFinish(values as FormValues);
		setLoading(false);
	};

	return (
		<StyledForm name="login_form" initialValues={{ remember: true }} onFinish={_onFinish}>
			<Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
				<Input prefix={<UserOutlined />} placeholder="Email" />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
				<Input prefix={<LockOutlined />} type="password" placeholder="Password" />
			</Form.Item>
			<Form.Item>
				<Form.Item name="remember" valuePropName="checked" noStyle>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" loading={loading}>
					Log in
				</Button>
			</Form.Item>
			<div className="register-now-link">
				Or <Link to="/register">register now!</Link>
			</div>
		</StyledForm>
	);
};
