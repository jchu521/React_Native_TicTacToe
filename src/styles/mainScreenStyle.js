import { StyleSheet, PixelRatio, Dimensions } from 'react-native';

const app = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    width: Dimensions.get('window').width,
    height: 238/PixelRatio.get(),
  },

  button: {
    width: 478/PixelRatio.get(),
    height: 164/PixelRatio.get(),
  },

  buttonGroup: {
    flex:1,
    justifyContent:'flex-end'
  }
});

export default app
