import React, { useEffect, useState } from 'react';
import { List, Badge, Typography } from 'antd';
import { useNotifications } from '../../providers';
import { Notification } from '../../api';
import { ViewWithHeader } from '../../components';
import { styled } from 'styled-components';

const Wrapper = styled.div`
	margin-top: 32px;
	display: flex;
	flex-direction: column;
	align-items: stretch;

	> span:first-child {
		align-self: center;
		margin-bottom: 32px;

		> h2 {
			margin: 0;
		}
	}
`;

export const NotificationsView: React.FC = () => {
	const notificationService = useNotifications();
	const [unreadCount, setUnreadCount] = useState(0);
	const [notifications, setNotifications] = useState<Notification[]>([]);

	useEffect(() => {
		if (!notificationService) {
			return;
		}

		const unreadCountSubscription = notificationService.unreadCount().subscribe(setUnreadCount);
		const notificationsSubscription = notificationService.notifications.subscribe((notifications) => {
			notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

			setNotifications(notifications);
		});

		return () => {
			unreadCountSubscription.unsubscribe();
			notificationsSubscription.unsubscribe();
		};
	}, [notificationService]);

	const handleMarkAsRead = (id: string) => {
		notificationService?.markAsRead(id);
	};

	return (
		<ViewWithHeader>
			<Wrapper>
				<Badge count={unreadCount} offset={[10, 0]} style={{ marginBottom: 16 }}>
					<Typography.Title level={2}>Notifications</Typography.Title>
				</Badge>
				<List
					itemLayout="horizontal"
					dataSource={notifications}
					renderItem={(notification) => (
						<List.Item
							actions={[!notification.read && <a onClick={() => handleMarkAsRead(notification.id)}>Mark as read</a>]}
						>
							<List.Item.Meta
								title={notification.message}
								description={new Date(notification.timestamp).toLocaleString()}
							/>
							{!notification.read && <Badge status="processing" text="Unread" />}
						</List.Item>
					)}
				/>
			</Wrapper>
		</ViewWithHeader>
	);
};
