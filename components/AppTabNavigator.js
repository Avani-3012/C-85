import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ItemRequestScreen from '../screens/ItemRequestScreen';
import ItemDonateScreen from '../screens/ItemDonateScreen';
import {AppStackNavigator} from './AppStackNavigator'

export const AppTabNavigator = createBottomTabNavigator({
  ItemBooks : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/donateItems.jpg")} style={{width:20, height:20}}/>,
      tabBarLabel : "Donate Items",
    }
  },
  ItemRequest: {
    screen: ItemRequestScreen,
    navigationOptions :{
     tabBarIcon : <Image source={require("../assets/request.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Request Items",
    }
  }
});