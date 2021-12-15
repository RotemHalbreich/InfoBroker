
import React from 'react'
import { View, Text } from 'react-native'

const SettingsScreen = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Settings</Text>
    </View>
  )
}

export default SettingsScreen

// import { useNavigation } from '@react-navigation/core'
// import React from 'react'
// import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import SettingsScreen from './SettingsScreen';

// const SettingsScreen = () => {

//   const navigation = useNavigation()

//   const settingsOptions = [
//     { title: "My Info", subTitle: "Setup your profile", onPress: () => {}},
//     { title: "My Info", subTitle: "Setup your profile", onPress: () => {}},
//     { title: "My Info", subTitle: "Setup your profile", onPress: () => {}},
//     { title: "My Info", subTitle: "Setup your profile", onPress: () => {}},
//     { title: "My Info", subTitle: "Setup your profile", onPress: () => {}},
//     { title: "My Info", subTitle: "Setup your profile", onPress: () => {}},
//     { title: "My Info", subTitle: "Setup your profile", onPress: () => {}},
//   ];

//   return (
//     <KeyboardAvoidingView>
//       <View>

//       </View>

//       <View>
//         <TouchableOpacity>

//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   )
// }

// export default SettingsScreen




// const styles = StyleSheet.create({



// })
