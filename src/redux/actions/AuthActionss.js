import { base_Url, token } from '../../constants/BaseURl';
import {
  CHANGE_PASSWORD,
  DELETE_IMAGES,
  DELETE_VIDEOS,
  FILTER_IMAGES,
  FILTER_VIDEOS,
  GET_ALL_LEAD,
  GET_DASHBOARD_DATA,
  GET_IMAGES,
  GET_VIDEOS,
  IS_LOADING,
  LEAD_GENERATE,
  NOTIFICATION_TOKEN,
  OTP_SEND,
  RANDOM_NUMBER,
  SLIDER_DATA,
  UPDATE_LEAD,
  UPDATE_PASSWORD,
  UPDATE_PROFILE,
  USER_DETAILS,
  USER_ID,
  VERIFY_EMAIL,
} from '../CartItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CreateAccountApi = (data, navigation, setModalVisible) => {
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });

    try {
      let base_url = `${base_Url}/register_otp.php`;
      let checkEmail = new FormData();
      checkEmail.append('email', data.email);
      checkEmail.append('token', token);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        navigation.navigate('signupotp', { data });
        await dispatch({ type: OTP_SEND, payload: responseData.data.OTP });
        await dispatch({ type: IS_LOADING, payload: false });
        //
      } else {
        await dispatch({ type: IS_LOADING, payload: false });
        await dispatch({ type: VERIFY_EMAIL, payload: responseData });
        setModalVisible(true);
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
    }
  };
};

export const register = (data, notification_token, navigation) => {
  return async dispatch => {
    await dispatch({
      type: IS_LOADING,
      payload: true,
    });

    try {
      let base_url = `${base_Url}/register.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      checkEmail.append('fname', data.firstName);
      checkEmail.append('lname', data.lastName);
      checkEmail.append('email', data.email);
      checkEmail.append('phone', data.phone);
      checkEmail.append('address', data.address);
      checkEmail.append('city', data.city);
      checkEmail.append('zipcode', data.zipcode);
      checkEmail.append('password', data.password);
      checkEmail.append('notification_token', notification_token);

      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();

      console.log("ponka", responseData);

      if (responseData.status === true) {
        const loginToken = responseData.data.user_id;

        navigation.navigate('loginscreen');
        // const userDetail = JSON.stringify(responseData);
        // await AsyncStorage.setItem('user_details', userDetail);
        // await dispatch({ type: USER_DETAILS, payload: responseData.data });
        // await dispatch({ type: USER_ID, payload: loginToken });
        await dispatch({ type: IS_LOADING, payload: false });
      } else {
        alert(responseData.message);
        await dispatch({ type: IS_LOADING, payload: false });
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
      console.log('error', error);
    }
  };
};

export const sign_in = (email, password, setVisible, notification_token) => {
  return async dispatch => {
    await dispatch({
      type: IS_LOADING,
      payload: true,
    });
    try {
      let base_url = `${base_Url}/login.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      checkEmail.append('email', email);
      checkEmail.append('password', password);
      checkEmail.append('notification_token', notification_token);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        const loginToken = responseData.data.user_id;
        const userDetail = JSON.stringify(responseData.data);
        await AsyncStorage.setItem('user_details', userDetail);
        await dispatch({ type: USER_DETAILS, payload: responseData.data });
        await dispatch({ type: USER_ID, payload: loginToken });
        await dispatch({ type: IS_LOADING, payload: false });
      } else {
        await dispatch({ type: USER_DETAILS, payload: responseData });
        await dispatch({ type: IS_LOADING, payload: false });
        setVisible(true);
      }
    } catch (error) {
      setVisible(true);
      console.log('error', error);
    }
    await dispatch({ type: IS_LOADING, payload: false });
  };
};

