import { AuthService, UsersRepository } from '../../api';
import { useFirebase } from '../../providers/firebase.provider';
import { useMessage } from '../../providers';

export const useRegister = () => {
	const message = useMessage();
	const { auth, firestore } = useFirebase();
	const usersRepository = new UsersRepository(firestore);
	const authService = new AuthService(auth, usersRepository);

	const register = async (firstName: string, lastName: string, email: string, password: string) => {
		try {
			await authService.register(firstName, lastName, email, password);
		} catch (error) {
			message.error('Failed to register');

			console.error(error);
		}
	};

	return {
		register,
	};
};
