const constants = {
    GET_STEPS: 'GET_STEPS',
    ADD_STEP: 'ADD_STEP',
    PUT_ROUND: 'PUT_ROUND',
    GET_STEPS_NODE: 'GET_STEPS_NODE',
    ADD_STEP_NODE: 'ADD_STEP_NODE',
    PUT_RESULT: 'PUT_RESULT',
    POST_AI_RESULT: 'POST_AI_RESULT',
    NEW_GAME: 'NEW_GAME',

    GET_UPDATE_METADATA: 'GET_UPDATE_METADATA',

    stepsURL: 'https://tictactoe.breakself.tech/steps',
    roundsURL: 'https://tictactoe.breakself.tech/rounds',

    headers:{
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": 'whatever-yoy-want',
    },
    credentials:{
        'credentials' :'include'
    },
    parseResponse: (response) =>response.json(),
    error: (e) => console.log('Error:'+ e),
}

export default constants