export const new_password = (email, navigation, setVisible) => {
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });
    try {
      let base_url = `${base_Url}/reset_password.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      checkEmail.append('email', email);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      console.log('responseData ', responseData);
      if (responseData.status === true) {
        navigation.navigate('otpscreen', { email });
        await dispatch({ type: OTP_SEND, payload: responseData.data.OTP });

        await dispatch({ type: IS_LOADING, payload: false });
      } else {
        await dispatch({ type: VERIFY_EMAIL, payload: responseData });
        await dispatch({ type: IS_LOADING, payload: false });
        setVisible(true);
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
      console.log('error', error);
    }
  };
};

export const resend_otp = (email, setCounter) => {
  console.log(email);
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });
    try {
      let base_url = `${base_Url}/reset_password.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      checkEmail.append('email', email);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      console.log('responseData ', responseData);
      if (responseData.status === true) {
        await dispatch({ type: OTP_SEND, payload: responseData.data.OTP });
        await dispatch({ type: IS_LOADING, payload: false });
        setCounter(50);
      } else {
        await dispatch({ type: VERIFY_EMAIL, payload: responseData });
        await dispatch({ type: IS_LOADING, payload: false });
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
      console.log('error', error);
    }
  };
};

export const register_otp = (data, setCounter) => {
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });

    try {
      let base_url = `${base_Url}/register_otp.php`;
      let checkEmail = new FormData();
      checkEmail.append('email', data.email);
      checkEmail.append('token', token);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        await dispatch({ type: OTP_SEND, payload: responseData.data.OTP });
        await dispatch({ type: IS_LOADING, payload: false });
        setCounter(50);
        //
      } else {
        await dispatch({ type: IS_LOADING, payload: false });
        await dispatch({ type: VERIFY_EMAIL, payload: responseData });
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
    }
  };
};

export const update_password = (email, password, setVisible, navigation) => {
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });
    try {
      let base_url = `${base_Url}/new_password.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      checkEmail.append('email', email);
      checkEmail.append('password', password);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        await dispatch({ type: UPDATE_PASSWORD, payload: responseData });
        await dispatch({ type: IS_LOADING, payload: false });
        setVisible(true);
        setTimeout(() => {
          navigation.navigate('loginscreen');
          setVisible(false);
        }, 1000);
      } else {
        await dispatch({ type: UPDATE_PASSWORD, payload: responseData });
        await dispatch({ type: IS_LOADING, payload: false });
        setVisible(true);
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
      console.log('error', error);
    }
  };
};

export const add_lead = (
  client_details,
  user_id,
  navigation,
  description,
  setVisible,
  video,
  images,
  reset,
) => {
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });
    const new_video = await video.map(item => item.fileName);
    const new_image = await images.map(item => item.fileName);
    try {
      let base_url = `${base_Url}/add_lead.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      checkEmail.append('user_id', user_id);
      checkEmail.append('firstname', client_details.client_details.fname);
      checkEmail.append('lastname', client_details.client_details.lname);
      checkEmail.append(
        'address_of_property',
        client_details.client_details.address,
      );
      checkEmail.append('city_of_property', client_details.client_details.city);
      checkEmail.append(
        'state_of_property',
        client_details.client_details.state,
      );
      checkEmail.append('zipcode', client_details.client_details.zipcode);
      checkEmail.append('email_of_client', client_details.client_details.email);
      checkEmail.append(
        'phone_number_of_client',
        client_details.client_details.phone,
      );
      checkEmail.append(
        'alternative_number_of_client',
        client_details.client_details.alternativenumber,
      );
      checkEmail.append('no_of_clients', client_details.client_details.issue);
      checkEmail.append('sin_number', client_details.client_details.sinnumber);
      checkEmail.append('description', description ? description : '');
      checkEmail.append('videos', JSON.stringify(new_video));
      checkEmail.append('images', JSON.stringify(new_image));
      const response = await fetch(base_url, {
        method: 'POST',
        body: checkEmail,
      });

      const responseData = await response.json();
      if (responseData.status === true) {
        await dispatch({ type: RANDOM_NUMBER, payload: Math.random() });

        await dispatch({ type: DELETE_IMAGES, payload: [] });
        await dispatch({ type: DELETE_VIDEOS, payload: [] });
        await dispatch({ type: LEAD_GENERATE, payload: responseData });
        await dispatch({ type: IS_LOADING, payload: false });
        setVisible(true);
        setTimeout(() => {
          navigation.navigate('welcome');
          setVisible(false);
        }, 500);
        client_details.reset();
      } else {
        await dispatch({ type: LEAD_GENERATE, payload: responseData });
        await dispatch({ type: IS_LOADING, payload: false });
        setVisible(true);
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
      console.log('error', error);
    }
  };
};

