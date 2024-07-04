import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Dropdown, Button, MenuProps, Switch, Badge } from 'antd';
import { BellOutlined, DownOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { NOT_YET_FETCHED, useHeader } from './use-header';
import { Theme, useNotifications, useThemeManager } from '../../providers';
import styled from 'styled-components';

const { Header: AntHeader } = Layout;

const StyledHeader = styled(AntHeader)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
	z-index: 1;

	> h2 {
		color: white;
		margin: 0;
		cursor: pointer;
	}

	> div {
		display: flex;
		gap: 16px;
		align-items: center;
	}
`;

export const Header: React.FC = () => {
	const navigate = useNavigate();
	const notifications = useNotifications();
	const { currentTheme, changeTheme } = useThemeManager();
	const { projects, currentProjectId, currentProject, selectProject, logout } = useHeader();
	const [loggingOut, setLoggingOut] = useState(false);
	const [unreadCount, setUnreadCount] = useState(0);

	useEffect(() => {
		if (!notifications) {
			return;
		}

		const subscription = notifications.unreadCount().subscribe((unread) => {
			setUnreadCount(unread);
		});

		return () => subscription.unsubscribe();
	}, [notifications]);

	const handleProjectChange = (projectId: string) => {
		selectProject(projectId);
	};

	const handleLogout = async () => {
		if (loggingOut) {
			return;
		}

		setLoggingOut(true);
		await logout();
		setLoggingOut(false);
	};

	if (!projects || currentProjectId === NOT_YET_FETCHED) {
		return (
			<StyledHeader className="header">
				<h2 onClick={() => navigate('/projects')}>Project Management App</h2>
			</StyledHeader>
		);
	}

	const items: MenuProps['items'] = projects.map((project) => ({
		key: project.id,
		label: project.name,
		onClick: () => handleProjectChange(project.id),
	}));

	return (
		<StyledHeader className="header">
			<h2 onClick={() => navigate('/projects')}>Project Management App</h2>
			<div>
				<Switch
					checked={currentTheme === Theme.DARK}
					checkedChildren={<MoonOutlined />}
					unCheckedChildren={<SunOutlined />}
					onChange={(checked) => changeTheme(checked ? Theme.DARK : Theme.LIGHT)}
				/>
				<Dropdown
					menu={{
						selectedKeys: currentProjectId ? [currentProjectId] : undefined,
						items,
					}}
				>
					<Button>
						{currentProject ? currentProject.name : 'Select Project'} <DownOutlined />
					</Button>
				</Dropdown>
				<Button type="primary" onClick={handleLogout} loading={loggingOut}>
					Logout
				</Button>
				<Link to="/notifications">
					<Badge count={unreadCount}>
						<BellOutlined style={{ fontSize: '1.5em' }} />
					</Badge>
				</Link>
			</div>
		</StyledHeader>
	);
};
