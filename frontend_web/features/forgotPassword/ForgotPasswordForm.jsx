"use client"

import React, { useEffect, useState } from "react";
import Button from "@/shared/components/Button";
import api from "@/clientAPI/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
export default function ForgotPasswordForm() {

  // Values of the email and password input boxes
  const [passwordResetFormState, setPasswordResetFormState] = useState({
    email: "",
  });

  // Disable the password reset button for 30 seconds after its been clicked to prevent spam
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // Used to show how many seconds is left until the button becomes enabled again
  const [secondsLeft, setSecondsLeft] = useState(0);


  // Response message for the reset password form
  const [message, setMessage] = useState();

  useEffect(() => {
    let timer;
    if (isButtonDisabled) {
        // Decrease count by 1 every second
      timer = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isButtonDisabled]);

  //Reset password handler
  async function handleSubmit(e) {
    e.preventDefault();
    setSecondsLeft(30);
    setIsButtonDisabled(true);
    // Enable the button again after 30 seconds
    setTimeout(() => {
        setIsButtonDisabled(false);
    }, 30000); // 30 seconds in milliseconds
    const { email } = loginFormState;
    const response = await api.resetPassword(email);
    setMessage(response.message);
    if (response?.success) {
    
    }
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setPasswordResetFormState({
        ...passwordResetFormState,
        [e.target.name]: value
    });
  };

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
                    value={passwordResetFormState.email}
                    onChange={handleChange}
                    required
                  >
                  </input>
                </div>
              </div>

              {/* Response message */}
              {message ? <p className="mb-2 text-red-500">{message}</p> : null}
              <Button
                text="Reset my password"
                link="#"
                type="submit"
                isDisabled={isButtonDisabled}
                onclick={handleSubmit}
              />
              {isButtonDisabled ? (
                <p className="text-gray-600 text-sm">
                    Didn't get your password reset email? <br />You can try again in {secondsLeft} seconds.
                </p>
              ) : 
              null
              }
            </div>
          </form>
    </>
  );
}
