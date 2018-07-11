import C from '../constants'

const steps = (state=[], action) => {
    const { steps, step, res } = action;

    switch (action.type){
        case C.GET_STEPS:
            return steps;

        case C.ADD_STEP:
            return step;

        default:
            return false;
    }
}

export default steps