export const edit_lead = (
  client_details,
  user_id,
  navigation,
  description,
  setVisible,
  video,
  images,
  item,
) => {
  return async dispatch => {
    console.log(
      'item 123456789',
      client_details,
      user_id,
      navigation,
      description,
      setVisible,
      video,
      images,
      item,
    );

    await dispatch({ type: IS_LOADING, payload: true });
    const new_video = await video.map(item => item.fileName);
    const new_image = await images.map(item => item.fileName);
    try {
      let base_url = `${base_Url}/update_lead.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      checkEmail.append('user_id', user_id);
      checkEmail.append('id', item.lead_id);
      checkEmail.append('first_name', client_details.client_details.fname);
      checkEmail.append('last_name', client_details.client_details.lname);
      checkEmail.append(
        'address_of_Property',
        client_details.client_details.address,
      );
      checkEmail.append('city_of_property', client_details.client_details.city);
      checkEmail.append(
        'state_of_property',
        client_details.client_details.state,
      );
      checkEmail.append('zip_code', client_details.client_details.zipcode);
      checkEmail.append('email_of_client', client_details.client_details.email);
      checkEmail.append(
        'phone_number_of_client',
        client_details.client_details.phone,
      );
      checkEmail.append(
        'alternative_number_of_client',
        client_details.client_details.alternativenumber,
      );
      checkEmail.append('no_of_issues', client_details.client_details.issue);
      checkEmail.append('sin_number', client_details.client_details.sinnumber);
      checkEmail.append('description', description ? description : '');
      checkEmail.append('video_one', JSON.stringify(new_video));
      checkEmail.append('img_one', JSON.stringify(new_image));
      const response = await fetch(base_url, {
        method: 'POST',
        body: checkEmail,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        await dispatch({ type: DELETE_IMAGES, payload: [] });
        await dispatch({ type: DELETE_VIDEOS, payload: [] });
        await dispatch({ type: LEAD_GENERATE, payload: responseData });
        await dispatch({ type: IS_LOADING, payload: false });
        setVisible(true);
        setTimeout(() => {
          navigation.navigate('wallet');
          setVisible(false);
        }, 800);
      } else {
        await dispatch({ type: LEAD_GENERATE, payload: responseData });
        await dispatch({ type: IS_LOADING, payload: false });
        setVisible(true);
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
      console.log('error', error);
    }
  };
};

export const change_password = (data, user_id, setVisible, navigation) => {
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });
    try {
      let base_url = `${base_Url}/update_password.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      checkEmail.append('id', user_id);
      checkEmail.append('password', data.currentpassword);
      checkEmail.append('new_password', data.newpassword);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        await dispatch({ type: CHANGE_PASSWORD, payload: responseData });
        await dispatch({ type: IS_LOADING, payload: false });
        setVisible(true);
        setTimeout(() => {
          navigation.goBack();
          setVisible(false);
        }, 1500);
      } else {
        await dispatch({ type: CHANGE_PASSWORD, payload: responseData });
        await dispatch({ type: IS_LOADING, payload: false });
        setVisible(true);
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
      console.log('error', error);
    }
  };
};

