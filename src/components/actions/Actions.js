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
