import { collection, doc, getDoc, Firestore, setDoc, updateDoc } from 'firebase/firestore';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import * as uuid from 'uuid';

export interface Notification {
	id: string;
	title: string;
	message: string;
	timestamp: string; // ISO string
	priority: 'low' | 'medium' | 'high';
	read: boolean;
}

export class NotificationsService {
	constructor(
		private readonly userId: string,
		private readonly db: Firestore
	) {}

	private readonly collection = collection(this.db, 'notifications');

	private readonly notificationsSubject: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);
	private readonly lastNotificationSubject = new Subject<Notification>();

	readonly notifications: Observable<Notification[]> = this.notificationsSubject.asObservable();
	readonly lastNotification: Observable<Notification> = this.lastNotificationSubject.asObservable();

	async init() {
		const document = doc(this.collection, this.userId);
		const documentSnapshot = await getDoc(document);

		if (documentSnapshot.exists()) {
			const data = documentSnapshot.data();
			this.notificationsSubject.next(data.notifications);
		}
	}

	async send(forUserId: string, notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) {
		const newNotification: Notification = {
			...notification,
			id: uuid.v4(),
			timestamp: new Date().toISOString(),
			read: false,
		};

		if (this.userId == forUserId) {
			this.notificationsSubject.next([...this.notificationsSubject.value, newNotification]);
			this.lastNotificationSubject.next(newNotification);
		}

		const document = doc(this.collection, forUserId);
		await setDoc(document, {
			notifications: this.notificationsSubject.value,
		});
	}

	unreadCount(): Observable<number> {
		return this.notifications.pipe(
			map((notifications) => notifications.filter((notification) => !notification.read).length)
		);
	}

	async markAsRead(id: string) {
		const updatedNotifications = this.notificationsSubject.value.map((notification) =>
			notification.id === id ? { ...notification, read: true } : notification
		);

		this.notificationsSubject.next(updatedNotifications);

		const document = doc(this.collection, this.userId);
		await updateDoc(document, {
			notifications: updatedNotifications,
		});
	}
}
