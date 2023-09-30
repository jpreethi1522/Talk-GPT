import * as React from 'react'
import { navigation } from 'react-navigation'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import LottieView from 'lottie-react-native'

const OpenScreen = ({ navigation }) => {
  // const [loop, setLoop] = React.useState(true)
  // // React.useEffect(() => {
  // //   let timer = setTimeout(() => setLoop(false), 60000)
  // //   return () => {
  // //     clearTimeout(timer)
  // //   }
  // // }, [])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <LottieView
            // ref={LottieRef}
            style={{ width: 350, height: 350, top: 20 }}
            // source={require('../../assets/65263-mic-animation.json')}
            source={require('../../assets/73747-genero-blue.json')}
            autoPlay
            loop
          />
          <Image
            style={{ width: 300, height: 300, bottom: 280, left: 25 }}
            source={require('../../assets/image/adaptive-icon.png')}
          />
        </View>
        <Text style={{ fontSize: 50, color: 'white', bottom: 250 }}>
          Talk-GPT
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Intro')}>
          <LottieView
            // ref={LottieRef}
            style={{ width: 170, height: 125, bottom: 80 }}
            source={require('../../assets/110680-arrow-button.json')}
            autoPlay
            loop
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#000000',
  },

  background: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
})
export default OpenScreen
