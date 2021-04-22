import React from "react"
import {Text,View,StyleSheet,Image,Animated} from "react-native"
import {Card} from "react-native-paper"
const ProfileScreen = ({route}) => {
    
    const {Company,Name,ProfilePicture} = route.params
    const Toppostion = new Animated.ValueXY({x:0,y:0})
    Animated.timing(Toppostion,{
           toValue:{x:0,y:60} ,
           duration : 2000,
           useNativeDriver:true,
           
    }).start()


    const BottomPosition = new Animated.ValueXY({x:0,y:500})
    Animated.timing(BottomPosition,{
        toValue:{x:0,y:260} ,
        duration : 2000,
        useNativeDriver:true
 }).start()
    return(
        <>
        <View style={{flex:1,backgroundColor:"#f5f3ed"}}>
        
        <Animated.View style={{transform:[
                        {translateX:Toppostion.x},
                        {translateY:Toppostion.y},
                        
                    ],
                    zIndex:1
                    }}>
        <Image source={{uri : ProfilePicture}} 
                style ={{
                    marginTop:100,
                    height:140,
                    width:140,
                    borderRadius:70,
                    position:"absolute",
                    alignSelf:"center",
                    borderColor:"#f5f3ed",
                    borderWidth:10
                    
                }}/>
        </Animated.View>
        <Animated.View style={{transform:[
                        {translateX:BottomPosition.x},
                        {translateY:BottomPosition.y}
                    ]}}>
        <Card style={{marginHorizontal:15,position:"absolute",alignSelf:"center"}}>
            
            <Text style={styles.textStyle}>{Name}</Text>
            <Text style={[styles.textStyle,{color:"#64abc4",fontSize:17,marginTop:-10}]}>{Company}</Text>
            <Text style={{textAlign:"center",fontSize:15,marginTop:-1,marginHorizontal:10}}>This is just a Lorem Ipsum, Lorem Ipsum is a dummy data use widely in Development , Design Process and more</Text>
        </Card>
        </Animated.View>
        
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    textStyle:{
        padding:10,
        textAlign:"center",
        fontSize:24,
        marginTop:30,
        fontWeight:"bold"
    }
})

export default ProfileScreen