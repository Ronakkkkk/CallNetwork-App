import axios from 'axios';
import {getAuth} from '@react-native-firebase/auth';

const axiosInstance = axios.create({
  baseURL: 'https://growing-arriving-dory.ngrok-free.app/api/v1',
});
axiosInstance.interceptors.request.use(async function (config) {
  const idToken = await getAuth().currentUser?.getIdToken();
  config.headers.Authorization = `firebase ${idToken}`;
  return config;
});

export {axiosInstance as axios};
