"use client"

import React, { useState } from "react";
import Button from "@/shared/components/Button";
import { useRouter } from "next/navigation"; 
import api from "@/clientAPI/api.js";
import { usePageGaurd } from "@/shared/hooks/usePageGuard";

const LoginForm = () => {

  const router = useRouter();

  //Redirect user to the home page if they are already logged in.
  usePageGaurd("/home", false);

  // Values of the email and password input boxes
  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: ""
  });

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

  return (
    <>
          <form
            className="w-full"
            action="#"
            onSubmit={handleSubmit}
          >
            <div className="text-dm text-dark flex flex-col gap-[24px] w-full">
              <div className="flex flex-col gap-[4px]">
                <label htmlFor="email">
                  <b>Email</b>
                </label>
                <input
                  className="h-[50px] p-4 border-[1px] border-[#7E7E7E] rounded-[7.5px] bg-transparent"
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  value={loginFormState.email}
                  onChange={handleChange}
                  required
                ></input>
              </div>

              <div className="flex flex-col gap-[4px]">
                <label htmlFor="password">
                  <b>Password</b>
                </label>
                <input
                  className="h-[50px] p-4 border-[1px] border-[#7E7E7E] rounded-[7.5px] bg-transparent"
                  type="password"
                  placeholder="Enter your Password"
                  name="password"
                  value={loginFormState.password}
                  onChange={handleChange}
                  required
                ></input>
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
};

export default LoginForm;
