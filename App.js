import React from 'react'
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import {Provider} from 'react-redux';
import DisplayRecordScreen from "./src/screens/DisplayRecordScreen"
import ProfileScreen from "./src/screens/ProfileScreen"
import store from "./src/redux/store"
const Stack = createStackNavigator()

 const App = () => {
  return(
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="DisplayRecordScreen" component={DisplayRecordScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

{/* <View style={{flex:1,backgroundColor:"#f5f3ed"}}>
       
       <Card style={{marginHorizontal:15,marginTop:60,height:100,width:300,alignSelf:"center"}}>
         <Text>Hii</Text>
         <Image
           source={{uri:"https://cdn1.truelancer.com/upload-full/701651-vector-cartoon-portrait-avatar-illustration-fanart.jpg"}}
           style={{position:"absolute",bottom:50,height:100,width:100,borderRadius:50,borderColor:"#f5f3ed",borderWidth:6,alignSelf:"center"}}
         />
       </Card>
       
     </View> */}
export default App