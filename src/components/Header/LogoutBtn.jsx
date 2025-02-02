import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-bock px-6 py-2 bg-orange-600 duration-200 hover:bg-blue-100 hover:text-gray-950 rounded-full ml-2"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
