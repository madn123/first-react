import React, {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import css from '../../../styles/dataList.css';

const {DataContainer, ContentLine, ContentCell, ButtonsLine, ButtonItem} = css;

const dataSum = (paramData, view) => {
    let result = [];

    if (view === 'общее') {
        result = paramData.reduce((sum, item) => {
            if (item.viewType === 'доход') {
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
    const filterData = viewType == 'общее' ? data : data.filter(item => item.viewType === viewType);
    const filterDataSum = useMemo(() => dataSum(filterData, viewType), [filterData, viewType]);
    
    const reduceDataType = (type) => {
        navigate('/stat/' + type);
        type === 'расход' ? setShow(true) : setShow(false);
    }

    const getColor = () => {
        switch (viewType) {
            case 'доход':
                return 'green';
        
            case 'расход':
                return 'red';

            case 'общее':
                return filterDataSum >= 0 ? 'green' : 'red';
        }

        return 'gray';
    };

    return (
        <>
            <ButtonsLine>
                <ButtonItem $isBold={viewType === 'доход'} onClick={() => reduceDataType('доход')}>доходы</ButtonItem>
                <ButtonItem $isBold={viewType === 'расход'} onClick={() => reduceDataType('расход')}>расходы</ButtonItem>
                <ButtonItem $isBold={viewType === 'общее'} onClick={() => reduceDataType('общее')}>общее</ButtonItem>
            </ButtonsLine>
            
            <DataContainer>
                { filterData.length > 0 && <>
                    { filterData.map((item, index) => {
                        return (
                            <ContentLine key={index}>
                                <ContentCell $color={item.viewType === 'доход' ? 'green' : 'red'} width={'20%'}>{item.viewValue}</ContentCell>
                                <ContentCell width={'20%'}>{item.viewType}</ContentCell>
                                <ContentCell width={'60%'}>{item.viewComment}</ContentCell>
                            </ContentLine>
                        )
                    })}

                    <ContentLine>
                        <ContentCell $color={getColor} width={'20%'}>{filterDataSum}</ContentCell>
                        <ContentCell width={'20%'}>-</ContentCell>
                        <ContentCell width={'60%'}>-</ContentCell>
                    </ContentLine>
                </> } 
                { filterData.length === 0 && <>
                    <div>По разделу <b>{viewType}</b> данных нет</div>
                </> } 
            </DataContainer>
        </>
    )
}

export default DataList;