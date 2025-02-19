import { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex gap-4 items-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link to={item.slug}>{item.name}</Link>
                </li>
              ) : null
            )}
            {authStatus ? (
              <li className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center"
                >
                  <img
                    src={userData?.profilePic || "/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/add-post"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Add Post
                    </Link>
                    <LogoutBtn className="block w-full text-left px-4 py-2 hover:bg-gray-100" />
                  </div>
                )}
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
