import Sound from'react-native-sound';

export default playSoundBundle = (fs) => {
  console.log(fs)
  const s = new Sound(fs, Sound.MAIN_BUNDLE, (e) => {
    if (e) {
      console.log('error', e);
    } else {
      s.setSpeed(1);
      s.play(() => s.release()); // Release when it's done so we're not using up resources
    }
  });
};
