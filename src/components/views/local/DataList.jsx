import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import css from '../../../styles/dataList.css';
import mainTypes from '../../../constants/mainTypes';
import {getNameOfType, getColor} from '../../../helpers/functions';
import { changeType } from '../../../redux-state/data/typeSlice';
import { selectDataByFilter, selectDataSum, selectActiveType } from '../../../redux-state/data/selectors';
import { useQuery } from '@redux-requests/react';

const {DataContainer, ContentLine, ContentCell, ButtonsLine, ButtonItem} = css;

const DataList = (props) => {
    const {setShow} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const viewType = useSelector(selectActiveType);
    const filterData = useSelector(selectDataByFilter);
    const filterDataSum = useSelector(selectDataSum);

    const { data, error, loading, pristine } = useQuery({ type: 'FETCH_USERS' });
    
    const handleCLick = (type) => {
        navigate('/stat/' + type);
        type === 'expense' ? setShow(true) : setShow(false);
        dispatch(changeType(type));
    }

    const getUserName = (userId) => {
        const user = data.find(user => user.id === userId);
        return user ? user.name : 'Неизвестный пользователь';
    }

    return (
        <>
            <ButtonsLine>
                { mainTypes.map((item, index) => {
                    return (
                        <ButtonItem  key={index} $isBold={viewType === item.id} onClick={() => handleCLick(item.id)}>{item.value}</ButtonItem>
                    )
                })}
            </ButtonsLine>
            
            <DataContainer>
                { filterData.length > 0 && <>
                    <ContentLine style={{fontWeight: '600'}}>
                        <ContentCell>Сумма</ContentCell>
                        <ContentCell>Тип транзакции</ContentCell>
                        <ContentCell>Комментарий</ContentCell>
                        <ContentCell>Пользователь</ContentCell>
                    </ContentLine>

                    { filterData.map((item, index) => {
                        return (
                            <ContentLine key={index}>
                                <ContentCell $color={item.viewType === 'income' ? 'green' : 'red'}>{item.viewValue.toLocaleString('ru-RU')} ₽</ContentCell>
                                <ContentCell>{getNameOfType(item.viewType)}</ContentCell>
                                <ContentCell>{item.viewComment}</ContentCell>
                                <ContentCell>{getUserName(item.userId)}</ContentCell>
                            </ContentLine>
                        )
                    })}

                    <ContentLine>
                        <ContentCell $color={getColor(viewType, filterDataSum)}>{filterDataSum.toLocaleString('ru-RU')} ₽</ContentCell>
                        <ContentCell>-</ContentCell>
                        <ContentCell>-</ContentCell>
                        <ContentCell>-</ContentCell>
                    </ContentLine>
                </> } 
                { filterData.length === 0 && <>
                    <div>По разделу <b>"{getNameOfType(viewType)}"</b> данных нет</div>
                </> } 
            </DataContainer>
        </>
    )
}

export default DataList;