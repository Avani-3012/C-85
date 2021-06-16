import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default class MyReceivedBooksScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      receivedItemsList: [],
    };
    this.requestRef = null;
  }

  getReceivedBooksList = () => {
    this.requestRef = db
      .collection("requested_items")
      .where("user_id", "==", this.state.userId)
      .where("item_status", "==", "received")
      .onSnapshot((snapshot) => {
        var receivedItemsList = snapshot.docs.map((doc) => doc.data());
        this.setState({
          receivedItemsList: receivedItemsList,
        });
      });
  };

  componentDidMount() {
    this.getReceivedBooksList();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    console.log(item.item_name);
    return (
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.bookStatus}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        bottomDivider
      />
    );
  };

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
            onPress={() => this.props.navigation.navigate('NotificationScreen')}
          ></FontAwesome>
          <Text style={{ color: "#90A5A9", fontSize: 20, fontWeight: "bold" }}>
            My Received Books
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          {this.state.receivedItemsList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List Of All Received Books</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.receivedBooksList}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  header: {
    flex: 1,
    backgroundColor: "#eaf8fe",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
});
