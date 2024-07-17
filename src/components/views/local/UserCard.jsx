import React from 'react';
import css from '../../../styles/users.css';

const { User, Title, Text } = css;

const UserCard = (props) => {
    const {user} = props;

    return (
        <User key={user.id}>
            <Title>{user.name}</Title>
            <Text>{user.email}</Text>
            <Text>{user.website}</Text>
        </User>
    )
}

export default UserCard;