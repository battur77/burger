import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-c31b7-default-rtdb.firebaseio.com/",
});

export default instance;
