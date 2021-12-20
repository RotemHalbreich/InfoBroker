import axios from 'axios';

export default axios.create({
  baseURL: "https://infobroker.herokuapp.com/api"
  
});