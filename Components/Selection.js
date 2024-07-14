import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Selection = () => {

    const navigation = useNavigation()


    return (
        <View style={{ backgroundColor: 'black', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 50, fontWeight: 'bold', marginVertical:50}}>DocAccess</Text>
            <View>
                <Pressable onPress={() => { navigation.navigate("ColorBlind") }} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, width: 250, margin: 6, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 15 }}>For the ColorBlind</Text>
                    <Image style={{ width: 35, height: 35, marginRight: 5 }}
                        source={require('../assets/images/colorBlind.png')} />
                </Pressable>

                <Pressable onPress={() => { navigation.navigate("Blind") }} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, width: 250, margin: 6 , flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <Text style={{ color: 'black',  fontSize: 15  }}>For the Visually Challenged</Text>
                    <Image style={{ width: 35, height: 35, marginRight: 5 }}
                        source={require('../assets/images/blind.png')} />
                </Pressable>

                <Pressable onPress={() => { navigation.navigate("Dyslexic") }} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, width: 250, margin: 6 , flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <Text style={{ color: 'black',  fontSize: 15  }}>For the Dyslexic</Text>
                    <Image style={{ width: 35, height: 35, marginRight: 5 }}
                        source={require('../assets/images/dyslexia.png')} />
                </Pressable>
            </View>

        </View>
    )

}

export default Selection