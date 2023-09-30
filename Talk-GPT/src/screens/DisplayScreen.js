// import React, { useState, useRef, useEffect } from 'react'
// import {
//   View,
//   Text,
//   textarea,
//   Button,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   Image,
//   SafeAreaView,
//   ScrollView,
// } from 'react-native'
// import { FontAwesome } from '@expo/vector-icons'
// import LottieView from 'lottie-react-native'
// import * as Speech from 'expo-speech'

// import axios from 'axios'

// import { Audio } from 'expo-av'
// import FormData from 'form-data'

// const DisplayScreen = () => {
//   const AudioRecorder = useRef(new Audio.Recording())
//   const AudioPlayer = useRef(new Audio.Sound())

//   // States for UI

//   const [responseText, setResponseText] = useState('')
//   const [replyFromGpt, setReplyFromGpt] = useState('')

//   const [enteredText, setEnteredText] = useState('')
//   const LottieRef = useRef()

//   const [sendQuery, setSendQuery] = useState('')
//   const [shouldShow, setShouldShow] = useState(false)

//   const [RecordedURI, SetRecordedURI] = useState('')
//   const [AudioPermission, SetAudioPermission] = useState(false)
//   const [IsRecording, SetIsRecording] = useState(false)
//   const [IsPLaying, SetIsPLaying] = useState(false)

//   // Initial Load to get the audio permission
//   useEffect(() => {
//     GetPermission()
//   }, [])

//   // Function to get the audio permission
//   const GetPermission = async () => {
//     const getAudioPerm = await Audio.requestPermissionsAsync()
//     SetAudioPermission(getAudioPerm.granted)
//   }

//   // Function to start recording
//   const StartRecording = async () => {
//     try {
//       // Check if user has given the permission to record
//       if (AudioPermission === true) {
//         try {
//           // Prepare the Audio Recorder
//           await AudioRecorder.current.prepareToRecordAsync(
//             // Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//             Audio.RecordingOptionsPresets.HIGH_QUALITY
//           )
//           // Start recording
//           await AudioRecorder.current.startAsync()
//           SetIsRecording(true)
//         } catch (error) {
//           console.log(error)
//         }
//       } else {
//         // If user has not given the permission to record, then ask for permission
//         GetPermission()
//       }
//     } catch (error) {}
//   }

//   // Function to stop recording
//   const StopRecording = async () => {
//     try {
//       // Stop recording
//       await AudioRecorder.current.stopAndUnloadAsync()

//       // Get the recorded URI here
//       const result = AudioRecorder.current.getURI()
//       if (result) SetRecordedURI(result)
//       console.log(RecordedURI)
//       speak()
//       // await uploadAudio()

//       // Reset the Audio Recorder
//       AudioRecorder.current = new Audio.Recording()
//       SetIsRecording(false)
//     } catch (error) {}
//   }

//   //upload the audio to api
//   const uploadAudio = async () => {
//     StopRecording()
//     const formData = new FormData()
//     formData.append('file', {
//       uri: RecordedURI,
//       type: 'audio/mp4',
//       name: 'audio.m4a',
//     })
//     formData.append('model', 'whisper-1')
//     console.log(RecordedURI)
//     console.log(formData)

//     const apiUrl = 'https://api.openai.com/v1/audio/transcriptions'
//     const requestOptions = {
//       method: 'POST',
//       headers: {
//         Authorization:
//           'Bearer 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',
//       },
//       body: formData,
//     }

//     fetch(apiUrl, requestOptions)
//       .then((response) => response.text())
//       .then((result) => {
//         console.log(JSON.parse(result).text)
//         setResponseText(JSON.parse(result).text)
//       })
//       .catch((error) => console.log('error', error))
//   }

//   //chatgpt
//   const Yelp = async () => {
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       // '{\n    "model": "gpt-3.5-turbo",\n    "messages": [{"role": "user", "content": "Hello!"}]\n  }',
//       {
//         model: 'gpt-3.5-turbo',
//         messages: [
//           {
//             role: 'user',
//             content: sendQuery,
//           },
//         ],
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization:
//             'Bearer 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',
//         },
//       }
//     )

//     setReplyFromGpt(response.data.choices[0].message.content)
//     speak()
//   }
//   useEffect(() => {
//     Yelp()
//   }, [sendQuery])

//   console.log(replyFromGpt)
//   const speak = () => {
//     var thingToSay = replyFromGpt
//     Speech.speak(thingToSay)
//   }
//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <View style={{ alignSelf: 'flex-start', left: 12 }}>
//           <Text style={styles.headingText}>Speech Recoginition</Text>
//         </View>

