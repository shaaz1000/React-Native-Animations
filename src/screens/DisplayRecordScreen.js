import React,{useEffect,useState} from "react"
import {Text,View,FlatList,StatusBar,SafeAreaView,TextInput,Image,TouchableOpacity} from "react-native"
import {connect, useStore} from "react-redux"
import * as userActions from "../redux/actions/userData"
import {IconButton,ActivityIndicator,Divider,Colors} from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const DisplayRecordScreen = ({dispatch,userData,navigation}) => {
    
    const [isLoading,setLoading] = useState(true)
    const [FilteredData,setFilteredData] = useState([])
    const [BackupData,setBackupData] = useState([])
    const [IsSortAscending ,setIsSortAscending ] = useState(true)
    let query = null
    const FetchData = async () => {
        setLoading(true)
        fetch("https://run.mocky.io/v3/e6daf7f7-9ec2-42cf-b221-ef64f1c0c6a5")
        .then(data=>data.json())
        .then(data2=>{
            dispatch(userActions.setUserData(data2))
            setFilteredData(data2)
            setBackupData(data2)
            setLoading(false)
        })
        
    }

    
    useEffect(()=>{
        FetchData()
    },[])

    const filterItem = text => {
        query = text
         
         if(query=== ""){
            setFilteredData(BackupData)
         }else{
             let backup = BackupData
             query = query.toLowerCase()
             backup = backup.filter(l=>l.firstname.toLowerCase().match(query))
             setFilteredData(backup)
          
         }
     }

    const sortFunction = () => {
        const tempData = [...userData];
        const temp = tempData.sort((a,b)=>{
            if(a.firstname < b.firstname){
                if(IsSortAscending){
                    setIsSortAscending(false)
                    return 1;
                }else {
                    setIsSortAscending(true)
                    return -1
 
                }
            }
            if(a.firstname > b.firstname){
                if(IsSortAscending){
                    setIsSortAscending(false)
                    return -1;

                }else {
                   setIsSortAscending(true)

                    return 1

                }
            }
            return 0
        })
        setFilteredData(temp)
    }
    
    const renderItem = item => {
      
        return(
            <>
            
            <View 
                
                style={{backgroundColor:"white",width:"100%",flexDirection:"row",marginBottom:5}}
            >
                <View style={{width:"20%"}}>
                <TouchableOpacity onPress={()=>navigation.navigate("Profile",{
                    ProfilePicture:"https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
                    Name : item.firstname + " " + item.surname,
                    Company : item.company,
                })}>
                <Image
                    source={{uri:"https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"}}
                    style={{width:80,height:80,borderRadius:40,margin:5,marginVertical:15,justifyContent:"center"}}
                />
                </TouchableOpacity>
                </View>
                <View style={{width:"60%",marginLeft:10}}>
                <View style={{flexDirection:"row",marginTop:15}}>
                    <Text style={{fontSize:17,marginLeft:10}}>{item.firstname}</Text>
                    <Text style={{fontSize:17,marginLeft:3}}>{item.surname}</Text>
                </View>
                <Text style={{marginLeft:10,marginTop:5,color:"#525354"}}>Work Enquiry</Text>
                <Text style={{marginLeft:10,marginTop:3,color:"#666769"}}>Hey there, I am interested to work with you</Text>
                </View>
                <View style={{marginTop:15}}>
                    <Text style={{color:"#a8aaad"}}>10:45AM</Text>
                </View>
            </View>
            <Divider style={{borderWidth:0.3}}/>
            </>
        )
    }
    return(
        // #f5f3ed
        <>
        {
                isLoading ?
                <View style={{backgroundColor:"white",flex:1,justifyContent: "center",alignItems:"center"}}>
                    <ActivityIndicator animating={true} size="large" color={Colors.blue800}/>
                </View>
                :
                <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
            <View style={{width:"100%",backgroundColor:"#f5f3ed",flexDirection:"row"}}>
            <IconButton
                style={{width:"6%"}}
                icon="magnify"
                color="black"
                size={26}
                onPress={() => console.log('Pressed')}
            />
                <TextInput style={{
                    
                    fontSize:16,
                    paddingVertical:4,
                    width:"82%",
                    color:"black"
                    }}

                        placeholderTextColor="black"
                        placeholder="Search"
                        label="Search"
                        onChangeText={(item)=>filterItem(item)}
                    />
                    
                <IconButton
                    style={{alignSelf:"flex-end"}}
                    icon="sort-descending"
                    color="black"
                    size={20}
                    onPress={() => userData.sort(sortFunction)}
                />
            </View>
            <FlatList
                data={FilteredData}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=>{
                    return renderItem(item)
                }}
                keyExtractor={({index})=>index.toString()}
            />
        </SafeAreaView>
        }
        
        </>
    )
}
const mapStateToProps = state => {
    return{
        userData : state.UserReducer.userData
    }
}
export default connect(mapStateToProps)(DisplayRecordScreen)