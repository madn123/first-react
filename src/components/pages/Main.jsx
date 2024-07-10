import React, {useState, useEffect} from 'react';
import { changeViewType, changeValue, changeComment } from '../../redux-state/reducers/view-type-for-main';
import { useSelector, useDispatch } from 'react-redux';
import InputComponent from '../comps/Input';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import css from '../../styles/form.css';

import {useRef} from 'react';
// import { Button } from '@mui/material';
import useNumberFormat from '../../hooks/useNumberFormat';

const { FormContainer, Button, Input } = css;

const Main = (props) => {
    const {action} = props;

    const valueInput = useRef();
    const [formatValue, formating] = useNumberFormat();

    const dispatch = useDispatch();
    const viewType = useSelector(state => state.viewTypeMain.viewType);
    const viewValue = useSelector(state => state.viewTypeMain.value);
    const viewComment = useSelector(state => state.viewTypeMain.comment);

    const validation = () => {
        console.log(formatValue);
        if (formatValue.length > 2 && viewType ) {
            const dataLine = `${formatValue}::${viewType}::${viewComment}`;

            action(dataLine);

            dispatch(changeValue(''));
            dispatch(changeViewType('доход'));
            dispatch(changeComment(''));
        } else {
            console.log('Error');
        }
    }

    const handleChange = (event) => {
        dispatch(changeViewType(event.target.value));
    }

    const handleChangeValue = (param) => {
        dispatch(changeValue(param));
    }

    const handleChangeComment = (param) => {
        dispatch(changeComment(param));
    }

    const handleChangeCommentRadio = (event) => {
        dispatch(changeComment(event.target.value));
    }

    const setFocus = () => {
        valueInput.current.disabled = false;
        valueInput.current.focus();
    }

    return (
        <>
            <FormContainer>
                <Input
                    ref={valueInput}
                    value={viewValue}
                    type={'text'}
                    placeholder={"Введите сумму транзакции"}
                    maxLength={'100'}
                    onChange={event => {
                        const newValue = event.target.value;
                        formating(newValue);
                        handleChangeValue(newValue);
                    }}
                />
                
                <FormControl style={{marginTop: '9px', marginBottom: '12px'}}>
                    <FormLabel id="demo-radio-buttons-group-label">Выберите тип транзакции</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={viewType}
                        onChange={handleChange}
                        style={{marginTop: '5px', marginBottom: '6px'}}
                    >
                        <FormControlLabel value="расход" control={<Radio />} label="Расход" />
                        <FormControlLabel value="доход" control={<Radio />} label="Доход" />
                    </RadioGroup>
                </FormControl>
                { viewType === 'доход' && <InputComponent inputValue={viewComment} action={handleChangeComment} placeholder={'Введите комментарий'} /> }
                { viewType === 'расход' && <FormControl style={{marginTop: '0', marginBottom: '14px'}}>
                    <FormLabel id="demo-radio-buttons-group-label">Выберите тип транзакции</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={viewComment}
                        onChange={handleChangeCommentRadio}
                        style={{marginTop: '5px', marginBottom: '6px'}}
                    >
                        <FormControlLabel value="покупка продуктов" control={<Radio />} label="покупка продуктов" />
                        <FormControlLabel value="оплата счетов" control={<Radio />} label="оплата счетов" />
                        <FormControlLabel value="покупка одежды" control={<Radio />} label="покупка одежды" />
                        <FormControlLabel value="расход на транспорт" control={<Radio />} label="расход на транспорт" />
                        <FormControlLabel value="развлечения" control={<Radio />} label="развлечения" />
                        <FormControlLabel value="путешествия" control={<Radio />} label="путешествия" />
                    </RadioGroup>
                </FormControl> }
                <Button 
                    $backgroundColor={
                        viewValue.length < 3 ?
                        'rgb(229, 229, 229)' :
                        viewType.length < 3 ? 
                        'rgb(229, 229, 229)' :
                        'rgb(176, 243, 71)'
                    }
                    onClick={validation}
                >Сохранить транзикцию</Button>
            </FormContainer>
        </>
    )
}

export default Main;