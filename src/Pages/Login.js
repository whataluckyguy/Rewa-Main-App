import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { LinkedInApi } from "../config";
import axios from "axios";
import { LoginContext } from "./LoginContext";

function Login() {
  const [code, setCode] = useState(null);
  const context = useContext(LoginContext);

  const popUp = () => {
    const { clientId, redirectUrl, oauthUrl, scope, state } = LinkedInApi;
    const authUrl = `${oauthUrl}&client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUrl}`;

    const width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;
    window.open(
      authUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };

  const getUserCredentials = (code) => {
    axios
      .get(
        // "http://127.0.0.1:5000/api"
        `http://localhost:5000/api?code=${code}`
        // `${NodeServer.baseURL} + ${NodeServer.getUserCredentials}?code=${code}`
      )
      .then((res) => {
        const user = res.data;
        console.log("response: ", res.data);

        context.setUser(res.data);

        // this.setState({
        //   user,
        //   loaded: true,
        // });
        // Do something with user
      });
  };

  const handleCode = (passedCode) => {
    if (passedCode.data.type === "code") {
      setCode(passedCode.data.code);
      getUserCredentials(passedCode.data.code);
    }
    // alert(code);
  };

  useEffect(() => {
    if (window.opener && window.opener !== window) {
      const PopupUrl = new URL(window.location.href);
      const fetchedCode = PopupUrl.searchParams.get("code");
      window.opener.postMessage({ type: "code", code: fetchedCode }, "*");
      window.close();
    }
    window.addEventListener("message", handleCode);
  }, []);

  if (context.user !== null) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Login with LinkedIn</h2>
      <button onClick={popUp}>Login</button>
      <div>{code}</div>
    </div>
  );
}

export default Login;
