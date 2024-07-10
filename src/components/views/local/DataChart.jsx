import React, {useEffect, useState} from 'react';
import { ResponsivePie } from '@nivo/pie'

import css from '../../../styles/dataList.css';

const { DataContainer } = css;

const MyResponsivePie = ({ data /* see data tab */ }) => (
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'left',
                direction: 'column',
                justify: false,
                translateX: -70,
                translateY: -110,
                itemsSpacing: 10,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)

const DataChart = (props) => {
    const {data = [], show} = props;

    const [r00, setR00] = useState({r01:0, r02:0, r03:0, r05:0, r06:0, r06:0});

    const [r01, setR01] = useState(0);
    const [r02, setR02] = useState(0);
    const [r03, setR03] = useState(0);
    const [r04, setR04] = useState(0);
    const [r05, setR05] = useState(0);
    const [r06, setR06] = useState(0);

    // 
    useEffect(() => {
        const filterData = data.filter(item => item.split('::')[1] === 'расход');

        for( let i = 0; i < filterData.length; i++) {
            if (filterData[i].split('::')[2] === 'покупка продуктов') {
                setR00(prev => ({...prev, r01:prev.r01 + +filterData[i].split('::')[0]}));
            }

            if (filterData[i].split('::')[2] === 'оплата счетов') {
                setR00(prev => ({...prev, r02:prev.r02 + +filterData[i].split('::')[0]}));
            }

            if (filterData[i].split('::')[2] === 'покупка одежды') {
                setR00(prev => ({...prev, r03:prev.r03 + +filterData[i].split('::')[0]}));
            }

            if (filterData[i].split('::')[2] === 'расход на транспорт') {
                setR00(prev => ({...prev, r04:prev.r04 + +filterData[i].split('::')[0]}));
            }

            if (filterData[i].split('::')[2] === 'развлечения') {
                setR00(prev => ({...prev, r05:prev.r05 + +filterData[i].split('::')[0]}));
            }

            if (filterData[i].split('::')[2] === 'путешествия') {
                setR00(prev => ({...prev, r06:prev.r06 + +filterData[i].split('::')[0]}));
            }
        }
    }, [data]);
    

    return show ? <DataContainer style={{height: '500px'}}>
        <MyResponsivePie data={[
            {
                "id": "покупка продуктов",
                "label": "покупка продуктов",
                "value": r00.r01,
                "color": "hsl(6, 70%, 50%)"
            },
            {
                "id": "оплата счетов",
                "label": "оплата счетов",
                "value": r00.r02,
                "color": "hsl(135, 70%, 50%)"
            },
            {
                "id": "покупка одежды",
                "label": "покупка одежды",
                "value": r00.r03,
                "color": "hsl(105, 70%, 50%)"
            },
            {
                "id": "расход на транспорт",
                "label": "расход на транспорт",
                "value": r00.r04,
                "color": "hsl(241, 70%, 50%)"
            },
            {
                "id": "развлечения",
                "label": "развлечения",
                "value": r00.r05,
                "color": "hsl(85, 70%, 50%)"
            },
            {
                "id": "путешествия",
                "label": "путешествия",
                "value": r00.r06,
                "color": "hsl(25, 40%, 20%)"
            }
        ].filter(item => item.value > 0)}></MyResponsivePie>
    </DataContainer> : null
}

export default DataChart;