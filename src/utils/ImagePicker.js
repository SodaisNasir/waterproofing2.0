import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

export const accessGallery = async () => {
  const options = {
    path: 'images',
    mediaType: 'photo',
    includeBase64: true,
  };

  const cameraResponse = await launchImageLibrary(options, response => {
    return response;
  });
  return cameraResponse;
};

export const accessCamera = async () => {
  const options = {
    path: 'images',
    mediaType: 'photo',
    includeBase64: true,
  };

  const cameraResponse = await launchCamera(options, response => {
    return response;
  });
  return cameraResponse;
};
export const accessVideoCamera = async () => {
  const options = {
    path: 'images',
    mediaType: 'video',
    includeBase64: true,
  };

  const cameraResponse = await launchCamera(options, response => {
    return response;
  });
  return cameraResponse;
};
