import axios from "axios";

/* export default axios.create({
  baseURL: "http://localhost:8080/api",
    headers: {
    "Content-type": "application/json"
  }
}); */

export default axios.create({
  baseURL: "http://10.60.19.38:8081/api",
  headers: {
    "Content-type": "application/json"
  }
});