//         {/* For typing and sending the message and receiving output */}
//         <View style={{ alignSelf: 'flex-end', left: 20, top: -93 }}>
//           <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
//             <LottieView
//               style={{ width: 100, height: 100 }}
//               source={require('../../assets/118989-robotsaludando.json')}
//               autoPlay
//               loop
//             />
//           </TouchableOpacity>
//         </View>
//         <View style={{ top: -70 }}>
//           {/*Here we will return the view when state is true
//         and will return false if state is false*/}
//           {shouldShow ? (
//             <View style={styles.textInputStyle}>
//               <TextInput
//                 value={enteredText}
//                 placeholder='yourText'
//                 style={{ flex: 1 }}
//                 onChangeText={(enteredText) => setEnteredText(enteredText)}
//               />
//               <TouchableOpacity
//                 onPress={() => {
//                   setSendQuery()
//                 }}
//               >
//                 <Image
//                   source={{
//                     uri: 'https://cdn-icons-png.flaticon.com/512/3596/3596080.png',
//                   }}
//                   style={{
//                     width: 50,
//                     height: 50,
//                     top: 7,
//                   }}
//                 />
//               </TouchableOpacity>
//             </View>
//           ) : null}
//         </View>
//         <Text style={{ color: 'white', fontSize: 25 }}>{responseText}</Text>

//         {/* <Text style={{ color: 'white', fontSize: 20 }}>{replyFromGpt}</Text> */}
//       </ScrollView>

//       {/* //_______________________________________________________________ */}

//       <View style={styles.bottomView}>
//         {IsRecording ? (
//           <TouchableOpacity
//             onPress={() => {
//               // StopRecording()
//               uploadAudio()
//               LottieRef.current.play() // <---------------- OnPress just call the lottieRef to animate it.
//             }}
//           >
//             <View
//               style={{
//                 // flex: 1,
//                 backgroundColor: 'white',
//                 top: -150,
//                 bottom: 180,
//                 height: 400,
//                 width: 400,
//               }}
//             >
//               <LottieView
//                 ref={LottieRef}
//                 style={{
//                   width: 800,
//                   height: 200,
//                   backgroundColor: 'white',
//                   alignSelf: 'center',
//                 }}
//                 source={require('../../assets/100997-infinite-loading-animation-loader-dots.json')}
//                 autoPlay
//                 loop
//               />
//               <Text style={{ alignSelf: 'center', fontSize: 16, top: 30 }}>
//                 HOW CAN I HELP YOU?
//               </Text>
//               <LottieView
//                 style={{ width: 425, alignSelf: 'center', top: 55 }}
//                 source={require('../../assets/24072-connecting-the-dots.json')}
//                 autoPlay
//                 loop
//               />
//             </View>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity onPress={StartRecording}>
//             <LottieView
//               ref={LottieRef}
//               style={{ width: 170, height: 125 }}
//               source={require('../../assets/7227-vui-animation.json')}
//               autoPlay
//               loop
//             />
//           </TouchableOpacity>
//         )}
//         {/* </View> */}
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000000',
//     alignItems: 'center',
//   },
//   bottomView: {
//     width: '100%',
//     height: 50,

//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute', //Here is the trick
//     bottom: 20, //Here is the trick
//   },
//   headingText: {
//     alignSelf: 'center',
//     color: 'white',
//     marginVertical: 26,
//     fontWeight: 'bold',
//     fontSize: 28,
//   },
//   textInputStyle: {
//     flexDirection: 'row',

//     justifyContent: 'space-between',
//     alignSelf: 'center',
//     backgroundColor: 'white',
//     height: 70,
//     borderRadius: 80,
//     paddingHorizontal: 20,
//     // shadowOffset: { width: 100, height: 20 },
//     // shadowRadius: 2,
//     // elevation: 2,
//     shadowOpacity: 0.4,
//   },
//   input: {
//     borderColor: 'gray',
//     flexDirection: 'row',
//     width: '100%',
//     borderWidth: 1,
//     color: 'white',
//     alignItems: 'center',
//     borderRadius: 10,
//     padding: 20,
//     color: 'white',
//   },
// })
// export default DisplayScreen

// _________________________________________________________________________________________________
import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  textarea,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { navigation } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import * as Speech from 'expo-speech'

import axios from 'axios'

import { Audio } from 'expo-av'
import FormData from 'form-data'

