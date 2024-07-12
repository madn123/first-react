import React, {useEffect, useState} from 'react';
import MyResponsivePie from '../../comps/MyResponsivePie';

import css from '../../../styles/dataList.css';

const { DataContainer } = css;

const DataChart = (props) => {
    const {data = [], show} = props;

    return show ? <DataContainer style={{height: '500px'}}>
        <MyResponsivePie data={data.filter(item => item.value > 0)}></MyResponsivePie>
    </DataContainer> : null
}

export default DataChart;