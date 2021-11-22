import { AsyncStorage } from 'react-native';

export const baseUrl = () => {
  return 'http://api.bluekola.com';
};

export const storeToken = async (selectedValue) => {
  try {
    await AsyncStorage.setItem('token', selectedValue);

  } catch (error) {
    console.warn('AsyncStorage error: ' + error.message);
  }
}

export const storeEmail = async ( email) => {
  try {
    await AsyncStorage.setItem('user_email', email);
  } catch (error) {
    console.warn('AsyncStorage error: ' + error.message);
  }
}

export const storeTenantType = async (tenantType) => {
  try {
    await AsyncStorage.setItem('tenant_type', tenantType);
  } catch (error) {
    console.warn('AsyncStorage error: ' + error.message);
  }
}


export const storeRefresh = async ( refresh_token) => {
  try {
    await AsyncStorage.setItem('refresh_token', refresh_token);
  } catch (error) {
    console.warn('AsyncStorage error: ' + error.message);
  }
}

export const isInitialLaunch = async (selectedValue, email) => {
  let isInitialLaunch = await AsyncStorage.getItem('isInitialLaunch');
  return isInitialLaunch;
}

export const initialLaunch = async () => {
  try {
    await AsyncStorage.setItem('isInitialLaunch', 'true');
  } catch (error) {
    console.warn('AsyncStorage error: ' + error.message);
  }
}

export const getToken = async () => {
  let token = await AsyncStorage.getItem('token')
  return token
};

export const getRefreshToken = async () => {
  let token = await AsyncStorage.getItem('refresh_token')
  return token
};
export const getEmail = async () => {
  let user_email = await AsyncStorage.getItem('user_email')
  return  user_email
};

export const getRole = async () => {
  let tenant_type = await AsyncStorage.getItem('tenant_type')
  return tenant_type
};

export const getUser = async () => {
  let user_email = await AsyncStorage.getItem('user')
  return  user_email
};

export const removeToken = async (selectedValue, email) => {
  try {
    // await AsyncStorage.removeItem('token');
    // await AsyncStorage.removeItem('user_email');
    await AsyncStorage.clear();
  } catch (error) {
    console.warn('AsyncStorage remove token error: ' + error.message);
  }
}


export const getLogout = () => {
  try {
    AsyncStorage.clear()
    return true;
  }
  catch (exception) {
    return false;
  }
};

export const makeUrlStringFromObject = (data) => {
  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
   formBody = formBody.join("&");
  return formBody;
};

export const processResponse = (response) =>  {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]).then(res => ({
    statusCode: res[0],
    data: res[1]
  }));
}


export const getRememberMe = async () => {
  return AsyncStorage.getItem('rem_me')
};



export const storeUsername = async ( email) => {
  try {
    await AsyncStorage.setItem('user_name', email);
  } catch (error) {
    console.warn('AsyncStorage error: ' + error.message);
  }
}
export const getUsername = async () => {
  let user_name = await AsyncStorage.getItem('user_name')
  return  user_name
};