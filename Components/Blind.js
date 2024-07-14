import React, { useState } from 'react';
import { View, Button, Image, Text, Pressable } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Tts from 'react-native-tts';
import axios from 'axios';

const Blind = () => {

    const server = 'http://8425-34-68-114-35.ngrok-free.app/';

    const [summarisedText, setSummarisedText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImagePicker = async () => {
        const result = await launchImageLibrary({ includeBase64: true });
        if (!result.didCancel && !result.error) {
            // Fetch base64 data separately
            const base64Data = await getBase64(result.assets[0].uri);
            setSelectedImage({ uri: result.assets[0].uri, base64: base64Data });
        }
    };

    const getBase64 = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;

            reader.readAsDataURL(blob);
        });
    };

    const handleCamera = async () => {
        const result = await launchCamera({ includeBase64: true });
        if (!result.didCancel && !result.error) {
            // Fetch base64 data separately
            const base64Data = await getBase64(result.assets[0].uri);
            setSelectedImage({ uri: result.assets[0].uri, base64: base64Data });
        }
    };


    const handleUpload = async () => {
        try {
            if (selectedImage) {
                // Ensure that selectedImage contains the correct base64-encoded image data
                const imageBase64 = selectedImage.base64;

                // Send the selected image to the Python backend

                const response = await axios.post(`${server}blind`, {
                    image: imageBase64,
                });

                // Process the response from the backend
                // console.log('Processed Image Base64:', response.data.processedImage);

                // Update state with the processed image
                setSummarisedText(response.data.summarisedText);
            }
        } catch (error) {
            console.error('Error uploading or processing image:', error);
        }
    };

    const readText = async () => {
        Tts.stop();
        Tts.speak(summarisedText);
    }
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: 'black' }}>

            <Text style={{ fontSize: 40, fontWeight: 'bold', width: 220, textAlign: 'center', marginVertical:20}}>Visually Challenged</Text>
            {selectedImage ? (
                <Image
                    source={{ uri: selectedImage.uri }}
                    style={{ width: 200, height: 200, marginBottom: 10 }}
                />
            ) : null}
            {summarisedText ?
                <Text style={{ margin: 10 }}>{summarisedText}</Text>
                : null}

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>

                <Pressable onPress={handleImagePicker} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, width: 80, height:30, margin: 6 }}>
                    <Text style={{ color: 'black' }}>Pick Image</Text>
                </Pressable>

                <Pressable onPress={handleCamera} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, width: 60,  height:30, margin: 6 }}>
                    <Text style={{ color: 'black' }}>Camera</Text>
                </Pressable>

                <Pressable onPress={handleUpload} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, width: 55,  height:30,margin: 6 }}>
                    <Text style={{ color: 'black' }}>Upload</Text>
                </Pressable>

                <Pressable onPress={readText} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, width: 75, height:30, margin: 6 }}>
                    <Text style={{ color: 'black' }}>Read Text</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Blind