export const edit_profile = (data, user_id, setVisible) => {
  return async dispatch => {
    await dispatch({
      type: IS_LOADING,
      payload: true,
    });
    try {
      let base_url = `${base_Url}/update_profile.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      checkEmail.append('id', user_id);
      checkEmail.append('first_name', data.fname);
      checkEmail.append('last_name', data.lname);
      checkEmail.append('email', data.email);
      checkEmail.append('phone', data.phone);
      checkEmail.append('address', data.address);
      checkEmail.append('city', data.city);
      checkEmail.append('zip_code', data.zipcode);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        const userDetail = JSON.stringify(responseData.data);
        await AsyncStorage.setItem('user_details', userDetail);
        await dispatch({ type: USER_DETAILS, payload: responseData.data });
        await dispatch({ type: UPDATE_PROFILE, payload: responseData });
        await dispatch({ type: IS_LOADING, payload: false });
        setVisible(true);
      } else {
        await dispatch({ type: UPDATE_PROFILE, payload: responseData });
        await dispatch({ type: IS_LOADING, payload: false });
        setVisible(true);
      }
    } catch (error) {
      setVisible(true);
      console.log('error', error);
    }
    await dispatch({ type: IS_LOADING, payload: false });
  };
};

export const get_all_lead = (user_id, setFilteredDataSource) => {
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });
    try {
      let base_url = `${base_Url}/all_lead.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      checkEmail.append('id', user_id);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        console.log('laraib ===========',responseData.data)
        await dispatch({ type: GET_ALL_LEAD, payload: responseData.data});
        await dispatch({ type: IS_LOADING, payload: false });
        setFilteredDataSource(responseData.data.reverse());
      } else {
        await dispatch({ type: GET_ALL_LEAD, payload: responseData });
        await dispatch({ type: IS_LOADING, payload: false });
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
      alert(error.message);
    }
  };
};

export const get_dashboard_data = user_id => {
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });
    try {
      let base_url = `${base_Url}/get_dashboard_data.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      checkEmail.append('user_id', user_id);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      console.log('responseData dashobard ', responseData);
      if (responseData.status === true) {
        await dispatch({ type: GET_DASHBOARD_DATA, payload: responseData });
        await dispatch({ type: IS_LOADING, payload: false });
      } else {
        await dispatch({ type: GET_DASHBOARD_DATA, payload: responseData });
        await dispatch({ type: IS_LOADING, payload: false });
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
      alert(error.message);
    }
  };
};

export const upload_images = image_response => {
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });
    try {
      let base_url = `${base_Url}/uploadImages.php`;
      let checkEmail = new FormData();
      checkEmail.append('fileName', image_response.assets[0].fileName);
      checkEmail.append('token', token);
      checkEmail.append('images[]', {
        name: image_response.assets[0].fileName,
        uri: image_response.assets[0].uri,
        type: image_response.assets[0].type,
      });
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        await dispatch({ type: GET_IMAGES, payload: responseData.data_images });
        await dispatch({ type: IS_LOADING, payload: false });
      } else {
        await dispatch({ type: GET_IMAGES, payload: responseData.data_videos });
        await dispatch({ type: IS_LOADING, payload: false });
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
      alert(console.log(error));
    }
  };
};

export const upload_videos = video_response => {
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });
    try {
      let base_url = `${base_Url}/uploadvideos.php`;
      let checkEmail = new FormData();
      checkEmail.append('fileName', video_response.assets[0].fileName);
      checkEmail.append('token', token);
      checkEmail.append('videos[]', {
        name: video_response.assets[0].fileName,
        uri: video_response.assets[0].uri,
        type: video_response.assets[0].type,
      });
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        console.log('responseData ', responseData);

        await dispatch({ type: GET_VIDEOS, payload: responseData.data_videos });
        await dispatch({ type: IS_LOADING, payload: false });
      } else {
        await dispatch({ type: GET_VIDEOS, payload: responseData.data_videos });
        await dispatch({ type: IS_LOADING, payload: false });
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
      // alert('there was some error while uploading video');
      console.log(error);
    }
  };
};

export const delete_videos = video_response => {
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });
    try {
      let base_url = `${base_Url}/deleteall_files.php`;
      let checkEmail = new FormData();
      checkEmail.append('filename[]', video_response.fileName);
      checkEmail.append('token', token);
      checkEmail.append('isImage', 'no');
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        await dispatch({ type: FILTER_VIDEOS, payload: video_response.fileName });
        await dispatch({ type: IS_LOADING, payload: false });
      } else {
        await dispatch({ type: FILTER_VIDEOS, payload: video_response.fileName });
        await dispatch({ type: IS_LOADING, payload: false });
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
      console.log(error);
    }
  };
};
export const delete_images = video_response => {
  console.log(video_response.fileName);
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });
    try {
      let base_url = `${base_Url}/deleteall_files.php`;
      let checkEmail = new FormData();
      checkEmail.append('filename[]', video_response.fileName);
      checkEmail.append('token', token);
      checkEmail.append('isImage', 'yes');
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        await dispatch({ type: FILTER_IMAGES, payload: video_response.fileName });
        await dispatch({ type: IS_LOADING, payload: false });
      } else {
        await dispatch({
          type: FILTER_IMAGES,
          payload: responseData.data_videos,
        });
        await dispatch({ type: IS_LOADING, payload: false });
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
      alert(error.message);
    }
  };
};

export const get_notification = () => {
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });
    try {
      const value = await AsyncStorage.getItem('onesignaltoken');
      if (value !== null) {
        await dispatch({ type: IS_LOADING, payload: false });
        await dispatch({ type: NOTIFICATION_TOKEN, payload: value });
      }
    } catch (e) {
      await dispatch({ type: IS_LOADING, payload: false });
    }
    await dispatch({ type: IS_LOADING, payload: false });
  };
};

export const log_out = user_id => {
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });
    try {
      let base_url = `${base_Url}/logout.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      checkEmail.append('id', user_id);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      console.log('responseData ', responseData);
      if (responseData.status === true) {
        await dispatch({ type: IS_LOADING, payload: false });
      } else {
        await dispatch({ type: IS_LOADING, payload: false });
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
      console.log('error', error);
    }
  };
};

