import { useState, useEffect } from "react";
const axios = require("axios").default;

export default function useApplicationData() {
  axios.defaults.withCredentials = true;
  const [state, setState] = useState({
    redirect: false,
    loggedIn: false,
    userData: {}
  });

  useEffect(() => {
    axios.get("http://localhost:9000/api/login/")
    .then(res => {
      if (res.data.loggedIn) {
        setState({...state, loggedIn: true, userData: res.data.user});
      }
    })
  },[]);

  const loginUser = function(user) {
    return axios.post("http://localhost:9000/api/login/", user )
    .then (res => {
      if (!res.data) {
        return false;
      }
      setState({...state, userData: res.data, redirect: true, loggedIn: true})
    })

  }

  const logoutUser = function() {
    return axios.post("http://localhost:9000/api/login/logout")
    .then(res => {
      setState({...state, loggedIn: false, userData: {}, redirect: false});
    })
  }

  return { state, logoutUser, loginUser }
}