import C from '../constants'
import codePush from 'react-native-code-push';

export const getUpdateMetadata = ()=> (dispatch) => {
  return codePush.getUpdateMetadata().then(update => {
    console.log(update)
    dispatch({
      type: C.GET_UPDATE_METADATA,
      appVersion: update
    })
  }).catch(C.error);
}
