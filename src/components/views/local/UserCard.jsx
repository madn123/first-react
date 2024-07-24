import React from 'react';
import css from '../../../styles/users.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux-state/data/userSlice';
import setNotification from '../../../helpers/notifications';

const { User, Title, Text } = css;

const UserCard = (props) => {
    const {user} = props;
    const dispatch = useDispatch();

    const handleClick = (user) => {
        dispatch(setUser(user));
        setNotification({message:`Вы авторизовались под пользователем ${user.name}`, type:'success'});
    }

    return (
        <User key={user.id} onClick={() => handleClick(user)}>
            <Title>{user.name}</Title>
            <Text>{user.email}</Text>
            <Text>{user.website}</Text>
        </User>
    )
}

export default UserCard;