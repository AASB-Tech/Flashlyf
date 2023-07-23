"use client"

import React, { useState } from "react";
import Button from "@/shared/components/Button";
import { useRouter } from "next/navigation"; 
import api from "@/clientAPI/api.js";
import { usePageGaurd } from "@/shared/hooks/usePageGuard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export default function LoginForm() {

  const router = useRouter();

  //Redirect user to the home page if they are already logged in.
  usePageGaurd("/home", false);

  // Values of the email and password input boxes
  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: ""
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false)

  // Error message for the login form
  const [message, setMessage] = useState();

  //Login authorization code
  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = loginFormState;
    const response = await api.login(email, password);
    //Move user to dashboard upon succesfull login
    if (response?.success) {
      //Store the userID and username of the logged in user into the browser local storage.
      window.localStorage.setItem('loggedInUserID', response.data.user.id);
      window.localStorage.setItem('loggedInUsername', response.data.user.username);
      setMessage(null);
      router.push("/home");
    //Failed login. Show error message.
    } else {
      setMessage(response.message);
    }
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setLoginFormState({
        ...loginFormState,
        [e.target.name]: value
    });
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordVisibility(passwordVisibility === true ? false : true);
  }

  return (
    <>
          <form
            className="max-w-[90%]"
            action="#"
            onSubmit={handleSubmit}
          >
            <div className="text-dm text-dark flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[4px]">
                <div className="relative">
                  <FontAwesomeIcon
                    className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    icon={faEnvelope}
                    fontSize="30px"
                    style={{color: "#3734a6"}}
                  />
                  <input
                    className="pl-10 pm-10 h-[50px] text-black border-2 border-FFblue bg-white rounded-xl"  
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={loginFormState.email}
                    onChange={handleChange}
                    required
                  >
                  </input>
                </div>
              </div>

              <div className="flex flex-col gap-[4px]">
                <div className="relative">
                    <FontAwesomeIcon
                      className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2"
                      icon={faLock}
                      fontSize="30px"
                      style={{color: "#3734a6"}}
                    />
                    <input
                      className="pl-10 pm-10 h-[50px] text-black border-2 border-FFblue bg-white rounded-xl"
                      type={passwordVisibility ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={loginFormState.password}
                      onChange={handleChange}
                      required
                    >
                    </input>
                    <button onClick={togglePasswordVisibility}>
                      <FontAwesomeIcon
                        className="h-6 w-6 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
                        icon={passwordVisibility ? faEye : faEyeSlash }
                        fontSize="30px"
                        style={{color: "#3734a6"}}
                      />
                    </button>
                  </div>
              </div>
              {/* Error message */}
              {message ? <p className="mb-2 text-red-500">{message}</p> : null}
              <Button
                text="Login"
                link="#"
                type="submit"
                onclick={handleSubmit}
              />
            </div>
          </form>
    </>
  );
}
