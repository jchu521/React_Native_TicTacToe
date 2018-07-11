import C from '../constants'

const rounds = (state=false, action) => {
    const { rounds,gameRound } = action

    switch(action.type){
        case C.NEW_GAME:
            return gameRound;
    }

    return state
}

export default rounds
