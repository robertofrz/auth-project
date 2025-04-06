import { JSX, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { signUp, logInWithGoogle } from "../firebase/auth";
import { Link, Navigate } from "react-router-dom";

function SignUp(): JSX.Element {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { id, value } = e.target;

    setErrorMessage("");

    if (id === "email") {
      setEmail(value);

      if (!validateEmail(value)) {
        setErrorMessage("Please enter a valid email address.");
      }
    } else if (id === "password") {
      setPassword(value);

      if (!validatePassword(value)) {
        setErrorMessage(
          "Password must be at least 6 characters long and contain a number."
        );
      }
    } else if (id === "confirm-password") {
      setConfirmPassword(value);
      if (value !== password) {
        setErrorMessage("Passwords do not match.");
      }
    }
  }

  function validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  function validatePassword(password: string): boolean {
    const passwordPattern = /^(?=.*[0-9]).{6,}$/;
    return passwordPattern.test(password);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!isSigningUp) {
      setIsSigningUp(true);
      await signUp(email, password).finally(() => setIsSigningUp(false));
    }
  }

  async function onGoogleSignIn(
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    e.preventDefault();
    if (!isSigningUp) {
      setIsSigningUp(true);
      await logInWithGoogle().catch((err: unknown) => {
        setIsSigningUp(false);
        setErrorMessage(
          "Something went wrong while trying to sign up with Google. Please try again."
        );
        console.log(err);
      });
    }
  }

  return (
    <div className="m-auto w-[90vw] sm:w-96  rounded-lg p-4 flex flex-col justify-evenly h-140 bg-white shadow-xl shadow-gray-400">
      <div className="flex flex-col items-center justify-evenly h-full ">
        {userLoggedIn && <Navigate to={"/home"} replace={true} />}
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-start justify-evenly w-full h-[90%] p-2"
        >
          <legend className="text-3xl font-medium uppercase text-gray-700">
            Sign Up
          </legend>
          {errorMessage && (
            <div className="border border-red-500 p-2 rounded-sm w-full text-gray-500">
              {errorMessage}
            </div>
          )}
          <label htmlFor="email" className="text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            required
            onChange={handleInputChange}
            className="border border-gray-300 rounded-sm p-1 -mt-4  w-full"
          />
          <label htmlFor="password" className="text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            required
            onChange={handleInputChange}
            className="border border-gray-300 rounded-sm p-1 -mt-4 w-full"
          />
          <label htmlFor="confirm-password" className="text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            required
            onChange={handleInputChange}
            className="border border-gray-300 rounded-sm p-1 -mt-4 mb-4 w-full"
          />
          <button
            type="submit"
            disabled={isSigningUp}
            className="bg-red-600 text-white rounded-sm mb-2 p-2 w-full cursor-pointer shadow shadow-gray-500 hover:bg-red-500 hover:-translate-y-0.5  active:bg-red-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-red-600 focus:ring-opacity-50 transform transition"
          >
            {isSigningUp ? "Signing Up..." : "Continue"}
          </button>
          <div className="flex items-center w-full ">
            <hr className="flex-grow border-t border-gray-300 m-0" />
            <span className=" text-gray-400 border border-gray-300 px-2 rounded-sm">
              OR
            </span>
            <hr className="flex-grow border-t border-gray-300 m-0" />
          </div>
          <button
            disabled={isSigningUp}
            onClick={(e) => onGoogleSignIn(e)}
            className="cursor-pointer self-center mt-2"
          >
            <img
              src="/google-icon.png"
              alt="google icon"
              className="shadow shadow-gray-400 rounded-sm hover:-translate-y-0.5 transform transition"
            />
          </button>
        </form>
        <div className="text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline hover:text-gray-300  active:text-gray-500"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
