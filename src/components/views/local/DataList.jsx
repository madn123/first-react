import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import css from '../../../styles/dataList.css';
import mainTypes from '../../../constants/mainTypes';
import {getNameOfType, getColor} from '../../../helpers/functions';
import { changeType } from '../../../redux-state/data/typeSlice';
import { deleteData } from '../../../redux-state/data/dataSlice';
import { selectDataByFilter, selectDataSum, selectActiveType } from '../../../redux-state/data/selectors';
import { useQuery } from '@redux-requests/react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';


const {DataContainer, ContentLine, ContentCell, ButtonsLine, ButtonItem} = css;

const DataList = ({setShow}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const viewType = useSelector(selectActiveType);
    const filterData = useSelector(selectDataByFilter);
    const filterDataSum = useSelector(selectDataSum);
    

    const { data, error, loading, pristine } = useQuery({ type: 'FETCH_USERS' });
    
    const handleChange = (event, newValue) => {
        navigate('/stat/' + newValue);
        newValue === 'expense' ? setShow(true) : setShow(false);
        dispatch(changeType(newValue));
    }

    const getUserName = (userId) => {
        if (loading) {
            return;
        }
        
        const user = data.find(user => user.id === userId);
        return user ? user.name : 'Неизвестный пользователь';
    }

    const handleClick = (item) => {
        dispatch(deleteData(item));
    }

    return (
        <>
            <Box sx={{ width: '100%', marginBottom: '20px' }}>
                <Tabs
                    value={viewType}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                >
                    { mainTypes.map((item, index) => {
                        return (
                            <Tab key={item.id} value={item.id} label={item.value} />
                        )
                    })}
                </Tabs>
            </Box>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Сумма</TableCell>
                        <TableCell align="right">Тип транзакции</TableCell>
                        <TableCell align="right">Комментарий</TableCell>
                        <TableCell align="right">Пользователь</TableCell>
                        <TableCell align="right">-</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterData.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{color:item.viewType === 'income' ? 'green' : 'red'}} component="th" scope="row">{item.viewValue.toLocaleString('ru-RU')} ₽</TableCell>
                                <TableCell align="right">{getNameOfType(item.viewType)}</TableCell>
                                <TableCell align="right">{item.viewComment}</TableCell>
                                <TableCell align="right">{getUserName(item.userId)}</TableCell>
                                <TableCell align="right"><DeleteIcon onClick={() => handleClick(item)} /></TableCell>
                            </TableRow>
                        ))}
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell sx={{color:getColor(viewType, filterDataSum)}} component="th" scope="row">{filterDataSum.toLocaleString('ru-RU')} ₽</TableCell>
                            <TableCell align="right">-</TableCell>
                            <TableCell align="right">-</TableCell>
                            <TableCell align="right">-</TableCell>
                            <TableCell align="right">-</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default DataList;