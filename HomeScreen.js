import { useState, useContext, useEffect } from 'react';
import ReAnimated, {
    useSharedValue,
    withTiming,
    withSpring,
    withDelay,
    useAnimatedStyle,
    Easing,
    LinearTransition,
    JumpingTransition,
    CurvedTransition,
    ZoomIn,
    runOnJS,
    useAnimatedRef,
    useDerivedValue,
    SlideInRight,
    interpolate,
    withRepeat

} from 'react-native-reanimated';
const { View, Text, ScrollView, FlatList } = ReAnimated

import { StyleSheet, Button, Dimensions, TouchableOpacity, SafeAreaView, RefreshControl, BackHandler, Alert } from 'react-native';
const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height


import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation, useRoute, useNavigationState } from '@react-navigation/native';
const headHeight = getStatusBarHeight() > 24 ? 80 : 60


import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";


import SwipeableItem, {
    useSwipeableItemParams,
    OpenDirection,
} from "react-native-swipeable-item";


import { Context } from './ContextProvider';
import { useAudioPlayer } from 'expo-audio';

export default function HomeScreen() {

    const { sourceWordArr, setSouceWordArr } = useContext(Context)
    const audioPlayer = useAudioPlayer()

    useEffect(() => {
        audioPlayer.replace({ uri: `https://audio.wordhippo.com/mp3/translate_tts?ie=UTF-8&tl=en-US&tk=590080.996406&client=t&q=this is a hippo` })
        const listener = audioPlayer.addListener("playbackStatusUpdate", (audioStatus) => {

            if (audioStatus.didJustFinish) {
                console.log(audioStatus)
                listener.remove()
                audioPlayer.remove()
                //    audioPlayer.removeListener("playbackStatusUpdate")
                //  audioPlayer.removeListener("playbackStatusUpdate",listener)
            }
        })


        audioPlayer.play()

    }, [])

    const headerViewStyle = useAnimatedStyle(() => {


        return {
            width: screenWidth,
            height: headHeight,
            // backgroundColor: "#faf",
            backgroundColor: "wheat",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",

        }
    })


    const frameStyle1 = useAnimatedStyle(() => {
        return {

            width: screenWidth,
            height: screenHeight - headHeight,
            backgroundColor: "darkgray",

        }

    })

    const [dataProvider] = useState(new DataProvider((r1, r2) => {
        return r1 !== r2;
    }));
    const [layoutProvider] = useState(
        new LayoutProvider(
            (index) => { const typeObj = { index, type: "typeA" }; return typeObj },
            (typeObj, dim) => {
                dim.width = screenWidth;
                dim.height = 80;
            }
        )

    )
    const onEndReach = () => { };

    const rowItemRenderer = function (typeObj, item) {

        console.log(item)
        // const SwipebleRowItemRender = memo(SwipebleRowItem, function (prevProp, nextProp) {
        //     console.log(prevProp, nextProp)
        //     console.log("Xxxxxxxxxxxxxxxxxxxxx")
        // })


        // return <SwipebleRowItem typeObj={typeObj} item={item} key={item} sourceWord={sourceWordArr[typeObj.index]} />
        return <View><Text>{item}</Text></View>




    }
    // const [layoutProvider2] = useState(
    //     new LayoutProvider(
    //         (index) => { const typeObj = { index, type: "typeB" }; return typeObj },
    //         (typeObj, dim) => {
    //             dim.width = screenWidth;
    //             dim.height = screenHeight - headHeight;
    //         }
    //     )
    // )


    return (

        <View style={{ width: 2 * screenWidth, height: screenHeight, backgroundColor: "#eee", opacity: 1, flexDirection: "column", }}>

            <View style={[headerViewStyle]}>

                {/* <TouchableOpacity activeOpacity={0.2} onPressOut={function () {

                    navigation.navigate("NewWordScreen")
                    //  console.log(sourceWordArr.length)
                }}>
                    <Icon name="add-circle-outline" type='ionicon' color='orange'


                        containerStyle={{ width: 40, height: 40, transform: [{ rotateZ: "180deg" }] }}
                        // containerStyle={{ position: "absolute", right: 0, transform: [{ translateY: 0 }] }}
                        size={40}
                    />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.2} onPressOut={function () {
                    refreshWordToFile()
                    // isSaving.value = true
                    // AsyncStorage.getItem("sortingObj").then((obj_) => {

                    //     const { levelBar, latestOnTop, shouldSlice, fromIndex, toIndex } = JSON.parse(obj_)

                    //     refreshWordToFile().then(() => {


                    //         FileSystem.readAsStringAsync(FileSystem.documentDirectory + "allwords.txt").then(content => {

                    //             const arr = JSON.parse(content)

                    //             setSouceWordArr(() => {
                    //                 const wordsArr = arr.filter(item => {
                    //                     return levelBar[item.level]
                    //                 })

                    //                 wordsArr.sort((word1, word2) => {
                    //                     return latestOnTop ? (word2.toppingTime - word1.toppingTime) : (-word2.toppingTime + word1.toppingTime)
                    //                 })

                    //                 if (shouldSlice) {
                    //                     isSaving.value = false
                    //                     return wordsArr.slice(Number(fromIndex), Number(toIndex)+1)
                    //                 }
                    //                 else {
                    //                     isSaving.value = false
                    //                     return wordsArr
                    //                 }
                    //             })
                    //         })
                    //     })
                    // })

                }}>

                    <Icon name="swap-horizontal-outline" type='ionicon' color='orange'


                        containerStyle={{ width: 40, height: 40, transform: [{ rotateZ: "90deg" }] }}
                        // containerStyle={{ position: "absolute", right: 0, transform: [{ translateY: 0 }] }}
                        size={40}
                    />

                </TouchableOpacity>


                <TouchableOpacity activeOpacity={0.2} onPressOut={function () {

                    //  navigation.navigate("WordSettingScreen", { sourceWord: sourceWordArr[wordPos.value] })
                    navigation.navigate("SortingScreen")
                }}>
                    <Icon name="funnel-outline" type='ionicon' color='orange'


                        containerStyle={{
                            width: 40, height: 40,
                            transform: [{ rotateZ: "0deg" }, { translateX: 0 }, { translateY: 0 }],
                            zIndex: 100,
                        }}

                        size={40}
                    />
                </TouchableOpacity>



                <TouchableOpacity activeOpacity={0.2} onPressOut={function () {
                    saveWordToFile()
                    //  console.log(sourceWordArr.length)
                }}>
                    <Icon name="save" type='ionicon' color='orange'


                        containerStyle={{ width: 40, height: 40, transform: [{ rotateZ: "180deg" }] }}
                        // containerStyle={{ position: "absolute", right: 0, transform: [{ translateY: 0 }] }}
                        size={40}
                    />
                </TouchableOpacity> */}
            </View>



            <View style={frameStyle1}>



                <RecyclerListView
                    onScroll={function (e) {
                        // if (!handleBarHeight) { setHandleBarHeight(e.nativeEvent.layoutMeasurement.height) }
                        // yPos.value = e.nativeEvent.contentOffset.y
                    }}
                    onItemLayout={e => {

                    }}

                    rowRenderer={rowItemRenderer}


                    layoutProvider={layoutProvider}
                    dataProvider={dataProvider.cloneWithRows(sourceWordArr.map(item => item.wordName))}


                />





            </View>

        </View>

    )
}



