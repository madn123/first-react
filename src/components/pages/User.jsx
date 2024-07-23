import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers } from '../../redux-state/data/selectors';
import { fetchUsers } from '../../redux-state/data/userSlice';
import UserCard from '../views/local/UserCard';
import css from '../../styles/users.css';

const { List } = css;

const User = () => {
    const dispatch = useDispatch();

    const user = useSelector(selectUsers);

    useEffect(() => {
        dispatch(fetchUsers());
      }, []);

    return (
        <List>
            {user.loading && <div>Loading...</div>}
            {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
            {!user.loading && user.users.length ? (
                user.users.map((user) => {
                    return <UserCard user={user} key={user.id} />
                })
            ) : null }
        </List>
    )
}

export default User;