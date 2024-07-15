import mainTypes from '../constants/mainTypes';

const getNameOfType = (typeId) => {
    console.log(typeId);
    const type = mainTypes.find(type => type.id === typeId);
    return type ? type.value : null;
}

export {getNameOfType}