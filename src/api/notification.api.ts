import { Observable } from 'rxjs';

export interface NotificationService {
	send(notification: Notification): void;
	list(): Observable<Notification[]>;
	unreadCount(): Observable<number>;
}
