import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { signOutUser } from "../firebase/auth";

function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOutUser();
    navigate("/login", { replace: true });
  }

  return (
    <div className="m-auto w-[90vw] sm:w-96   rounded-lg p-4 flex flex-col justify-evenly h-140 bg-white shadow-xl shadow-gray-400 items-center">
      <h1 className="text-3xl font-medium uppercase text-gray-700">Profile</h1>
      <p className="text-gray-500 text-xl w-4/5 text-center">
        Hello{" "}
        {currentUser?.displayName
          ? currentUser.displayName
          : currentUser?.email}
        , you are now logged in.
      </p>
      <button
        onClick={handleSignOut}
        className="bg-red-600 text-white rounded-sm p-2 w-full cursor-pointer shadow shadow-gray-500 hover:bg-red-500 hover:-translate-y-0.5  active:bg-red-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-red-600 focus:ring-opacity-50 transform transition"
      >
        Sign Out
      </button>
    </div>
  );
}

export default Home;
