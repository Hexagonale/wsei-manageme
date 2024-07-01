import { Story } from '../types/story.entity';
import {
	Firestore,
	collection,
	doc,
	getDoc,
	setDoc,
	deleteDoc,
	getDocs,
	query,
	where,
	updateDoc,
} from 'firebase/firestore';
import { removeUndefinedKeys } from '../utils';

export interface StoryAPI {
	create(story: Story): Promise<Story>;
	read(id: string): Promise<Story>;
	update(story: Story): Promise<Story>;
	delete(id: string): Promise<void>;
	list(projectId: string): Promise<Story[]>;
}

export class StoriesRepository implements StoryAPI {
	constructor(private readonly db: Firestore) {}

	private readonly collection = collection(this.db, 'stories');

	async create(story: Story): Promise<Story> {
		const storyDoc = doc(this.collection);
		await setDoc(storyDoc, { ...story, id: storyDoc.id });

		return { ...story, id: storyDoc.id };
	}

	async read(id: string): Promise<Story> {
		const storyDoc = doc(this.collection, id);
		const storySnap = await getDoc(storyDoc);
		if (!storySnap.exists()) {
			throw new Error(`Story with id ${id} not found`);
		}

		return storySnap.data() as Story;
	}

	async update(story: Pick<Story, 'id'> & Partial<Story>): Promise<Story> {
		removeUndefinedKeys(story);

		const storyDoc = doc(this.collection, story.id);
		await updateDoc(storyDoc, story);

		return this.read(story.id);
	}

	async delete(id: string): Promise<void> {
		const storyDoc = doc(this.collection, id);
		await deleteDoc(storyDoc);
	}

	async list(projectId: string): Promise<Story[]> {
		const storiesQuery = query(this.collection, where('projectId', '==', projectId));
		const storySnaps = await getDocs(storiesQuery);

		return storySnaps.docs.map((doc) => doc.data() as Story);
	}
}
