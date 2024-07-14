import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ColorBlind from './ColorBlind'
import Blind from './Blind'
import Dyslexic from './Dyslexic'
import Selection from './Selection'

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Group>
                <Stack.Screen name="Select" component={Selection}></Stack.Screen>
                <Stack.Screen name="ColorBlind" component={ColorBlind}></Stack.Screen>
                <Stack.Screen name="Blind" component={Blind}></Stack.Screen>
                <Stack.Screen name="Dyslexic" component={Dyslexic}></Stack.Screen>
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackNavigator