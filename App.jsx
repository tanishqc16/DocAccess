import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import ColorBlind from './Components/ColorBlind';
import Blind from './Components/Blind';
import Dyslexic from './Components/Dyslexic';

import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './Components/StackNavigator';

const App = () => {


  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );

};

export default App;
