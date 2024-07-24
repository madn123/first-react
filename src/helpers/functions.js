
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

export {getNameOfType, getColor}