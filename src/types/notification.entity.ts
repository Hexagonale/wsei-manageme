export type NotificationPriority = 'low' | 'medium' | 'high';

export interface Notification {
	title: string;
	message: string;
	date: string; // ISOString
	priority: NotificationPriority;
	read: boolean;
}
