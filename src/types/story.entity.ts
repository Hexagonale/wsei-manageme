import { Priority } from './priority';

export type StoryStatus = 'todo' | 'doing' | 'done';

export interface Story {
	id: string;
	name: string;
	description: string;
	priority: Priority;
	projectId: string;
	creationDate: string; // ISOString
	status: StoryStatus;
	ownerId: string; // User ID
}
