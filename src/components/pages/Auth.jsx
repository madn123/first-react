import React, { useState } from 'react';
import css from '../../styles/dataList.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useQuery, Query } from '@redux-requests/react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import setNotification from '../../helpers/notifications';
import { setUser } from '../../redux-state/data/userSlice';
import { useDispatch } from 'react-redux';

const {DataContainer} = css;

export default function Auth() {
    const dispatch = useDispatch();

    const [userId, setUserId] = useState(0);
    const [userPass, setUserPass] = useState('');

    const [errors, setErrors] = useState({id:'',pass:''});
  
    const { data, error, loading, pristine } = useQuery({ type: 'FETCH_USERS' });

    const handleChangeId = (event) => {
        setUserId(event.target.value);
    }

    const handleChangePass = (event) => {
        setUserPass(event.target.value);
    }

    const handleClick = () => {
        setErrors({id:'', pass:''});

        if (userId === 0) {
            const errorMessage = 'Не выбран пользователь!';
            setErrors((prevErrors) => ({
                ...prevErrors,
                id: errorMessage
            }));
            setNotification({message:errorMessage, type:'danger'});
            return;
        }

        const user = data.find(user => user.id === userId);
        
        if (user.length === 0) {
            const errorMessage = 'Не найден пользователь!';
            setErrors((prevErrors) => ({
                ...prevErrors,
                id: errorMessage
            }));
            setNotification({message:errorMessage, type:'danger'});
            return;
        }

        if (userPass.length === 0) {
            const errorMessage = 'Введите пароль!';
            setErrors((prevErrors) => ({
                ...prevErrors,
                pass: errorMessage
            }));
            setNotification({message:errorMessage, type:'danger'});
            return;
        }

        if (userPass !== user.username) {
            const errorMessage = 'Неверный пароль!';
            setErrors((prevErrors) => ({
                ...prevErrors,
                pass: errorMessage
            }));
            setNotification({message:errorMessage, type:'danger'});
            return;
        }

        dispatch(setUser(user));
        setNotification({message:`Вы авторизовались под пользователем ${user.name}`, type:'success'});
    }
  
    return (
        <DataContainer>
            <Box 
                sx={{ minWidth: 320 }}
                component="form"
                noValidate
                autoComplete="off"
            >
                <FormControl fullWidth sx={{gap: '20px'}}>
                    <InputLabel id="demo-simple-select-label">Выберите пользователя</InputLabel>
                    <Select
                        error={errors.id ? true : false}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userId}
                        label="Выберите пользователя"
                        onChange={handleChangeId}
                        autoComplete="off"
                    >
                        <MenuItem value={0}>Выберите пользователя</MenuItem>
                        {!loading && data.length ? (
                            data.map((user) => {
                                return <MenuItem value={user.id} key={user.id}>{user.name}</MenuItem>
                            })
                        ) : null }
                    </Select>
                    <TextField 
                        error={errors.pass ? true : false} 
                        id="pass" label="Пароль"
                        variant="outlined" 
                        type="password" 
                        onChange={handleChangePass}
                        autoComplete="current-password" 
                    />
                    <Button variant="contained" onClick={() => handleClick()}>Войти</Button>
                </FormControl>
            </Box>
        </DataContainer>
    );
  }