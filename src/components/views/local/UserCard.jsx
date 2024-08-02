import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDataSumByUser } from '../../../redux-state/data/selectors';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { fetchPhoto } from '../../../redux-state/data/actions';
import {store} from '../../../redux-state/store';
import axios from 'axios';

const UserCard = ({user}) => {
    const [photo, setPhoto] = useState({url:'/assets/images/profile.png'});

    useEffect(() => {
        // store.dispatch(fetchPhoto(user.id)).then(({ data, error, isAborted, action }) => {
        //     console.log("🚀 ~ fetchData ~ { data, error, isAborted, action }:", { data, error, isAborted, action })
            
        //     if (action.type === "FETCH_PHOTO_SUCCESS") {
        //         setPhoto(data[0]);
        //     }
        // })

        axios.get(`https://jsonplaceholder.typicode.com/photos?id=${user.id}`).then(response => {
            if (response.data.length) {
                setPhoto(response.data[0]);
            }
            // console.log("🚀 ~ axios.get ~ data.data[0]:", response.data[0]);
        });
    }, []);

    const userSum = useSelector((state) => selectDataSumByUser(state, user.id));

    const customClick = () => {
        store.dispatch(fetchPhoto(12)).then(({ data, error, isAborted, action }) => {
            console.log("🚀 ~ fetchData ~ { data, error, isAborted, action }:", { data, error, isAborted, action })
        })
    }

    const getUserAddress = (address) => {
        const { geo, ...obj } = address;
        
        return Object.entries(obj)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
    }

    return (
        <Card sx={{ maxWidth: 345, height: '100%' }} onClick={() => customClick()}>
            <CardMedia
                sx={{ height: 140 }}
                image={photo.url}
                title={user.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{user.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{marginBottom: '10px'}}>{getUserAddress(user.address)}</Typography>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <AttachMoneyIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Доходы" secondary={userSum.income} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <MoneyOffIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Расходы" secondary={userSum.expense} />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )
}

export default UserCard;