import C from '../constants'

export default(state={appInfo:[]}, action) => {
    const { appVersion } = action

    switch(action.type){
        case C.GET_UPDATE_METADATA:
            return { appInfo: appVersion }
        default:
            return state;
    }

    return state
}
