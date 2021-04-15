import { useState, useEffect } from "react";
const axios = require("axios").default;

export default function useApplicationData() {
  const [state, setState] = useState( {
    loggedIn: false
  });

  useEffect(() => {
    axios.get("http://localhost:9000/api/login/")
    .then(res => {
      if (res.data.loggedIn) {
        setState({...state, loggedIn: true});
      }
    })
  },[])

  const logout = function() {
    axios.post("http://localhost:9000/api/login/logout")
    .then(res => {
      setState({...state, loggedIn: true});
    })
  }

  return { state, logout }
}