import { message } from 'antd';
import { AuthService } from '../../api';
import { useFirebase } from '../../providers/firebase.provider';

export const useRegister = () => {
	const { auth, firestore } = useFirebase();
	const authService = new AuthService(auth, firestore);

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
