import React, { Component } from 'react';
import { StyleSheet, View, FlatList,Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import {Ionicons,FontAwesome} from '@expo/vector-icons'
import SwipeableFlatlist from '../components/SwipeableFlatlist';
import db from '../config';

export default class NotificationScreen extends Component{
  constructor(props) {
    super(props);

    this.state = {
      userId :  firebase.auth().currentUser.email,
      allNotifications : []
    };

    this.notificationRef = null
  }

  getNotifications=()=>{
    this.notificationRef = db.collection("all_notifications")
    .where("notification_status", "==", "unread")
    .where("targeted_user_id",'==',this.state.userId)
    .onSnapshot((snapshot)=>{
      var allNotifications =  []
      snapshot.docs.map((doc) =>{
        var notification = doc.data()
        notification["doc_id"] = doc.id
        allNotifications.push(notification)
      });
      this.setState({
          allNotifications : allNotifications
      });
    })
  }

  componentDidMount(){
    this.getNotifications()
  }

  componentWillUnmount(){
    this.notificationRef()
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item,index}) =>{
      return (
      <View style={styles.listContainer}>
         <Ionicons name="cart-outline" size={25} color="grey" />
        <Text style={styles.listTitle}>{item.item_name}</Text>
        <Text>{item.message}</Text>
      </View>
      )
 }


  render(){
    return(
      <View>
        <View style={styles.header}>
        <FontAwesome
            name="bars"
            color="black"
            size={30}
            style={{ marginLeft: -1300,marginBottom:-10}}
            onPress={() => this.props.navigation.toggleDrawer()}
          ></FontAwesome>




          <Text style={{ color: '#90A5A9', fontSize:20,fontWeight:"bold",}}>Notifications</Text>
        </View>
        <View style={{flex:0.9}}>
          {
            this.state.allNotifications.length === 0
            ?(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25}}>You have no notifications</Text>
              </View>
            )
            :(
              <SwipeableFlatlist allNotifications={this.state.allNotifications}/>
            )
          }
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container : {
    flex : 1
  },
  header: {
    flex: 1,
    backgroundColor: "#eaf8fe",
    alignItems: "center",
    justifyContent: "center",
    height:30,
  
   
  },
  listTitle: {
    flex: 1,
    fontColor: "black",
    fontWeight: "bold",
    fontSize: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    width: "100%",
    height: 100,
    alignSelf: "center",
    borderColor: '"#EEF6E9',
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
})
