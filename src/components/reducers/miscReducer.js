import C from '../constants'

const misc = (state=[], action) => {
    const { res } = action;

    switch (action.type){
        case C.PUT_ROUND:
            return res;
        default:
            return false;
    }
}

export default misc
