import axios from 'axios';
import config from '../config/env';

const API_URL = `${config.apiUrl}/rooms`;

const getRooms = () => {
  return axios.get(API_URL);
};

const roomService = {
  getRooms,
};

export default roomService; 