function SwipebleRowItem({ typeObj, item, sourceWord }) {

    const { playMeaningSound, scrollRef, wordPos, isListPlaying,
        startPlay, stopPlay,
    } = useContext(Context)


    const selfPanel = useRef()

    const [panelRefresh, setPanelRefrsh] = useState(Date.now())

    return (
        <SwipeableItem key={item}
            swipeDamping={10} //Hswipe velocity determines snap position ,smaller number means swipe velocity will have a larger effect and row will swipe open more easily
            activationThreshold={20}
            overSwipe={20}
            snapPointsLeft={[80]}//{[screenWidth - screenWidth/2]}
            snapPointsRight={[160]}//{[screenWidth - 80]}//{ [screenWidth - screenWidth/2] }

            ref={(ref) => {

                selfPanel.current = ref

            }}

            onChange={({ openDirection, snapPoint, ...props }) => {

            }}

            renderUnderlayLeft={() => {
                return <UnderlayRight item={item} index={typeObj.index} selfPanel={selfPanel} sourceWord={sourceWord} setPanelRefrsh={setPanelRefrsh} />
            }}

            renderUnderlayRight={() => {


                return <UnderlayLeft item={item} index={typeObj.index} selfPanel={selfPanel} sourceWord={sourceWord} setPanelRefrsh={setPanelRefrsh} />
            }}
        >
            <PanelItem wordPos={wordPos} item={item} index={typeObj.index} selfPanel={selfPanel} sourceWord={sourceWord} />

        </SwipeableItem>
    )
}


