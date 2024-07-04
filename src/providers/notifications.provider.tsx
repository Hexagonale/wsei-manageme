import React, { useEffect } from 'react';
import { NotificationsService } from '../api';
import { useCurrentUser, useFirebase, useMessage } from '.';

const NotificationsContext = React.createContext<NotificationsService | undefined>(undefined);

interface Props {
	children: React.ReactNode;
}

export const NotificationsProvider: React.FC<Props> = ({ children }) => {
	const message = useMessage();
	const currentUser = useCurrentUser();
	const { firestore } = useFirebase();

	const [notificationsService, setNotificationsService] = React.useState<NotificationsService>();

	useEffect(() => {
		init();
	}, [currentUser]);

	const init = async () => {
		if (!currentUser) {
			return;
		}

		const notificationsService = new NotificationsService(currentUser.uid, firestore);

		try {
			await notificationsService.init();

			setNotificationsService(notificationsService);
		} catch (error) {
			console.error(error);

			message.error('Failed to initialize notifications service');
		}
	};

	useEffect(() => {
		if (!notificationsService) {
			return;
		}

		const subscription = notificationsService.lastNotification.subscribe((notification) => {
			if (notification.priority === 'medium' || notification.priority === 'high') {
				message.info(notification.message);
			}
		});

		return () => subscription.unsubscribe();
	}, [notificationsService, message]);

	useEffect(() => {
		if (!notificationsService) {
			return;
		}

		const subscription = notificationsService.unreadCount().subscribe((unread) => {
			document.title = unread ? `(${unread}) Project Management App` : 'Project Management App';
		});

		return () => subscription.unsubscribe();
	}, [notificationsService]);

	return <NotificationsContext.Provider value={notificationsService}>{children}</NotificationsContext.Provider>;
};

export const useNotifications = () => React.useContext(NotificationsContext);
