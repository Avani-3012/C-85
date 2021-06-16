import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import { Card, Icon, ListItem } from "react-native-elements";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import NotificationScreen from './NotificationScreen';

import firebase from "firebase";
import db from "../config.js";

export default class MyDonations extends Component {
  static navigationOptions = { header: null };

  constructor() {
    super();
    this.state = {
        donorId : firebase.auth().currentUser.email,
        donorName : "",
        allDonations : []
    };
    this.requestRef = null;
  }
  static navigationOptions = { header: null };

   getDonorDetails=(donorId)=>{
    db.collection("users").where("email_id","==", donorId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        this.setState({
          "donorName" : doc.data().first_name + " " + doc.data().last_name
        })
      });
    })
  }

  getAllDonations =()=>{
    this.requestRef = db.collection("all_donations").where("donor_id" ,'==', this.state.donorId)
    .onSnapshot((snapshot)=>{
      var allDonations = []
      snapshot.docs.map((doc) =>{
        var donation = doc.data()
        donation["doc_id"] = doc.id
        allDonations.push(donation)
      });
      this.setState({
        allDonations : allDonations
      });
    })
  }


  sendItem=(itemDetails)=>{
    if(itemDetails.request_status === "Book Sent"){
      var requestStatus = "Donor Interested"
      db.collection("all_donations").doc(itemDetails.doc_id).update({
        "request_status" : "Donor Interested"
      })
      this.sendNotification(itemDetails,requestStatus)
    }
    else{
      var requestStatus = "Item Sent"
      db.collection("all_donations").doc(itemDetails.doc_id).update({
        "request_status" : "Item Sent"
      })
      this.sendNotification(itemDetails,requestStatus)
    }
  }

  sendNotification=(itemDetails,requestStatus)=>{
    var requestId = itemDetails.request_id
    var donorId = itemDetails.donor_id
    db.collection("all_notifications")
    .where("request_id","==", requestId)
    .where("donor_id","==",donorId)
    .get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        var message = ""
        if(requestStatus === "Item Sent"){
          message = this.state.donorName + " sent you item"
        }else{
           message =  this.state.donorName  + " has shown interest in donating the item"
        }
        db.collection("all_notifications").doc(doc.id).update({
          "message": message,
          "notification_status" : "unread",
          "date"                : firebase.firestore.FieldValue.serverTimestamp()
        })
      });
    })
  }



  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>{item.item_name}</Text>
        <Text>
          {"Requested By : " +
            item.requested_by +
            "\nStatus : " +
            item.request_status}
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "#ffff" }}>Send Item</Text>
        </TouchableOpacity>
      </View>
    );
  };

  componentDidMount() {
    this.getDonorDetails(this.state.donorId)
    this.getAllDonations();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <FontAwesome
            name="bars"
            color="black"
            size={30}
            style={{ marginLeft: -1300, marginBottom: -10 }}
            onPress={() => this.props.navigation.toggleDrawer()}
          ></FontAwesome>

          <FontAwesome
            name="bell"
            //color="black"
            size={30}
            style={{ marginLeft: 1300, marginTop: -10 }}
            onPress={() => {this.props.navigation.navigate('NotificationScreen')}}
          ></FontAwesome>



          <Text style={{ color: "#90A5A9", fontSize: 20, fontWeight: "bold" }}>
            My Donations
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          {this.state.allDonations.length === 0 ? (
            <View style={styles.subtitle}>
              <Text style={{ fontSize: 20 }}>List of all book Donations</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allDonations}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
  subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    backgroundColor: "#eaf8fe",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
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
    height: 120,
    alignSelf: "center",
    borderColor: '"#EEF6E9',
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
});
