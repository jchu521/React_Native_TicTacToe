import C from '../constants'

var photo='';

const user = (state={ photo:'', result:[]}, action) => {
    const { data, result } = action;

    switch (action.type){
        case C.SAVE_USER_PHOTO:
            photo = data;
            return { photo:data };
        case C.GET_USER_MATCH_RESULT:
            return {photo, result: result};
        default:
            return false;
    }
}

export default user;
