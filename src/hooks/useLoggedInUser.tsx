import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useEffect,
	useState
} from 'react';
import { User } from 'firebase/auth';

import { onAuthChanged } from '../utils/firebase';

type UserState = [User | undefined, Dispatch<SetStateAction<User | undefined>>];

const UserContext = createContext<UserState>(undefined as never);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
	const userState = useState<User | undefined>();
	const [_, setUser] = userState;

	useEffect(() => {
		onAuthChanged(u => setUser(u ?? undefined));
	}, []);

	return (
		<UserContext.Provider value={userState}>{children}</UserContext.Provider>
	);
};

const useLoggedInUser = () => {
	const [user, _] = useContext(UserContext);

	return user;
};

export default useLoggedInUser;
