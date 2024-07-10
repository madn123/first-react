import React, {useState, useMemo, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import css from '../../../styles/dataList.css';

const {DataContainer, ContentLine, ContentCell, ButtonsLine, ButtonItem} = css;

const dataSum = (paramData, view) => {
    const returned = paramData.filter(item => item.split('::')[1] === view)
    .reduce((sum, item) => {
        return sum + +item.split('::')[0];
    }, 0);

    console.log('посчитана сумма');
    return returned;
}

const DataList = (props) => {
    const {data = [], setShow, viewType} = props;
    const navigate = useNavigate();
    const [bold, setBold] = useState(false);
    const filterData = data.filter(item => item.split('::')[1] === viewType);
    const filterDataSum = useMemo(() => dataSum(data, viewType), [data, viewType]);

    const filterDataDelta = data.reduce((sum, item) => {
        if (item.split('::')[1] === 'доход') {
            return sum + +item.split('::')[0];
        } else {
            return sum - +item.split('::')[0];
        }  
     }, 0);

    const reduceDataType1 = () => {
        setShow(false);
        navigate('/stat/доход');
    }

    const reduceDataType2 = () => {
        setShow(true);
        navigate('/stat/расход');
    }

    const reduceDataType3 = () =>  navigate('/stat/общее');

    return (
        <>
            <ButtonsLine>
                <ButtonItem isBold={viewType === 'доход'} onClick={reduceDataType1}>доходы</ButtonItem>
                <ButtonItem isBold={viewType === 'расход'} onClick={reduceDataType2}>расходы</ButtonItem>
                <ButtonItem isBold={viewType === 'общее'} onClick={reduceDataType3}>общее</ButtonItem>
            </ButtonsLine>
            
            <DataContainer>
                { filterData.length > 0 && <>
                    { filterData.map((item, index) => {
                        return (
                            <ContentLine key={index}>
                                <ContentCell width={'20%'}>{item.split('::')[0]}</ContentCell>
                                <ContentCell width={'20%'}>{item.split('::')[1]}</ContentCell>
                                <ContentCell width={'60%'}>{item.split('::')[2]}</ContentCell>
                            </ContentLine>
                        )
                    })}

                    <ContentLine>
                        <ContentCell width={'20%'}>{filterDataSum}</ContentCell>
                        <ContentCell width={'20%'}>-</ContentCell>
                        <ContentCell width={'60%'}>-</ContentCell>
                    </ContentLine>
                </> } 
                { filterData.length === 0 && <>
                    { data.map((item, index) => {
                        return (
                            <ContentLine key={index}>
                                <ContentCell width={'20%'}>{item.split('::')[0]}</ContentCell>
                                <ContentCell width={'20%'}>{item.split('::')[1]}</ContentCell>
                                <ContentCell width={'60%'}>{item.split('::')[2]}</ContentCell>
                            </ContentLine>
                        )
                    })}
                    <ContentLine>
                        <ContentCell onClick={() => setBold(!bold)} style={{fontWeight: bold && 'bold'}} width={'20%'}>{filterDataDelta}</ContentCell>
                        <ContentCell width={'20%'}>-</ContentCell>
                        <ContentCell width={'60%'}>-</ContentCell>
                    </ContentLine>
                </> } 
            </DataContainer>
        </>
    )
}

export default DataList;