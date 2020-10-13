import { AsyncStorage } from 'react-native';


export const getToken = async () => {
  return AsyncStorage.getItem('auth')
};
export const getFmc = async () => {
  return AsyncStorage.getItem('blfcmToken')
};

export const processResponse = (response) =>  {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]).then(res => ({
    statusCode: res[0],
    data: res[1]
  }));
}

export const makeOrderId = (length) => {
  var result = '';
  var characters = '9876543210123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

