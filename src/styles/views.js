import { StyleSheet } from 'react-native';
import { Colors } from './colors'

const view = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
  },

  buttonGroupView: {
    backgroundColor: Colors.lightPink,
    width:'100%',
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
  }
}

export default view;
