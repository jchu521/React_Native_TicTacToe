import C from '../constants'

//steps
export const getSteps = (data) => (dispatch) => {
  const { roundId, uuid } = data;
  let url = C.stepsURL+'/'+roundId+'?uuid='+encodeURIComponent(uuid);
  //console.log(url);
  fetch(url, {
      headers: C.headers,
      credentials: C.credentials
  }).then(C.parseResponse).then(steps => {
        dispatch({
            type: C.GET_STEPS,
            steps
        });
    }).catch(C.error)
}

//Post /step
export const addStep = (data) => (dispatch) => {
    const { roundId, position, piece } = data;
    const content = {
        headers: C.headers,
        method: 'POST',
        credentials: C.credentials,
        body: JSON.stringify({
            round_id: roundId,
            position: position,
            piece: piece
        })
    };

    fetch(C.stepsURL, content).then(C.parseResponse).then( data => {
        dispatch({
            type: C.ADD_STEP,
            step: data,
        });
    }).catch(C.error);
}
//rounds
//PUT /round
export const putRoundResult = (data) => (dispatch) => {
    const { roundId, winner } = data;
    let url = C.roundsURL+'/'+roundId;
    const content = {
        headers: C.headers,
        method: 'PUT',
        credentials: C.credentials,
        body: JSON.stringify({
            winner: winner,
                id: roundId
        })
    };
    fetch(url, content).then(C.parseResponse).then((res) => {
        dispatch({
            type: C.PUT_ROUND,
            res
        });
    }).catch(C.error);
}

export const newGame = (data) => (dispatch) => {
    const { uuid } = data;
    let url = C.roundsURL+'?newgame=1&uuid='+encodeURIComponent(uuid);

    const content = {
        headers: C.headers,
        credentials: C.credentials
    };
    fetch(url, content).then(C.parseResponse).then((gameRound) => {

        dispatch({
            type: C.NEW_GAME,
            gameRound
        });
    }).catch(C.error);
}

//steps
export const getStepsNode = (data) => (dispatch) => {
  const { uuid } = data;
  let url = 'https://www.breakself.tech/steps?uuid='+encodeURIComponent(uuid);
  // console.log(url);
  fetch(url, {
      headers: C.headers,
      credentials: C.credentials
  }).then(C.parseResponse).then(steps => {
        dispatch({
            type: C.GET_STEPS_NODE,
            steps
        });
    }).catch(C.error)
}

//Post /step
export const addStepNode = (data) => (dispatch) => {
    const { uuid, index, position, piece } = data;
    const content = {
      headers: C.headers,
      method: 'POST',
      credentials: C.credentials,
      body: JSON.stringify({
          'uuid': uuid,
          'index': index,
          'position': position,
          'piece': piece
      })
    };

    fetch('https://www.breakself.tech/addstep', content).then(C.parseResponse).then( data => {
        dispatch({
            type: C.ADD_STEP_NODE,
            step: data,
        });
    }).catch(C.error);
}
//rounds
//POST /round
export const putResult = (data) => (dispatch) => {
    const { uuid, status, winner, reason, lastStep } = data;
    let url = 'https://www.breakself.tech/round/';
    // console.log(url);
    const content = {
        headers: C.headers,
        method: 'POST',
        credentials: C.credentials,
        body: JSON.stringify({
            'uuid': uuid,
            'status': status,
            'winner': winner,
            'reason': reason,
            'lastStep': lastStep,
        })
    };
    fetch(url, content).then(C.parseResponse).then((res) => {
        dispatch({
            type: C.PUT_RESULT,
            res
        });
    }).catch(C.error);
}

//POST AI results
export const postAIResult = (data) => (dispatch) => {
    let url = 'https://www.breakself.tech/computer/';
    // console.log(url);
    const content = {
        headers: C.headers,
        method: 'POST',
        credentials: C.credentials,
        body: JSON.stringify(data)
    };
    fetch(url, content).then(C.parseResponse).then((res) => {
        dispatch({
            type: C.PUT_RESULT,
            res
        });
    }).catch(C.error);
}

// save local user image
export const userPhoto = (data) => (dispatch) => {
  return dispatch({ type: C.SAVE_USER_PHOTO, data });
}

// GET user match result https://tictactoe.breakself.tech/rounds?statistics=1&uuid=df2f9019bdb35d38
export const getUserMatchResult = (uuid) => (dispatch) => {
  let url = 'https://tictactoe.breakself.tech/rounds?statistics=1&uuid=' + encodeURIComponent(uuid);

  fetch(url, {
      headers: C.headers,
      credentials: C.credentials
  }).then(C.parseResponse).then(data => {
        dispatch({
            type: C.GET_USER_MATCH_RESULT,
            result: data[0]
        });
    }).catch(C.error)
}
