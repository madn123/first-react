import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import css from '../../../styles/dataList.css';
import mainTypes from '../../../constants/mainTypes';
import {getNameOfType, getColor} from '../../../helpers/functions';
import { changeType } from '../../../redux-state/data/typeSlice';
import { selectDataByType, selectDataSum, selectActiveType } from '../../../redux-state/data/selectors';

const {DataContainer, ContentLine, ContentCell, ButtonsLine, ButtonItem} = css;

const DataList = (props) => {
    const {setShow} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const {filterData, filterDataSum} = useSelector(selectSum(viewType));

    const viewType = useSelector(selectActiveType);
    const filterData = useSelector(selectDataByType);
    const filterDataSum = useSelector(selectDataSum);
    
    const handleCLick = (type) => {
        navigate('/stat/' + type);
        type === 'expense' ? setShow(true) : setShow(false);
        dispatch(changeType(type));
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
                    { filterData.map((item, index) => {
                        return (
                            <ContentLine key={index}>
                                <ContentCell $color={item.viewType === 'income' ? 'green' : 'red'} width={'20%'}>{item.viewValue.toLocaleString('ru-RU')} ₽</ContentCell>
                                <ContentCell width={'20%'}>{getNameOfType(item.viewType)}</ContentCell>
                                <ContentCell width={'60%'}>{item.viewComment}</ContentCell>
                            </ContentLine>
                        )
                    })}

                    <ContentLine>
                        <ContentCell $color={getColor(viewType, filterDataSum)} width={'20%'}>{filterDataSum.toLocaleString('ru-RU')} ₽</ContentCell>
                        <ContentCell width={'20%'}>-</ContentCell>
                        <ContentCell width={'60%'}>-</ContentCell>
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