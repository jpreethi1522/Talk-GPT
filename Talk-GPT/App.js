import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import OpenScreen from './src/screens/OpenScreen'
import DisplayScreen from './src/screens/DisplayScreen'
import Intro from './src/screens/Intro'

const navigator = createStackNavigator(
  {
    Open: OpenScreen,
    Display: DisplayScreen,
    Intro: Intro,
  },
  {
    initialRouteName: 'Open',

    defaultNavigationOptions: {
      title: 'Talk-GPT',
    },
  }
)

export default createAppContainer(navigator)
