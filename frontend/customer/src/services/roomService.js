import axios from 'axios';

const API_URL = 'http://localhost:5000/api/rooms';

const getRooms = () => {
  return axios.get(API_URL);
};

const roomService = {
  getRooms,
};

export default roomService; 