"use client";

import React, { useState } from "react";
import Button from "@/shared/components/Button";
import { useRouter } from "next/navigation";
import api from "@/clientAPI/api.js";
import PopUp from "./PopUp";

export default function SignUpForm() {
  const router = useRouter();
  // Values of the email, username, and password input boxes
  const [registerFormState, setRegisterFormState] = useState({
    email: "",
    username: "",
    password: ""
  });

  const [success, setSuccess] = useState(false);
  //Error message for the login form
  const [message, setMessage] = useState();

  //Registration logic
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

  return (
    <>
      {success ? <PopUp /> : null}
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
              placeholder="Enter Email"
              name="email"
              value={registerFormState.email}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="flex flex-col gap-[4px]">
            <label htmlFor="username">
              <b>Username</b>
            </label>
            <input
              className="h-[50px] p-4 border-[1px] border-[#7E7E7E] rounded-[7.5px] bg-transparent"
              type="text"
              placeholder="Enter Username"
              name="username"
              value={registerFormState.username}
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
              placeholder="Enter Password"
              name="password"
              value={registerFormState.password}
              onChange={handleChange}
              required
            ></input>
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
