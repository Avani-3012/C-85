import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
//import ItemRequestScreen from './Screens/ItemRequestScreen'
import {AppDrawerNavigator} from './components/AppDrawerNavigator'
import MainScreen from './Screens/MainScreen'
import { AppTabNavigator } from './components/AppTabNavigator'
import DonorDeatilsScreen from './Screens/SettingScreen'

export default function App() {
  return (
   <AppContainer/>
  );
}


const switchNavigator = createSwitchNavigator({
  MainScreen:{screen: MainScreen},
  Drawer:{screen: AppDrawerNavigator},
  BottomTab:{screen: AppTabNavigator},
  
})

const AppContainer =  createAppContainer(switchNavigator);