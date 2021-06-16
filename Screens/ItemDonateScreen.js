import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default class ItemDonateScreen extends Component {
  constructor() {
    super();
    this.state = {
      requestedItemsList: [],
    };
    this.requestRef = null;
  }

  getRequestedItemsList = () => {
    this.requestRef = db
      .collection("requested_items")
      .onSnapshot((snapshot) => {
        var requestedItemsList = snapshot.docs.map((document) =>
          document.data()
        );
        this.setState({
          requestedItemsList: requestedItemsList,
        });
      });
  };

  componentDidMount() {
    this.getRequestedItemsList();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>{item.item_name}</Text>
        <Text>{item.reason_to_request}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("DonorDetails", { details: item });
          }}
        >
          <Text style={{ color: "#ffff" }}>View</Text>
        </TouchableOpacity>
      </View>
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
            style={{ marginLeft: -1300,marginBottom:-10}}
            onPress={() => this.props.navigation.toggleDrawer()}
          ></FontAwesome>
            <FontAwesome
            name="bell"
            //color="black"
            size={30}
            style={{ marginLeft: 1300, marginTop: -10 }}
            onPress={() => {this.props.navigation.navigate('NotificationScreen')}}
          ></FontAwesome>
          <Text style={{ color: "#90A5A9", fontSize: 20, fontWeight: "bold",justifyContent:"center",alignItems:'center', }}>
            Donate Books
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {this.state.requestedItemsList.length === 0 ? (
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20 }}>
                  List Of All Requested Items
                </Text>
              </View>
            ) : (
              <ScrollView>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedItemsList}
                renderItem={this.renderItem}
              />
              </ScrollView>
            )}
          </View>
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
    //justifyContent:'center',
    //alignItems:'center',
    marginRight: -120,
    backgroundColor: "purple",
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
