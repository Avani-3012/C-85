import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import ItemDonateScreen from '../screens/ItemDonateScreen';
import DonorDetailsScreen  from '../screens/DonorDetailsScreen';




export const AppStackNavigator = createStackNavigator({
  ItemDonateList : {
    screen : ItemDonateScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  DonorDetails : {
    screen : DonorDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'ItemDonateList'
  }
);