function PanelItem({ wordPos, index, item, selfPanel, sourceWord }) {




    const { playSound, frameTransY, sourceWordArr,
        startPlay, stopPlay, isListPlaying, setWordPos, scrollRef2 } = useContext(Context)
    const realSourceWord = sourceWordArr.find(item => item.wordName === sourceWord.wordName)

    const { percentOpen, openDirection, openLeft, openRight, percentOpenLeft, percentOpenRight, open, isGestureActive, close } = useSwipeableItemParams();




    const navigation = useNavigation()
    const [refresh, setRefresh] = useState(Date.now())
    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            //  !isListPlaying.value && playSound0(sourceWordArr[wordPos.value].wordName)
            setTimeout(() => {
                setRefresh(Date.now())
            }, 0)



            // setTimeout(() => {
            //     console.log("on homepage card")
            //     setCardRefrsh(Date.now())
            //     //   if (scrollRef.current?._scrollViewRef?.scrollTo) {
            //     //   !isListPlaying.value && scrollRef.current._scrollViewRef.scrollTo({ y: wordPos.value * 80 - 80, animated: false })
            //     //   }
            // }, 2000)

        });
        return unsubscribe

    }, [navigation]);

    const rowItemStyle = useAnimatedStyle(() => {

        return {

            borderBottomWidth: 1,
            height: 80,
            zIndex: 100,
            // transform: [{ translateY: index * 80 }],
            //   backgroundColor: wordPos.value === index ? "#c3e1a2": "wheat"  // "#eee"
            backgroundColor: wordPos.value === index ? "wheat" : "#eee"
            //backgroundColor: "#eee"

        }

    })

    const tap = Gesture.Tap()

        .onEnd(event => {
            if (percentOpen.value !== 0) {
                runOnJS(selfPanel.current.close)()
            }
            else if ((!isListPlaying.value) && (percentOpen.value === 0)) {
                //  runOnJS(console.log)(index)
                runOnJS(playSound)(item)
                wordPos.value = index
                //runOnJS(setWordPos)(index)
                //      scrollRef.current._scrollViewRef.scrollTo({ x: wordPos.value * screenWidth, animated: true })
                // runOnJS(scrollRef2.current._scrollViewRef.scrollTo)({ x: wordPos.value * screenWidth, animated: true})

            }

        })

    const onHandlerStateChange = (event) => {

        if ((event.nativeEvent.state === 5) && (percentOpen.value === 0)) {
            //  setTimeout(() => {
            frameTransY.value = withTiming(-screenHeight + headHeight)
            //   }, 0);
            //frameTransY.value = withTiming(-screenHeight + headHeight)
            // navigation.navigate("CardScreen", { pos: wordPos.value })
        }



        // console.log("tap state", event.nativeEvent.state, "percentage open", percentOpen.value)
    }

    return (

        <GestureHandlerRootView key={item}>
            <GestureDetector gesture={tap} >
                <TapGestureHandler
                    //  ref={doubleTapRef}
                    onHandlerStateChange={onHandlerStateChange}
                    numberOfTaps={2}
                >
                    <View style={[rowItemStyle]} //entering={SlideInRight}
                        key={item} >
                        <Text style={{ fontWeight: 600 }} ellipsizeMode={"tail"} numberOfLines={1}>{index + " " + item}</Text>

                        {realSourceWord.showChinese && <Text ellipsizeMode={"tail"} numberOfLines={2}>{realSourceWord.meaning}</Text>}
                    </View>
                </TapGestureHandler>
            </GestureDetector>
        </GestureHandlerRootView>
    )



}

