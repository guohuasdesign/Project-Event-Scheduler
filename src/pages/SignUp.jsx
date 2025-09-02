import React from "react";

const SignUp = () => {
  return (
    <div className="flex flex-col h-full w-full items-center mt-[100px] gap-[1rem]">
      <div className="flex flex-col items-left justify-center">
        <input
          className="input validator border-black text-black w-[20rem]"
          type="email"
          required
          placeholder="Email"
        />
        <div className="validator-hint hidden">Enter valid email address</div>
      </div>
      <div className="flex flex-col items-left justify-center">
        <input
          type="password"
          className="input validator border-black text-black mt-2 w-[20rem]"
          required
          placeholder="Password"
          minlength="8"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
        />
        <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />
          At least one number
          <br />
          At least one lowercase letter
          <br />
          At least one uppercase letter
        </p>
      </div>
      <button className="btn btn-neutral">Sign Up</button>
    </div>
  );
};

export default SignUp;
