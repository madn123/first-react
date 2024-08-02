
import mainTypes from '../constants/mainTypes';

const getNameOfType = (typeId) => {
    const type = mainTypes.find(type => type.id === typeId);
    return type ? type.value : null;
}

const getColor = (viewType, filterDataSum = 0) => {
    switch (viewType) {
        case 'income':
            return 'green';
    
        case 'expense':
            return 'red';

        case 'all':
            return filterDataSum >= 0 ? 'green' : 'red';
    }

    return 'gray';
};

const findIndexInObj = (type, arrayObjects, targetObject) => {
    // userId, viewComment, viewType, viewValue
    // label = viewComment, value = viewValue, userId = userId

    if (type === 'all') {
        return arrayObjects.findIndex(obj => {
            return obj.userId === targetObject.userId && obj.viewComment === targetObject.viewComment && obj.viewValue === targetObject.viewValue
        });
    }

    if (type === 'computed') {
        return arrayObjects.findIndex(obj => {
            return obj.userId === targetObject.userId && obj.label === targetObject.viewComment && obj.value === targetObject.viewValue
        });
    }
    
    return -1;
}

export {getNameOfType, getColor, findIndexInObj}