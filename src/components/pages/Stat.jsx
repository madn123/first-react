import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import DataList from '../views/local/DataList';
import DataChart from '../views/local/DataChart';

const Stat = (props) => {
    const [isShowChart, setIsShowChart] = useState(true);

    const {viewType} = useParams();

    return (
        <>
            <DataList setShow={setIsShowChart} />
            <DataChart viewType={viewType} show={isShowChart} />
        </>
    )
}

export default Stat;