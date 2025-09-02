import { useActionState, useState } from "react";
import { Link, Navigate } from "react-router";
import { toast } from "react-toastify";
import { validateSignIn } from "../utils";
import { useAuth } from "../context";
import { signIn } from "../data";

const SignIn = () => {
  const { handleSignIn, signedIn } = useAuth();

  const signinAction = async (prevState, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const validationErrors = validateSignIn({ email, password });
    if (Object.keys(validationErrors).length !== 0) {
      return { error: validationErrors, success: false };
    }
    try {
      toast.success("Welcome back");
      const signInRes = await signIn({ email, password });

      console.log(signInRes);
      handleSignIn(signInRes.token);

      return { error: null, success: true };
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
      return { error: null, success: false };
    }
  };
  const [state, formAction, isPending] = useActionState(signinAction, {
    error: null,
    success: false,
  });
  const [{ email, password }, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  if (signedIn) return <Navigate to="/" />;
  return (
    <form
      className="my-5 md:w-1/2 mx-auto flex flex-col gap-3 items-center"
      action={formAction}
    >
      <div className="flex flex-col h-full w-full items-center mt-[100px] gap-[1rem]">
        <div className="flex flex-col items-left justify-center">
          <input
            className="input validator border-black text-black w-[20rem]"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            placeholder="Email"
          />
          <div className="validator-hint hidden">Enter valid email address</div>
        </div>
        <div className="flex flex-col items-left justify-center">
          <input
            type="password"
            name="password"
            value={password}
            className="input validator border-black text-black mt-2 w-[20rem]"
            required
            onChange={handleChange}
            placeholder="Password"
            minlength="8"
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
          {/* <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />
          At least one number
          <br />
          At least one lowercase letter
          <br />
          At least one uppercase letter
        </p> */}
        </div>
        <p className="text-black text-[0.8rem]">
          Don't have an account?
          <Link to="/signup" className="text-blue-400 font-bold">
            &nbsp;Sign Up
          </Link>
        </p>
        <button className="btn btn-neutral" disabled={isPending}>
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignIn;
