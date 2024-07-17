import React, { useState, useEffect } from 'react';
import UserCard from '../views/local/UserCard';
import css from '../../styles/users.css';

const { List } = css;

const Plan = (props) => {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => setUsers(json))
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <List>
            {users.map((user) => {
                return <UserCard user={user}/>
            })}
        </List>
    )
}

export default Plan;