export const slider_data = () => {
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });
    try {
      let base_url = `${base_Url}/get_sliders.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        await dispatch({ type: SLIDER_DATA, payload: responseData.data });
        await dispatch({ type: IS_LOADING, payload: false });
      } else {
        await dispatch({ type: SLIDER_DATA, payload: responseData.data });
        await dispatch({ type: IS_LOADING, payload: false });
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
      console.log('error', error);
    }
  };
};

export const delete_account = user_id => {
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });
    try {
      let base_url = `${base_Url}/delete_user.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      checkEmail.append('user_id', user_id);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        await AsyncStorage.setItem('face_id', "" + false);
        dispatch({
          type: USER_DETAILS,
          payload: {}
        })
        dispatch({
          type: USER_ID,
          payload: null
        })
        await dispatch({ type: IS_LOADING, payload: false });
      } else {
        await dispatch({ type: IS_LOADING, payload: false });
      }
    } catch (error) {
      await dispatch({ type: IS_LOADING, payload: false });
      console.log('error', error);
    }
  };
};

export const forgot_email =  (data,setMyData,setShowData,setShow) => {
  return async dispatch => {
    await dispatch({ type: IS_LOADING, payload: true });
    setShow(true)
  try {
  let base_url =  `${base_Url}/search_emails.php`;
  let myData = new FormData()
  
  myData.append('token',token)
  myData.append('searched_name',data.full_name)
  
  
    const response = await fetch(base_url,{
      method: 'POST',
      body: myData
    })

    const responseData = await response.json()

    if(responseData.status == true){
      
      console.log('responseData', responseData)
      setMyData(responseData.data)
      await dispatch({ type: IS_LOADING, payload: false });
      setShow(false)
    }else{
      console.log('first')
      setShowData(true)
      await dispatch({ type: IS_LOADING, payload: false });
      setShow(false)
    }

    
  } catch (error) {
    console.log('error', error)
    await dispatch({ type: IS_LOADING, payload: false });
    setShow(false)
  }
}
}