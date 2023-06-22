import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
  AppState,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Colors from '../../components/Colors';
import InputField from '../../components/InputField';
import AuthHeader from '../../components/header/AuthHeader';
import CustomButton from '../../components/CustomButton';
import { Font } from '../../constants/Fonts';
import { ImagePickerModal } from '../../components/modals/ImagePickerModal';
import { accessCamera, accessGallery } from '../../utils/ImagePicker';
import Video from 'react-native-video';

// icons

import AntDesign from 'react-native-vector-icons/AntDesign';
import { VideoAndImage } from '../../components/modals/VideoAndImage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { createThumbnail } from 'react-native-create-thumbnail';
import DisableButton from '../../components/DisableButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  delete_images,
  delete_videos,
  upload_images,
  upload_videos,
} from '../../redux/actions/AuthActionss';
import ProgressiveLoader from '../../components/Loader/ProgressiveLoader';
import { upload_video_url } from '../../constants/BaseURl';
import { useCallback } from 'react';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const AddLeadEdit = ({ route }) => {
  const { client_details, item } = route.params;
  const loading = useSelector(state => state.is_loading);

  return (
    <LinearGradient
      colors={['#302DDE', '#3633CA', '#EC42A0']}
      style={styles.container}>
      <StatusBar backgroundColor={Colors.trayColor} barStyle="light-content" />
      <Image
        source={require('../../components/images/shade.png')}
        style={{
          width: '100%',
          height: verticalScale(300),
          resizeMode: 'cover',
          position: 'absolute',
        }}
      />
      <ProgressiveLoader loading={loading} />

      <AddLeadUI client_details={client_details} item={item} />
    </LinearGradient>
  );
};
const AddLeadUI = ({ client_details, item }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [mediaModal, setMediaModal] = useState(false);
  const [visibleVideo, setVisibleVideo] = useState(false);
  const [error, setError] = useState(false);
  const [multipleImages, setMultipleImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videoThumnail, setVideoThumnail] = useState([]);
  const [index, setIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const images = useSelector(state => state.images);
  const video = useSelector(state => state.videos);
  const dispatch = useDispatch();
  const video_array =  JSON.parse(item.video_one)
  

  const video_thumbnail = async () => {
    setLoading(true)
    const vid_array = await JSON.parse(item.video_one)
    const modiefied_videos_array = await video_array.map((item, index) => {
      return { fileName: item, uri: upload_video_url + item }
    })
    await modiefied_videos_array.map((item, index) => {
      return (
        createThumbnail({
          url: item.uri,
        }).then(response =>
          setVideoThumnail(previuos => {
            return [...previuos, response];
          })
        )
      )
    })
    setTimeout(() => {
      setLoading(false)
    }, 1000);

  }
  console.log('loading', loading)
  useFocusEffect(
    useCallback(() => {
      setVideoThumnail([])
      video_thumbnail()
    }, [])

  )
  const openCamera = async () => {
    if (Platform.OS == 'ios') {
      setVisibleVideo(false);
      accessCamera().then(response => {
        if (response.errorCode == 'camera_unavailable') {
          console.log('it will not work in simutlar');
        } else {
          if (response.didCancel != true) {
            dispatch(upload_images(response));
            setVideos(previuos => {
              return [...previuos, ...response.assets];
            });
          }
        }

        setVisible(false);
      });
    } else {
      const camera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (camera == 'granted') {
        setVisibleVideo(false);
        accessCamera().then(response => {
          if (response.didCancel != true) {
            dispatch(upload_images(response));
            setVideos(previuos => {
              return [...previuos, ...response.assets];
            });
          }
          setVisible(false);
        });
      }
    }
  };

  const openGallery = async () => {
    setVisibleVideo(false);
    setVisible(true);
    accessGallery().then(response => {
      if (response.didCancel != true) {
        dispatch(upload_images(response));
        setVideos(previuos => {
          return [...previuos, ...response.assets];
        });
      }
      setVisible(false);
    });
  };

  const Delete = response => {
    dispatch(delete_images(response));
  };

  const video_delete = id => {
    const remaining = videoThumnail.filter((element, ind) => {
      return ind !== id;
    });

    const delete_images = videos.filter((element, ind) => {
      return ind !== id;
    });
    dispatch(delete_videos(video[id]));
    setVideos(delete_images);
    setVideoThumnail(remaining);
  };

  const camera_video = async () => {
    setVisibleVideo(false);
    setVisible(false);
    if (Platform.OS == 'ios') {
      const options = {
        path: 'images',
        mediaType: 'video',
        videoQuality: 'high',
      };
      launchCamera(options, response => {
        if (response.errorCode == 'camera_unavailable') {
          console.log('it will not work in simutlar');
        } else {
          if (response.didCancel != true) {
            console.log('caemra ', response);
            dispatch(upload_videos(response));
            setVideos(previuos => {
              return [...previuos, ...response.assets];
            });
            createThumbnail({
              url: response.assets[0].uri,
              timeStamp: 100,
            }).then(response =>
              setVideoThumnail(previuos => {
                return [...previuos, response];
              }),
            );
          }
        }

        setVisibleVideo(false);
        setVisible(false);
      });
    } else {
      const camera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (camera == 'granted') {
        const options = {
          path: 'images',
          mediaType: 'video',
          videoQuality: 'high',
        };
        launchCamera(options, response => {
          if (response.didCancel != true) {
            dispatch(upload_videos(response));
            setVideos(previuos => {
              return [...previuos, ...response.assets];
            });
            createThumbnail({
              url: response.assets[0].uri,
              timeStamp: 100,
            }).then(response =>
              setVideoThumnail(previuos => {
                return [...previuos, response];
              }),
            );
          }

          setVisibleVideo(false);
          setVisible(false);
        });
      }
    }
  };

  const library_video = async () => {
    setVisible(false);
    const options = {
      path: 'images',
      mediaType: 'video',
    };
    launchImageLibrary(options, response => {
      if (response.didCancel != true) {
        console.log('caemra ', response);

        dispatch(upload_videos(response));
        setVideos(previuos => {
          return [...previuos, ...response.assets];
        });
        createThumbnail({
          url: response.assets[0].uri,
          timeStamp: 100,
        }).then(response =>
          setVideoThumnail(previuos => {
            return [...previuos, response];
          }),
        );
      }
      setVisibleVideo(false);
    });
  };

  // console.log("client_details ", video)

  return (
    <View style={styles.whole}>
      <VideoAndImage
        isVisible={mediaModal}
        message={error}
        onClose={() => setMediaModal(false)}
        onPress={() => setMediaModal(false)}
        videos={videos?.[index]?.uri}
        index={index}
        video_delete={video_delete}
      />
      <View style={styles.card}>
        <View style={{ marginBottom: verticalScale(10) }}>
          <AuthHeader title={'Add Details'} />
        </View>
        {/* <Video
            source={{ uri: videos[0].uri }}
            style={{ height: 200, width: '100%' }}
            resizeMode={'stretch'}
            paused={false}
            controls={true}
          /> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.addphoto}>
            <Text style={styles.textphoto}>Add Photos</Text>
            <Text style={styles.lorem}>
            Take a step back and take a photo of the crack from top to bottom. If exterior, take a step back to fully show the landscaping or concrete that may be in the way of repair.
            </Text>
          </View>

          <View style={styles.boxstyle}>
            {/* <View style={styles.box}></View> */}
            {images.map((item, index) => {
              return (
                <View key={index}>
                  <Image
                    key={index}
                    style={styles.box}
                    source={{ uri: item.uri }}
                  />
                  <AntDesign
                    onPress={() => Delete(item)}
                    style={styles.icon}
                    size={20}
                    color={'black'}
                    name="closecircleo"
                  />
                </View>
              );
            })}
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={styles.box}>
              <Image
                source={require('../../assets/images/plus.png')}
                style={{}}
              />
            </TouchableOpacity>
          </View>

          {/* <View style={styles.addvideo}>
            <Text style={styles.textphoto}>Add Videos</Text>
            <Text style={styles.lorem}>
            Take a step back and take a video of where the water is coming from.
            </Text>
          </View>

          <View style={styles.boxstyle}>
            { video_array.length != videoThumnail.length  ?
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <ActivityIndicator size={40} color={'black'} style={{ paddingHorizontal: 30 }} />
              </View>
              :
              videoThumnail.map((item, index) => {
                return (
                  <View
                    // onPress={() => {
                    //   setIndex(index), setMediaModal(true);
                    // }}
                    key={index}>
                    <Image
                      key={index}
                      style={styles.box}
                      source={{ uri: item.path }}
                    />
                    <AntDesign
                      onPress={() => video_delete(index)}
                      style={styles.icon}
                      size={20}
                      color={'black'}
                      name="closecircleo"
                    />
                  </View>
                );
              })
            }


            <TouchableOpacity
              onPress={() => setVisibleVideo(true)}
              style={styles.box}>
              <Image
                source={require('../../assets/images/plus.png')}
                style={{}}
              />
            </TouchableOpacity>
          </View> */}

          {/* {multipleImages.length == 2 && videos.length == 2 ? */}
          <CustomButton
            title={'Next'}
            style={{
              marginBottom: verticalScale(20),
              marginTop: verticalScale(40),
              height: verticalScale(50),
            }}
            onPress={() => {
              navigation.navigate('editdescription', {
                client_details,
                video,
                images,
                item
              });
            }}
          />
          {/* //   :
            //   <DisableButton title={'Next'} */}
          {/* //     style={{
            //       marginBottom: verticalScale(20),
            //       marginTop: verticalScale(40),
            //       height: verticalScale(50),
            //     }} />
            // } */}
        </ScrollView>
        {Platform.OS === 'android' ? (
          <View
            style={{
              width: '100%',
              height: verticalScale(80),
            }}></View>
        ) : <View
        style={{
          width: '100%',
          height: verticalScale(50),
        }}></View>}
      </View>
      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={openGallery}
        onCameraPress={openCamera}
      />
      <ImagePickerModal
        isVisible={visibleVideo}
        onClose={() => setVisibleVideo(false)}
        onImageLibraryPress={library_video}
        onCameraPress={camera_video}
      />
    </View>
  );
};

export default AddLeadEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  whole: {
    position: 'absolute',
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'flex-end',
  },

  card: {
    width: '100%',
    height:
      Platform.OS === 'android' ? windowHeight * 0.96 : windowHeight * 0.92,
    marginTop: scale(20),

    backgroundColor: Colors.white,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    paddingLeft: scale(20),
    paddingRight: scale(20),
    paddingTop: scale(5),
    paddingBottom: scale(30),
  },
  addphoto: {
    marginTop: verticalScale(40),
  },
  textphoto: {
    fontSize: moderateScale(27),
    color: Colors.black,
    fontFamily: Font.Lato700,
  },
  lorem: {
    lineHeight: verticalScale(16),
    color: 'rgba(0, 0, 0, 0.7)',
    fontFamily: Font.Lato400,
  },
  box: {
    backgroundColor: Colors.boxcolor,
    // height: verticalScale(75),
    aspectRatio: 1 / 1,
    width: scale(90),
    borderColor: 'red',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5%',
  },
  boxstyle: {
    marginTop: verticalScale(10),
    flexDirection: 'row',
    flexWrap: 'nowrap',

    // justifyContent: 'space-between',
  },
  addvideo: {
    marginTop: verticalScale(20),
  },
  icon: {
    position: 'absolute',
    zIndex: 99,
    backgroundColor: 'white',
    right: 5,
    borderRadius: 50,
    padding: 5,
    top: -10,
  },
});
