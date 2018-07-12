import C from '../constants'

const rounds = (state=false, action) => {
    const { gameRound } = action

    switch(action.type){
        case C.NEW_GAME:
            return gameRound;
        default:
            return false;
    }

    return state
}

export default rounds
