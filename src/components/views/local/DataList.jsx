import React, {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import css from '../../../styles/dataList.css';
import mainTypes from '../../../constants/mainTypes';
import {getNameOfType} from '../../../helpers/functions';

const {DataContainer, ContentLine, ContentCell, ButtonsLine, ButtonItem} = css;

const dataSum = (paramData, view) => {
    let result = [];

    if (view === 'all') {
        result = paramData.reduce((sum, item) => {
            if (item.viewType === 'income') {
                return sum + +item.viewValue;
            } else {
                return sum - +item.viewValue;
            }  
        }, 0);
    } else {
        result = paramData.reduce((sum, item) => {
            return sum + +item.viewValue;
        }, 0);
    }
   
    return result;
}

const DataList = (props) => {
    const {data = [], setShow, viewType} = props;
    const navigate = useNavigate();
    const filterData = viewType == 'all' ? data : data.filter(item => item.viewType === viewType);
    const filterDataSum = useMemo(() => dataSum(filterData, viewType), [filterData, viewType]);
    
    const reduceDataType = (type) => {
        navigate('/stat/' + type);
        type === 'expense' ? setShow(true) : setShow(false);
    }

    const getColor = () => {
        switch (viewType) {
            case 'income':
                return 'green';
        
            case 'expense':
                return 'red';

            case 'all':
                return filterDataSum >= 0 ? 'green' : 'red';
        }

        return 'gray';
    };

    return (
        <>
            <ButtonsLine>
                { mainTypes.map((item, index) => {
                    return (
                        <ButtonItem  key={index} $isBold={viewType === item.id} onClick={() => reduceDataType(item.id)}>{item.value}</ButtonItem>
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
                        <ContentCell $color={getColor} width={'20%'}>{filterDataSum.toLocaleString('ru-RU')} ₽</ContentCell>
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