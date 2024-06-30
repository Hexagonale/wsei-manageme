import { Priority } from './priority';

export type TaskStatus = 'todo' | 'doing' | 'done';

export interface Task {
	id: string;
	name: string;
	description: string;
	priority: Priority;
	storyId: string; // Story ID
	estimatedTime: number; // In hours
	status: TaskStatus;
	creationDate: string; // ISOString
	startDate?: string; // ISOString, optional, set when status changes to 'doing'
	completionDate?: string; // ISOString, optional, set when status changes to 'done'
	assignedUserId?: string; // User ID, optional, set when assigned
}
