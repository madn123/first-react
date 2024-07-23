import React, {useRef} from 'react';
import { changeValue } from '../../redux-state/data/transactionSlice';
import { useSelector, useDispatch } from 'react-redux';
import InputComponent from '../comps/Input';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import css from '../../styles/form.css';
import setNotification from '../../helpers/notifications';
import { getNameOfType } from '../../helpers/functions';
import expenseTypes from '../../constants/expenseTypes';
import mainTypes from '../../constants/mainTypes';
import { selectTransactionType, selectTransactionValue, selectTransactionComment } from '../../redux-state/data/selectors';


const { FormContainer, Button, Input } = css;

const Main = (props) => {
    const {action} = props;
    const valueInput = useRef();

    const dispatch = useDispatch();
    const viewType = useSelector(selectTransactionType);
    const viewValue = useSelector(selectTransactionValue);
    const viewComment = useSelector(selectTransactionComment);
    
    const validation = () => {
        if (viewValue.length === 0) {
            setNotification({message:'Сумма не может быть пустой!', type:'danger'});
            return;
        }

        if (viewType == 'expense' && viewComment.length === 0) {
            setNotification({message:'Выберите тип расхода!', type:'danger'});
            return;
        } 

        action({viewType:viewType, viewValue:+viewValue, viewComment:viewComment});
        setNotification({message:`Добавлен ${getNameOfType(viewType)} ${viewComment} в размере ${viewValue} руб`, type:'success'});

        dispatch(changeValue({key:'value', value:''}));
        dispatch(changeValue({key:'type', value:'expense'}));
        dispatch(changeValue({key:'comment', value:''}));
    }

    const handleChange = (event) => {
        dispatch(changeValue({key:'type', value:event.target.value}));
        dispatch(changeValue({key:'comment', value:''}));
    }

    const handleChangeValue = (param) => {
        dispatch(changeValue({key:'value', value:param}));
    }

    const handleChangeComment = (param) => {
        dispatch(changeValue({key:'comment', value:param}));
    }

    const handleChangeCommentRadio = (event) => {
        dispatch(changeValue({key:'comment', value:event.target.value}));
    }

    return (
        <>
            <FormContainer>
                <Input
                    ref={valueInput}
                    value={viewValue}
                    type={'number'}
                    placeholder={"Введите сумму транзакции"}
                    maxLength={'100'}
                    onChange={event => {
                        const newValue = event.target.value;
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
                        { mainTypes.filter(item => item.id !== 'all').map((item, index) => {
                            return (
                                <FormControlLabel key={index} value={item.id} control={<Radio />} label={item.value} />
                            )
                        })}
                    </RadioGroup>
                </FormControl>
                { viewType === 'income' && <InputComponent inputValue={viewComment} action={handleChangeComment} placeholder={'Введите комментарий'} /> }
                { viewType === 'expense' && <FormControl style={{marginTop: '0', marginBottom: '14px'}}>
                    <FormLabel id="demo-radio-buttons-group-label">Выберите тип транзакции</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={viewComment}
                        onChange={handleChangeCommentRadio}
                        style={{marginTop: '5px', marginBottom: '6px'}}
                    >
                        { expenseTypes.map((item, index) => {
                            return (
                                <FormControlLabel key={index} value={item.label} control={<Radio />} label={item.label} />
                            )
                        })}
                    </RadioGroup>
                </FormControl> }
                <Button 
                    $backgroundColor={
                        viewValue.length < 1 ?
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