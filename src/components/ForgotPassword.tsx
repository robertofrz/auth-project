import { useState } from "react";
import { passwordReset } from "../firebase/auth";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage("");

    if (!validateEmail(e.target.value)) {
      setErrorMessage("Please enter a valid email address.");
    }

    setEmail(e.target.value);
  }

  function validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setMessage("");
      setErrorMessage("");
      setLoading(true);
      await passwordReset(email);
      setMessage(
        "If an account with this email exists, you'll receive a password reset link."
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="m-auto w-[90vw] sm:w-96   rounded-lg p-4 flex flex-col justify-evenly h-140 bg-white shadow-xl shadow-gray-400 items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-evenly w-full h-[90%] p-2"
      >
        <legend className="text-3xl font-medium uppercase text-gray-700">
          Reset Password
        </legend>
        {errorMessage && (
          <div className="border border-red-500 w-full p-2 rounded-sm text-gray-500">
            {errorMessage}
          </div>
        )}
        {message && (
          <div className="border border-green-600 w-full p-2 rounded-sm text-gray-500">
            {message}
          </div>
        )}
        <div className="flex flex-col justify-center -mt-6 w-full h-[70%]">
          <label htmlFor="email" className="text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            required
            onChange={handleInputChange}
            className="border border-gray-300 rounded-sm p-1 mb-4 w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white rounded-sm p-2 w-full cursor-pointer shadow shadow-gray-500 hover:bg-red-500 hover:-translate-y-0.5  active:bg-red-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-red-600 focus:ring-opacity-50 transform transition"
          >
            {loading ? "Sending..." : "Continue"}
          </button>
        </div>
      </form>
      <Link
        to="/login"
        className="text-gray-400 underline hover:text-gray-300 active:text-gray-500"
      >
        Login
      </Link>
    </div>
  );
}

export default ForgotPassword;