function UnderlayLeft({ item, index, selfPanel, sourceWord, setPanelRefrsh }) {

    const { sourceWordArr, setSouceWordArr, audioSound, playSound, isListPlaying, wordPos, frameTransY

    } = useContext(Context)

    const realSourceWord = sourceWordArr.find(item => item.wordName === sourceWord.wordName)

    const { percentOpen } = useSwipeableItemParams();

    let rank = 0;

    function resetRank() {
        rank = 0;
        sourceWordArr.forEach((word) => {
            if (realSourceWord.toppingTime < word.toppingTime) {
                rank++
            }
        })
    }
    resetRank()

    useDerivedValue(() => {
        if (percentOpen.value === 1) {
            runOnJS(resetRank)()
        }
    }, [percentOpen.value])




    const animStyle = useAnimatedStyle(
        () => ({
            //  opacity: percentOpen.value,
            height: 80,
            width: 160,//screenWidth - 80,
            backgroundColor: "darkgray",
            //  transform: [{ translateY: 80 * index }],
            zIndex: 0,
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row"
        }),
        [percentOpen]
    );
    return (
        <View
            style={[animStyle]} // Fade in on open
        >
            {/* <Icon name="enter-outline" type='ionicon' color='red'

                onPress={function () {
                    selfPanel.current.close()
                }}
                containerStyle={{ backgroundColor: "orange", width: 60, height: 60, transform: [{ rotateZ: "180deg" }] }}
                // containerStyle={{ position: "absolute", right: 0, transform: [{ translateY: 0 }] }}
                size={60}
            /> */}
            {/* <Icon name="megaphone-outline" type='ionicon' color='red'
                onPress={function () {
                    // if (isListPlaying.value) { return }

                    // wordPos.value = index

                    // frameTransY.value = withTiming(-screenHeight + headHeight)


                    // const arr = []
                    // arr.push(function () {
                    //     return new Promise((resolve, reject) => {


                    //         console.log(">>>>>>>>>Single play start")
                    //         resolve()
                    //     })
                    // })
                    // sourceWord.exampleEnglishArr.forEach((sentence, index) => {
                    //     arr.push(function (shouldTerminate) {

                    //         if (shouldTerminate) {
                    //             return Promise.resolve(true)
                    //         }

                    //         return playSound(sentence)
                    //     })
                    //     arr.push(function (shouldTerminate) {
                    //         if (shouldTerminate) {
                    //             return Promise.resolve(true)
                    //         }

                    //         return playSound(sourceWord.exampleChineseArr[index])
                    //     })

                    // })
                    // arr.push(function () {
                    //     return new Promise((resolve, reject) => {


                    //         console.log(">>>>>>>>>Single play end")
                    //         resolve()
                    //     })
                    // })
                    // // const arr = sourceWord.exampleChineseArr.map((sentence, index) => {
                    // //     return function () {
                    // //         return playSound(sentence)
                    // //     }
                    // // })
                    // console.log(arr)

                    // startPromiseSequential(arr)


                }}
                containerStyle={{ backgroundColor: "orange", width: 60, height: 60 }}
                // containerStyle={{ position: "absolute", right: 0, transform: [{ translateY: 0 }] }}
                size={60}
            /> */}

            <Icon name={realSourceWord.showChinese ? "eye-off-outline" : "eye-outline"} type='ionicon' color='red'

                onPress={function () {

                    realSourceWord.showChinese = !realSourceWord.showChinese
                    setTimeout(() => {
                        setPanelRefrsh(Date.now())
                    }, 0);


                }}
                containerStyle={{ //backgroundColor: "orange",
                    justifyContent: "center", alignItems: "center",
                    width: 60, height: 60, transform: [{ rotateZ: "0deg" }]
                }}
                // containerStyle={{ position: "absolute", right: 0, transform: [{ translateY: 0 }] }}
                size={50}
            />
            <TouchableOpacity onPress={function () {

                realSourceWord.toppingTime = Date.now()
                // setSouceWordArr(arr => {
                //     arr[index].toppingTime = Date.now()
                //     return arr
                //     //return [...arr]
                // })

                setTimeout(() => {
                    setPanelRefrsh(Date.now())
                }, 0);

            }}>
                <View style={{ borderRadius: 999, height: 60, width: 60, justifyContent: "center", alignItems: "center", backgroundColor: "yellow" }}>
                    <Text style={{ fontSize: 15 }}>
                        {rank}
                    </Text>
                </View>
            </TouchableOpacity>






            {/* <TouchableOpacity onPress={function () {
                realSourceWord.showChinese = !realSourceWord.showChinese
                // setSouceWordArr(arr => {

                //     arr[index].showChinese = !arr[index].showChinese
                //     return arr
                //     // return [...arr.map(a => a)]
                //     // return arr.map(item => {
                //     //     if (item.wordName !== sourceWord.wordName) {

                //     //         return item
                //     //     }
                //     //     else {
                //     //         console.log(item.wordName, "---", item.showChinese, sourceWord.showChinese)
                //     //         item.showChinese = !item.showChinese
                //     //         // setPanelRefrsh(Date.now())
                //     //         return item
                //     //     }
                //     // })
                // })

                setTimeout(() => {
                    setPanelRefrsh(Date.now())
                }, 0);

            }}>
                <View style={{ borderRadius: 999, height: 60, width: 60, justifyContent: "center", alignItems: "center", backgroundColor: "yellow" }}>
                    <Text style={{ fontSize: 20 }}>
                        {realSourceWord.showChinese ? "Y" : "N"}
                    </Text>
                </View>
            </TouchableOpacity> */}





        </View>
    );

}

