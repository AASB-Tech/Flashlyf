"use client";

import React, { useState } from "react";
import Button from "@/shared/components/Button";
import { useRouter } from "next/navigation";
import api from "@/clientAPI/api.js";
import PopUp from "./PopUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";

export default function SignUpForm() {
  const router = useRouter();
  // Values of the email, username, and password input boxes
  const [registerFormState, setRegisterFormState] = useState({
    email: "",
    username: "",
    password: ""
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false)

  const [success, setSuccess] = useState(false);
  // Error message for the login form
  const [message, setMessage] = useState();

  // Registration logic
  async function handleSubmit(e) {
    e.preventDefault();
    const { email, username, password } = registerFormState;
    const response = await api.register(email, username, password);
    if (response) {
      if (response.errors[0]?.message == "A user with that username already exists.") {
        setMessage("Sorry, that username already exists, please try a different username.");
      } else if (response.errors[0]?.message == "User with this email address already exists.") {
        setMessage("Sorry, that email already exists, please use a different email.");
      } else if (response.success) {
        setSuccess(true);
      } else {
        setMessage(response.message);
      }
    } else {
      setMessage(
        "Something went wrong. We apologize for the inconvenience. Please try again, or contact us for assistance."
      );
    }
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setRegisterFormState({
      ...registerFormState,
      [e.target.name]: value
    });
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordVisibility(passwordVisibility === true ? false : true);
  }

  return (
    <>
      {success ? <PopUp /> : null}
      <form
        className="max-w-[90%]"
        action="#"
        onSubmit={handleSubmit}
      >
        <div className="text-dm text-dark flex flex-col gap-[24px] w-full">
          <div className="flex flex-col gap-[4px]">
            <div className="relative">
              <FontAwesomeIcon
                className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                icon={faCircleUser}
                fontSize="30px"
                style={{color: "#3734a6"}}
              />
              <input
                  className="pl-10 pm-10 h-[50px] text-black border-2 border-FFblue bg-white rounded-xl"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={registerFormState.username}
                  onChange={handleChange}
                  required
                ></input>
            </div>      
          </div>

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
                value={registerFormState.email}
                onChange={handleChange}
                required
              ></input>
            </div>
          </div>

          <div className="flex flex-col gap-[4px]">
            <div className="relative">
              <FontAwesomeIcon
                className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                icon={faLock}
                fontSize="30px"
                style={{color: "#3734a6"}}
              />
              <input
                className="pl-10 pm-10 h-[50px] text-black border-2 border-FFblue bg-white rounded-xl"
                type={passwordVisibility ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={registerFormState.password}
                onChange={handleChange}
                required
              ></input>
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
            text="Sign Up"
            link="#"
            type="submit"
            onclick={handleSubmit}
          />
        </div>
      </form>
    </>
  );
}
