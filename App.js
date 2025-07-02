import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';




export default function App() {


  const [audioSound] = useState(new Audio.Sound())

  function promiseSpeak(word) {

    return new Promise((resolve, reject) => {
      FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(data => {
      
        if (data.includes(word + ".mp4")) {
          console.log(word,"is included")
          audioSound.unloadAsync()
            .then(() => {
  
              audioSound.loadAsync(
  
                //  { uri: `https://audio.wordhippo.com/mp3/translate_tts?ie=UTF-8&tl=en-US&tk=590080.996406&client=t&q=this is a hippo` }
                { uri: FileSystem.documentDirectory + word + ".mp4" }
                , { shouldPlay: true }, true)
                .then(() => {
  
  
                  audioSound.setOnPlaybackStatusUpdate(function (info) {
                    if (info.didJustFinish) {
                      resolve()
                    }
  
                    // if ((info.isLoaded) && (!info.isPlaying) && (info.didJustFinish)) {
  
                    //     timeout && clearTimeout(timeout); timeout = false
                    //     resolve()
                    // }
                  });
                })
            })
        }
        else {
          console.log("downloading",word)
          const downloadResumable = FileSystem.createDownloadResumable(
            `https://audio.wordhippo.com/mp3/translate_tts?ie=UTF-8&tl=en-US&tk=590080.996406&client=t&q=${word}`,
            FileSystem.documentDirectory + word + '.mp4',
            {},
            () => {
              audioSound.unloadAsync()
                .then(() => {
                  console.log(word)
                  audioSound.loadAsync(
  
                    //  { uri: `https://audio.wordhippo.com/mp3/translate_tts?ie=UTF-8&tl=en-US&tk=590080.996406&client=t&q=this is a hippo` }
                    { uri: FileSystem.documentDirectory + word + ".mp4" }
                    , { shouldPlay: true }, true)
                })
  
            }
          );
          downloadResumable.downloadAsync().then(() => { resolve() }).catch(() => { reject() })
  
        }
  
      })
  
    })
  
  
  
  }

  const speak = () => {
    const thingToSay = '测试一下  hello how are you';
    Speech.speak(thingToSay,{onDone:()=>{
      console.log("speech is done")

      Speech.speak(thingToSay)

    }});
  };

  


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />


      <View style={{ top: 30, zIndex: 900 }}>
        <Button title="Press to hear some wordvs"
         // onPress={promiseSpeak.bind("","bush")}
         
         onPress={speak}
         // onPress={playword}
        // onPress={speak.bind(null, "peter")} 

        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
