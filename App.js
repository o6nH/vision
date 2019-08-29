/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
// import * as firebase from 'firebase';

const options = {
  title: 'Select an Image to Analyze',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class App extends Component {
  constructor(){
    super();
    this.state = {
      image: {},
      imageBase64Data: '',
      publicImageUrl: '',
      visionLabels: []
    };
  }
  
  handlePickerPress = () => ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      this.setState({
        image: {
          uri: response.uri,
          type: 'image/jpeg', 
          name: `image-${Date.now()}.jpg`
        },
        imageBase64Data: response.data,
      });
    }
  });

  submitToGoogle = async () => {
    try {
      const uploadUrl = 'https://vision-to-graph.appspot.com/api/vision/upload';
      const annoteUrl = 'https://vision-to-graph.appspot.com/api/vision';

      const formData = new FormData();
      formData.append('image', this.state.image)
      
      const {data: publicImageUrl} = await axios({
        url: uploadUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        },
        body: formData
      });

      const {data: visionLabels} = await axios({
        url: annoteUrl,
        method: 'POST', 
        body: publicImageUrl
      })

      this.setState({publicImageUrl, visionLabels})

    } catch (err) {
      console.error(err);
    } 
  }; 

/*   getNutrition = (upc) => {
    let {data} = await axios.get(`https://api.spoonacular.com/food/products/upc/${upc}`);

    this.setState({nutrition: data.nutrition})
  } */

  render() {
    const {image, imageBase64Data, visionLabels} = this.state;
    const {
      scrollView, 
      body, 
      sectionContainer, 
      sectionTitle, 
      bold,
      sectionDescription, 
      button
    } = styles;
    
    return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={scrollView}>
          {/* <Header /> */}
          <View style={body}>
            <View style={sectionContainer}>
              <Text style={[sectionTitle, bold]}>What We Ate</Text>
              <Text style={sectionDescription}>
                Select an image by clicking the below button.
              </Text>
            </View>
            <View style={sectionContainer}>
              <TouchableOpacity onPress={this.handlePickerPress} style={button}>
                <Text style={{fontSize:18}}>ImagePicker</Text>
              </TouchableOpacity>
              {/* Could use
                <Image source={{ uri:`image.uri`}} style={styles.image}/> 
              but knowing you can input encoded data into source is cooler*/}
              <Image source={{ uri:`data:image/jpeg;base64,${imageBase64Data}`}} 
              style={styles.image}/>
            </View>
            {
              <View>
                <Text>{image.uri}</Text>
              </View>
            }
            <View style={sectionContainer}>
            { 
              imageBase64Data.length
              ? <><TouchableOpacity onPress={this.submitToGoogle} style={button}>
                  <Text style={{fontSize:18}}>Submit</Text>
                </TouchableOpacity></>
              : <></>
            }
            <></>
            {
              Array.isArray(visionLabels)
              ? visionLabels.map(label => 
                <TouchableOpacity key={label} onPress={() => alert("Not linked to anything yet")} style={button}>
                  <Text>{JSON.stringify(visionLabels)}</Text>
                </TouchableOpacity>) 
              :<></>
            }
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.darker
  },
  body: {
    backgroundColor: Colors.dark
  },
  sectionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: Colors.dark
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.lighter
  }, 
  button: {
    marginVertical: 8,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:'dodgerblue', 
    width:'50%'
  }, 
  bold: {
    fontSize: 24,
    fontWeight: "700" 
  },
  image: {
    marginVertical: 32,
    marginHorizontal: '25%', 
    width: 128,
    height: 128
  }
});

export default App;