const DisplayScreen = ({ navigation }) => {
  const AudioRecorder = useRef(new Audio.Recording())
  const AudioPlayer = useRef(new Audio.Sound())

  // States for UI

  const [responseText, setResponseText] = useState('')
  const [replyFromGpt, setReplyFromGpt] = useState('')
  const [speak1, setSpeak1] = useState('')
  const [currentText, setCurrentText] = useState('')

  const [enteredText, setEnteredText] = useState('')
  const LottieRef = useRef()

  const [sendQuery, setSendQuery] = useState('')
  const [shouldShow, setShouldShow] = useState(false)
  const [imageShow, setImageShow] = useState(true)

  const [RecordedURI, SetRecordedURI] = useState('')
  const [AudioPermission, SetAudioPermission] = useState(false)
  const [IsRecording, SetIsRecording] = useState(false)
  const [IsPLaying, SetIsPLaying] = useState(false)

  // Initial Load to get the audio permission
  useEffect(() => {
    GetPermission()
  }, [])

  // Function to get the audio permission
  const GetPermission = async () => {
    const getAudioPerm = await Audio.requestPermissionsAsync()
    SetAudioPermission(getAudioPerm.granted)
  }

  // Function to start recording
  const StartRecording = async () => {
    try {
      // Check if user has given the permission to record
      if (AudioPermission === true) {
        try {
          // Prepare the Audio Recorder
          await AudioRecorder.current.prepareToRecordAsync(
            // Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            Audio.RecordingOptionsPresets.HIGH_QUALITY
          )
          // Start recording
          await AudioRecorder.current.startAsync()
          SetIsRecording(true)
        } catch (error) {
          console.log(error)
        }
      } else {
        // If user has not given the permission to record, then ask for permission
        GetPermission()
      }
    } catch (error) {}
  }

  // Function to stop recording
  const StopRecording = async () => {
    try {
      // Stop recording
      await AudioRecorder.current.stopAndUnloadAsync()

      // Get the recorded URI here
      const result = AudioRecorder.current.getURI()
      console.log(result, 'res')
      // if (result)
      SetRecordedURI(result)
      console.log(RecordedURI, 'from stop recordding')

      // uploadAudio()
      // speak()

      // Reset the Audio Recorder
      AudioRecorder.current = new Audio.Recording()
      SetIsRecording(false)
    } catch (error) {}
  }

  //upload the audio to api
  const uploadAudio = () => {
    const formData = new FormData()
    formData.append('file', {
      uri: RecordedURI,
      type: 'audio/mp4',
      name: 'audio.m4a',
    })
    formData.append('model', 'whisper-1')
    formData.append('lang', 'en')

    const apiUrl = 'https://api.openai.com/v1/audio/transcriptions'
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer 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',
      },
      body: formData,
    }

    fetch(apiUrl, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result).text)
        setResponseText(JSON.parse(result).text)
      })
      .catch((error) => console.log('error', error))
    console.log(responseText, 'on uploadAudio')
  }

  //chatgpt

  const Yelp = async (textToGpt) => {
    console.log(textToGpt, 'YELP')
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      // '{\n    "model": "gpt-3.5-turbo",\n    "messages": [{"role": "user", "content": "Hello!"}]\n  }',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: textToGpt,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer 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',
        },
      }
    )

    setReplyFromGpt(response.data.choices[0].message.content)
  }

  useEffect(() => {
    if (RecordedURI) {
      uploadAudio()
    }
  }, [RecordedURI])
  useEffect(() => {
    if (responseText) {
      Yelp(responseText)
    }
  }, [responseText])

  console.log(replyFromGpt)
  // const speak = () => {
  //   useEffect(() => {
  //     Speech.speak(replyFromGpt)
  //   }, [replyFromGpt])
  // }
  // speak()

  useEffect(() => {
    Speech.speak(replyFromGpt)

    return () => {
      Speech.stop()
    }
  }, [replyFromGpt])

  return (
    <ScrollView style={{ flex: 1, height: 5000, width: 400 }}>
      <View style={styles.container}>
        <View style={{ alignSelf: 'flex-start', left: 12 }}>
          <Text style={styles.headingText}>Speech Recoginition</Text>
        </View>

        {/* For typing and sending the message and receiving output */}
        <View style={{ alignSelf: 'flex-end', left: 20, top: -93 }}>
          <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
            <LottieView
              style={{ width: 175, height: 175, left: 6, top: -10 }}
              source={require('../../assets/118989-robotsaludando.json')}
              autoPlay
              loop
            />
          </TouchableOpacity>
        </View>
        <View style={{ top: -70 }}>
          {/*Here we will return the view when state is true 
        and will return false if state is false*/}
          {shouldShow ? (
            <View style={styles.textInputStyle}>
              <TextInput
                value={enteredText}
                placeholder='yourText'
                style={{ flex: 1 }}
                onChangeText={(enteredText) => setEnteredText(enteredText)}
              />
              <TouchableOpacity
                onPress={() => {
                  setSendQuery(enteredText)
                  console.log(sendQuery, 'send query in onpress')
                  console.log(enteredText, 'onPress')
                  Yelp(enteredText)
                }}
              >
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/3596/3596080.png',
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    top: 7,
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        {/* <Text style={{ color: 'white', fontSize: 25, color: 'white' }}>
          {responseText}
        </Text> */}
        <TextInput
          value={responseText}
          placeholder='yourText'
          style={{ flex: 1, color: 'white', fontSize: 20 }}
        />

        {/* ___________________________________MIDDLE VIEW WHETHER TEXT OR CODE_______________________________
         */}

        {/* For typing and sending the message and receiving output */}
        <View style={{ alignSelf: 'flex-end', left: 20 }}>
          <TouchableOpacity onPress={() => setImageShow(!imageShow)}>
            <LottieView
              style={{ width: 100, height: 100, left: 6, top: -10 }}
              source={require('../../assets/131379-robot-animation-safcsp.json')}
              autoPlay
              loop
            />
          </TouchableOpacity>
        </View>
        <View style={{ top: -70 }}>
          {/*Here we will return the view when state is true 
        and will return false if state is false*/}
          {imageShow ? (
            <View>
              <Text style={{ color: 'white' }}>{replyFromGpt}</Text>
            </View>
          ) : (
            <View>
              <LottieView
                style={{ width: 175, height: 175, left: 6, top: -10 }}
                source={require('../../assets/98042-robot.json')}
                autoPlay
                loop
              />
            </View>
          )}
        </View>
        {/* //_______________________________________________________________ */}

        <View style={styles.bottomView}>
          {IsRecording ? (
            <TouchableOpacity
              onPress={() => {
                // StopRecording()
                StopRecording()
                console.log(responseText, 'resp in onPress')

                // Yelp(responseText)
                // speak()

                LottieRef.current.play() // <---------------- OnPress just call the lottieRef to animate it.
              }}
            >
              <View
                style={{
                  // flex: 1,
                  backgroundColor: 'white',
                  top: -150,
                  bottom: 180,
                  height: 400,
                  width: 400,
                }}
              >
                <LottieView
                  ref={LottieRef}
                  style={{
                    width: 800,
                    height: 200,
                    backgroundColor: 'white',
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/100997-infinite-loading-animation-loader-dots.json')}
                  autoPlay
                  loop
                />
                <Text style={{ alignSelf: 'center', fontSize: 16, top: 30 }}>
                  HOW CAN I HELP YOU?
                </Text>
                <LottieView
                  style={{ width: 425, alignSelf: 'center', top: 55 }}
                  source={require('../../assets/24072-connecting-the-dots.json')}
                  autoPlay
                  loop
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={StartRecording}>
              <LottieView
                ref={LottieRef}
                style={{ width: 150, height: 150 }}
                source={require('../../assets/7227-vui-animation.json')}
                autoPlay
                loop
              />
              <Image
                style={{ width: 100, height: 100, bottom: 120, left: 25 }}
                source={require('../../assets/image/adaptive-icon.png')}
              />
            </TouchableOpacity>
          )}
          {/* </View> */}
        </View>
        <TouchableOpacity
          onPress={() => {
            Speech.stop()
          }}
        >
          <LottieView
            style={{ width: 80, height: 80, bottom: 25, right: 80 }}
            source={require('../../assets/97752-red-circle.json')}
            autoPlay
            loop
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  bottomView: {
    width: '100%',
    height: 50,

    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', //Here is the trick
    padding: 140,
    bottom: 40, //Here is the trick
  },
  headingText: {
    alignSelf: 'center',
    color: 'white',

    marginVertical: 26,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 32,
  },
  textInputStyle: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignSelf: 'center',
    backgroundColor: 'white',
    height: 70,
    borderRadius: 80,
    paddingHorizontal: 20,
    shadowOffset: { width: 100, height: 20 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
  },
  input: {
    borderColor: 'gray',
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    color: 'white',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    color: 'white',
  },
})
export default DisplayScreen
