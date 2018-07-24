import C from '../constants'

const steps = (state=[], action) => {
    const { steps, step, res } = action;

    switch (action.type){
        case C.GET_STEPS:
            return steps;
        case C.ADD_STEP:
            return false;
        case C.GET_STEPS_NODE:
            return steps;
        case C.ADD_STEP_NODE:
            return false;
        default:
            return false;
    }
}

export default steps
