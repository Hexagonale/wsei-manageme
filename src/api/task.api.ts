import { Task } from '../types/task.entity';
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

export interface TaskAPI {
	create(task: Task): Promise<Task>;
	read(id: string): Promise<Task>;
	update(task: Task): Promise<Task>;
	delete(id: string): Promise<void>;
	list(storyId: string): Promise<Task[]>;
}

export class TasksRepository implements TaskAPI {
	constructor(private readonly db: Firestore) {}

	private readonly collection = collection(this.db, 'tasks');

	async create(task: Task): Promise<Task> {
		const taskDoc = doc(this.collection);
		await setDoc(taskDoc, { ...task, id: taskDoc.id });

		return { ...task, id: taskDoc.id };
	}

	async read(id: string): Promise<Task> {
		const taskDoc = doc(this.collection, id);
		const taskSnap = await getDoc(taskDoc);
		if (!taskSnap.exists()) {
			throw new Error(`Task with id ${id} not found`);
		}

		return taskSnap.data() as Task;
	}

	async update(task: Pick<Task, 'id'> & Partial<Task>): Promise<Task> {
		const taskDoc = doc(this.collection, task.id);
		await updateDoc(taskDoc, task);

		return this.read(task.id);
	}

	async delete(id: string): Promise<void> {
		const taskDoc = doc(this.collection, id);
		await deleteDoc(taskDoc);
	}

	async list(storyId: string): Promise<Task[]> {
		const tasksQuery = query(this.collection, where('storyId', '==', storyId));
		const taskSnaps = await getDocs(tasksQuery);

		return taskSnaps.docs.map((doc) => doc.data() as Task);
	}
}
