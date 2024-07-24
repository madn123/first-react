import { selectUsers } from '../redux-state/data/selectors';
import { useSelector } from 'react-redux';

const useUserById = (userId) => {
    const userState = useSelector(selectUsers);
    return userState.users[0];
}

export default useUserById;