import { useSelector } from 'react-redux';

const useAuth = () => {
	const auth = useSelector((state) => state.auth);
	if (auth?.user && auth?.accessToken) {
		return true;
	} else {
		return false;
	}
};
export default useAuth;
