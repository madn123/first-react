import React, {useRef} from 'react';
import { changeViewType, changeValue, changeComment } from '../../redux-state/reducers/viewType';
import { useSelector, useDispatch } from 'react-redux';
import InputComponent from '../comps/Input';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import css from '../../styles/form.css';
import setNotification from '../../helpers/notifications';
import expenseTypes from '../../constants/expenseTypes';
import mainTypes from '../../constants/mainTypes';


const { FormContainer, Button, Input } = css;

const Main = (props) => {
    const {action} = props;
    const valueInput = useRef();

    const dispatch = useDispatch();
    const viewType = useSelector(state => state.viewTypeMain.viewType);
    const viewValue = useSelector(state => state.viewTypeMain.value);
    const viewComment = useSelector(state => state.viewTypeMain.comment);
    
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
        setNotification({message:`Добавлен ${viewType} ${viewComment} в размере ${viewValue} руб`, type:'success'});

        dispatch(changeValue(''));
        dispatch(changeViewType('expense'));
        dispatch(changeComment(''));
    }

    const handleChange = (event) => {
        dispatch(changeViewType(event.target.value));
        dispatch(changeComment(''));
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