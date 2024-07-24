import React, {useEffect, useState} from 'react';
import MyResponsivePie from '../../comps/MyResponsivePie';
import { selectComputedDataByFilter } from '../../../redux-state/data/selectors';
import { useSelector } from 'react-redux';
import css from '../../../styles/dataList.css';


const { DataContainer } = css;

const DataChart = (props) => {
    const {show} = props;
    const filterData = useSelector(selectComputedDataByFilter);

    return show ? <DataContainer style={{height: '500px'}}>
        <MyResponsivePie data={filterData.filter(item => item.value > 0)} />
    </DataContainer> : null
}

export default DataChart;