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
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

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
      isUploading: false,
      imageUri: '',
      imageBase64Data: '',
      visionRes: {}
    };
  }
  
  handlePickerPress = () => ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      this.uploadImage(response.uri)
      this.setState({
        imageUri: response.uri, 
        imageBase64Data: response.data
      });
    }
  });

  uploadImage = async (imageUri) => {
    
  }

  submitToGoogle = async () => {
    try {
      let {imageUri, imageBase64Data} = this.state;

      let body = JSON.stringify({
        requests: [{
          image: {
            content: imageBase64Data
          },
          features: [
            {type: "WEB_DETECTION", maxResults: 3}
            // {type: "TEXT_DETECTION", maxResults: 3},
            // {type: "DOCUMENT_TEXT_DETECTION", maxResults: 3},
            //{type: "LABEL_DETECTION", maxResults: 6},
          ]
        }]
      })

      //ATTEMPT 1
      // let res = await axios.post(`https://127.0.0.1:3000/api/vision`, {
      //   data: imageBase64Data
      // });

      //ATTEMPT 2
      // const imageData = new FormData();
      // imageData.append('image[images_attributes[0][file]]', {uri: imageUri, type: 'image/jpeg'})
      //
      // let res = await fetch(`https://127.0.0.1:3000/api/vision`,{
      //   method: 'post',
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   body: imageData
      // });

      //ATTEMPT 3
      /* let res = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${env.GOOGLE_CLOUD_VISION_API_KEY}`, {
        header: {
          Accept: "application/json", 
          "Content-Type": "appilcation/json"
        },
        method: 'POST',
        body
      }); */

      this.setState({visionRes: res})//.responses.webDetection.webEntities.bestGuessLabels.label})
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    const {imageBase64Data, visionRes} = this.state;
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
                <Image source={{ uri:`imageUri`}} style={styles.image}/> 
              but knowing you can input encoded data into source is cooler*/}
              <Image source={{ uri:`data:image/jpeg;base64,${imageBase64Data}`}} 
              style={styles.image}/>
            </View>
            <View style={sectionContainer}>
            { 
              imageBase64Data.length
              ? <><TouchableOpacity onPress={this.submitToGoogle} style={button}>
                  <Text style={{fontSize:18}}>Submit</Text>
                </TouchableOpacity></>
              : <></>
            }
            {
              visionRes ? <Text>{JSON.stringify(visionRes)}</Text> : <></>
            }
            {
              this.state.isUploading && <ActivityIndicator/>
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
