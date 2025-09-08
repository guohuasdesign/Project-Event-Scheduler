import { signUp } from "../data";
import { validateSignUp } from "../utils";
import { useNavigate } from "react-router-dom";
import { useActionState, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const signUpAction = async (prevState, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const validationErrors = validateSignUp({ email, password });
    if (Object.keys(validationErrors).length !== 0) {
      return { error: validationErrors, success: false };
    }
    try {
      const signUpRes = await signUp({ email, password });
      console.log(signUpRes);
      navigate("/signin");
      return { error: null, success: true };
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
      return { error: null, success: false };
    }
  };
  const [state, formAction, isPending] = useActionState(signUpAction, {
    error: null,
    success: false,
  });
  const [{ email, password }, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <form
      className="my-5 md:w-1/2 mx-auto flex flex-col gap-3 items-center"
      action={formAction}
    >
      <div className="flex flex-col h-full w-full items-center mt-[60px] gap-[1rem]">
        <div className="text-black font-semibold text-2xl mb-2">Sign Up</div>

        <div className="flex flex-col items-left justify-center">
          <input
            className="input border-black text-black w-[20rem]"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
          />
          {state.error?.email && (
            <p className="text-red-500 text-sm mt-1">{state.error?.email}</p>
          )}
        </div>
        <div className="flex flex-col items-left justify-center">
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="input border-black text-black mt-2 w-[20rem]"
            placeholder="Password"
          />
          {state.error?.password && (
            <p className="text-red-500 text-sm mt-1">{state.error?.password}</p>
          )}
        </div>
        <p className="text-black text-[0.8rem]">
          Already have an account?
          <Link to="/signin" className="text-black text-[0.9rem] font-bold">
            &nbsp;Sign In
          </Link>
        </p>
        <button className="btn btn-neutral" disabled={isPending}>
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUp;
