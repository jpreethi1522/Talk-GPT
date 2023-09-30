import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import LottieView from 'lottie-react-native'
import * as Speech from 'expo-speech'

const Intro = ({ navigation }) => {
  //animation
  const onAnimationFinish = () => {
    setLottieFinished(true)
    setTimeout(() => {
      //Go Back to home page after 3 seconds
      Speech.stop()
      navigation.navigate('Display')
    }, 8000)
  }
  const [lottieFinished, setLottieFinished] = useState(false)
  const thingToSay =
    // 'hi friends,i am open ai source,i can come up with solutions you ask me ,so lets begin now, ask me a question'
    'Hi friends,As an AI language model, I do not have a specific time or physical body, but I am always available to assist you 24/7. So, please let me know how can I help you?'
  const speak = () => {
    Speech.speak(thingToSay, {
      voice: 'com.apple.ttsbundle.siri_female_en-US_compact',
    })
  }
  return (
    <View style={styles.container}>
      <View>
        {!lottieFinished ? (
          <LottieView
            source={require('../../assets/100997-infinite-loading-animation-loader-dots.json')}
            autoPlay
            loop={false}
            onAnimationFinish={onAnimationFinish}
          />
        ) : null}
      </View>
      <View>
        <TouchableOpacity onPress={speak()}>
          <LottieView
            style={{
              top: 65,
              right: 2,
              width: 300,
              height: 430,
              backgroundColor: 'black',
              alignSelf: 'auto',
            }}
            source={require('../../assets/98042-robot.json')}
            autoPlay
            loop
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Intro

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
})
