import React, { useState } from 'react';
import { View, Button, Image, Text, Pressable } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const ColorBlind = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const server = 'http://8425-34-68-114-35.ngrok-free.app/'


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


  const handleDueteranopia = async () => {
    try {
      if (selectedImage) {
        // Ensure that selectedImage contains the correct base64-encoded image data
        const imageBase64 = selectedImage.base64;

        // Send the selected image to the Python backend
        const response = await axios.post(`${server}deuteranopia`, {
          image: imageBase64,
        });

        // Process the response from the backend
        // console.log('Processed Image Base64:', response.data.processedImage);

        // Update state with the processed image
        setProcessedImage({ uri: `data:image/jpeg;base64, ${response.data.processedImage}` });
      }
    } catch (error) {
      console.error('Error uploading or processing image:', error);
    }
  };


  const handleProtanopia = async () => {
    try {
      if (selectedImage) {
        // Ensure that selectedImage contains the correct base64-encoded image data
        const imageBase64 = selectedImage.base64;

        // Send the selected image to the Python backend
        const response = await axios.post(`${server}protanopia`, {
          image: imageBase64,
        });

        // Process the response from the backend
        // console.log('Processed Image Base64:', response.data.processedImage);

        // Update state with the processed image
        setProcessedImage({ uri: `data:image/jpeg;base64, ${response.data.processedImage}` });
      }
    } catch (error) {
      console.error('Error uploading or processing image:', error);
    }
  };

  const handleTritanopia = async () => {
    try {
      if (selectedImage) {
        // Ensure that selectedImage contains the correct base64-encoded image data
        const imageBase64 = selectedImage.base64;

        // Send the selected image to the Python backend
        const response = await axios.post(`${server}tritanopia`, {
          image: imageBase64,
        });

        // Process the response from the backend
        // console.log('Processed Image Base64:', response.data.processedImage);

        // Update state with the processed image
        setProcessedImage({ uri: `data:image/jpeg;base64, ${response.data.processedImage}` });
      }
    } catch (error) {
      console.error('Error uploading or processing image:', error);
    }
  };

  const handleMonochromacy = async () => {
    try {
      if (selectedImage) {
        // Ensure that selectedImage contains the correct base64-encoded image data
        const imageBase64 = selectedImage.base64;

        // Send the selected image to the Python backend
        const response = await axios.post(`${server}monochromacy`, {
          image: imageBase64,
        });

        // Process the response from the backend
        // console.log('Processed Image Base64:', response.data.processedImage);

        // Update state with the processed image
        setProcessedImage({ uri: `data:image/jpeg;base64, ${response.data.processedImage}` });
      }
    } catch (error) {
      console.error('Error uploading or processing image:', error);
    }
  };


  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height:'100%', backgroundColor:'black' }}>
      <Text style={{fontSize:40, fontWeight:'bold', marginVertical:20}}>ColorBlind</Text>
      {selectedImage ? (
        <Image
          source={{ uri: selectedImage.uri }}
          style={{ width: 200, height: 200, marginBottom: 10 }}
        />
      ) : null}

      {processedImage ? (
        <Image
          source={{ uri: processedImage.uri }}
          style={{ width: 200, height: 200, marginBottom: 10 }}
        />
      ) : null}

      <Text>SELECT AN IMAGE:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center'}}>
        
        <Pressable onPress={handleImagePicker} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, width: 80, margin: 6 }}>
          <Text style={{ color: 'black' }}>Pick Image</Text>
        </Pressable>

        <Pressable onPress={handleCamera} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, width: 60, margin: 6 }}>
          <Text style={{ color: 'black' }}>Camera</Text>
        </Pressable>
      </View>
      
      <Text>SELECT YOUR CONDITION: </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center'}}>
        <Pressable onPress={handleDueteranopia} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, width: 95, margin: 6 }}>
          <Text style={{ color: 'black' }}>Deuteranopia</Text>
        </Pressable>

        <Pressable onPress={handleProtanopia} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, width: 80, margin: 6 }}>
          <Text style={{ color: 'black' }}>Protanopia</Text>
        </Pressable>

        <Pressable onPress={handleTritanopia} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, width: 75, margin: 6 }}>
          <Text style={{ color: 'black' }}>Tritanopia</Text>
        </Pressable>

        <Pressable onPress={handleMonochromacy} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, width: 108, margin: 6 }}>
          <Text style={{ color: 'black' }}>Monochromacy</Text>
        </Pressable>
      </View>

    </View>
  );
};

export default ColorBlind;
