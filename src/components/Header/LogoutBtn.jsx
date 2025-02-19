/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn({ className = "" }) {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center
        px-4 py-2
        text-sm font-medium
        text-red-600 hover:text-red-700
        bg-transparent hover:bg-red-50
        rounded-md
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
        ${className}
      `.trim()}
      onClick={logoutHandler}
    >
      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
          clipRule="evenodd"
        />
      </svg>
      Logout
    </button>
  );
}

export default LogoutBtn;