function UnderlayRight({ item, index, selfPanel, sourceWord, setPanelRefrsh }) {

    const { setSouceWordArr, audioSound } = useContext(Context)
    const { percentOpen } = useSwipeableItemParams();

    const navigation = useNavigation()

    const animStyle = useAnimatedStyle(
        () => ({
            //  opacity: percentOpen.value,
            height: 80,
            width: screenWidth,
            backgroundColor: "darkgray",
            //   transform: [{ translateY: 80 * index }],
            zIndex: 0,
            flexDirection: "row-reverse",
            alignItems: "center",
            right: 0,

        }),
        [percentOpen]
    );

    return (
        <View
            style={[animStyle]} // Fade in on open
        >


            <Icon name="settings" type='ionicon' color='red'

                onPress={function () {


                    navigation.navigate("WordSettingScreen", { sourceWord })

                    selfPanel.current.close()


                }}
                containerStyle={{// backgroundColor: "orange",
                    justifyContent: "center", alignItems: "center",
                    width: 80, height: 80, transform: [{ rotateZ: "0deg" }]
                }}
                // containerStyle={{ position: "absolute", right: 0, transform: [{ translateY: 0 }] }}
                size={50}
            />


            {/* <Icon name="enter-outline" type='ionicon' color='red'

                onPress={function () {
                    selfPanel.current.close()
                }}
                containerStyle={{ backgroundColor: "orange", width: 60, height: 60, transform: [{ rotateZ: "0deg" }] }}
                // containerStyle={{ position: "absolute", right: 0, transform: [{ translateY: 0 }] }}
                size={60}
            />


            <TouchableOpacity onPressOut={function () {
                setSouceWordArr(arr => {
                    arr[index].level = arr[index].level + 1
                    return arr
                    //return [...arr]
                })

                setTimeout(() => {
                    setPanelRefrsh(Date.now())
                }, 0);

            }}>
                <View style={{ borderRadius: 999, height: 60, width: 60, justifyContent: "center", alignItems: "center", backgroundColor: "yellow" }}>
                    <Text style={{ fontSize: 20 }}>
                        {sourceWord.level}
                    </Text>
                </View>
            </TouchableOpacity>

            <Icon name="construct-outline" type='ionicon' color='red'

                onPress={function () {


                    navigation.navigate("WordSettingScreen", { sourceWord })

                }}
                containerStyle={{ backgroundColor: "orange", width: 60, height: 60, transform: [{ rotateZ: "0deg" }] }}
                // containerStyle={{ position: "absolute", right: 0, transform: [{ translateY: 0 }] }}
                size={60}
            /> */}


        </View>
    );
};
