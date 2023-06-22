import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    Dimensions,
    Platform,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
  import LinearGradient from 'react-native-linear-gradient';
  import Colors from '../components/Colors';
  import InputField from '../components/InputField';
  import CustomButton from '../components/CustomButton';
  import AuthHeader from '../components/header/AuthHeader';
  import NotificationModal from '../components/modals/NotificationModal';
  import { Font } from '../constants/Fonts';
  import { useForm } from 'react-hook-form';
  import {forgot_email} from '../redux/actions/AuthActionss';
  import { useDispatch, useSelector } from 'react-redux';
  import Validation from '../components/error/Validation';

  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;

  const ResetPassword = () => {
    return (
      <LinearGradient
        colors={['#302DDE', '#3633CA', '#EC42A0']}
        style={styles.container}>
        <StatusBar backgroundColor={Colors.trayColor} barStyle="light-content" />
        <Image
          source={require('../components/images/shade.png')}
          style={{
            width: '100%',
            height: verticalScale(300),
            resizeMode: 'cover',
            position: 'absolute',
          }}
        />
  
        <ResetEmail />
      </LinearGradient>
    );
  };



const ResetEmail = () => {
    return (
        <LinearGradient
          colors={['#302DDE', '#3633CA', '#EC42A0']}
          style={styles.container}>
          <StatusBar backgroundColor={Colors.trayColor} barStyle="light-content" />
          <Image
            source={require('../components/images/shade.png')}
            style={{
              width: '100%',
              height: verticalScale(300),
              resizeMode: 'cover',
              position: 'absolute',
            }}
          />
    
          <OTPScreenUi />
        </LinearGradient>
      );






        }

    const OTPScreenUi = () => {
        const dispatch = useDispatch()
        const loading = useSelector(state => state.is_loading)
        const data = useSelector(state => state.verify_email)
        const [visible, setVisible] = useState(false);
        const [showData, setShowData] = useState(false);
        const [show, setShow] = useState(false);
        const [myData,setMyData] = useState([])

    
    
        const {
          control,
          register,
          handleSubmit,
          formState: { errors, isValid },
        } = useForm({ mode: 'all' });
      
        const onSubmit = (data) => {
            dispatch(forgot_email(data,setMyData,setShowData,setShow))
        }
      
      
        return (
            <View style={styles.whole}>
              <View style={styles.card}>
                <NotificationModal
                  title={data?.message}
                  visible={visible}
                  onBackButtonPress={() => setVisible(false)}
                  onBackdropPress={() => setVisible(false)}
                  state={data?.status}
                />
                <AuthHeader title={'Find Email'} />
                <View style={{
                    flex: 1
                }} >
                  
              

                    <InputField
                    name="full_name"
                    control={control}
                    style={styles.inputField}
                    rules={{
                      required: 'Full Name is required',
                      pattern: {
                        message: 'Enter a valid Full name',
                      }
                    }}
                    image={require('../components/images/user.png')}
                    placeholder={'Full Name'}
                  />
                  {errors.full_name && (
                    <Validation title={errors.full_name.message} />
                  )}
        

<CustomButton
                    title={'Search'}
                    onPress={handleSubmit(onSubmit)}
                    loading={loading}
                    />
        
                  <View style={{
                    flex :1 ,
                    paddingTop: scale(10)
                  }}>
                    {
                        !show ?

   <FlatList 
                    data={myData}
                    renderItem={({item}) => (
                        <TouchableOpacity activeOpacity={0.5}>
                        <View style={styles.MainCard}>
                           
                            <View style={{
                               flex:1,
                                justifyContent: 'center',
                                paddingLeft: scale(10)
                            }}>
                                <Text style={{
                                    fontSize: moderateScale(16),
                                    color: 'black',
                                    fontFamily: Font.Lato700
                                }}>{item.first_name + ' ' + item.last_name}</Text>
                                <Text style={{
                                    fontSize: moderateScale(14),
                                    color: 'black',
                                    fontFamily: Font.Lato400
                                }}>{item.email}</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={() => {
                        return(
                            <View
                            style={{
                              height: scale(windowHeight / 2.5),
                              flex: 1,
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                            <Text style={{color: 'black',   fontFamily: Font.Lato400}}>
                                {showData == true ? 'No data found!' : 'Find Your Email.'}
                                </Text>
                          </View>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                    /> 

                    :

                    <View
                    style={{
                      height: scale(windowHeight / 2.5),
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                  <ActivityIndicator style={{ marginHorizontal: 20 }} size={'large'} color={'red'} />
                  </View>

                    }
                 
                  </View>
        
                  
                 
        
              
                 
                  {/* <ImageLogo /> */}
                </View>
              </View>
            </View>
          )
      };

   



      export default ResetEmail
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
        
          subheading: {
            color: Colors.black,
            fontSize: moderateScale(13),
            marginVertical: verticalScale(25),
            paddingHorizontal: scale(20),
            // backgroundColor: 'blue',
            textAlign: 'center',
            fontFamily: Font.Lato400,
          },
          inputField: {
            borderWidth: scale(1),
            borderColor: Colors.btnColor1,
            paddingLeft: scale(6),
            borderBottomColor: Colors.btnColor1,
            borderTopColor: Colors.btnColor1,
            height: verticalScale(45),
            // paddingVertical: 20,
            // borderTopWidth: 1,
          },
          error: {
            color: 'red',
            fontSize: 12,
            alignSelf: 'flex-start',
            // marginLeft: 25,
            marginTop: 5,
            fontFamily: 'Poppins-SemiBold',
          },
        MainCard:{
            height: verticalScale(55),
            marginBottom: scale(10),
            borderRadius: 14,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: Colors.btnColor1,
            overflow: 'hidden',
            marginHorizontal: scale(12)
        }
        });
