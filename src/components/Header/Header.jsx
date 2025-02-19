import { useState, useEffect } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../../appwrite/auth";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const loadProfileImage = async () => {
      if (userData?.profilePic) {
        try {
          const imageUrl = await authService.getFilePreview(
            userData.profilePic
          );
          setProfileImageUrl(imageUrl);
        } catch (error) {
          console.error("Error loading profile image:", error);
        }
      }
    };

    loadProfileImage();
  }, [userData?.profilePic]);

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
    <header className="py-0.5 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <Container>
        <nav className="flex items-center justify-between h-9">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="block transform hover:scale-105 transition-transform duration-200"
            >
              <Logo width="90px" />
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link
                    to={item.slug}
                    className="gap-2.5 px-2.5 py-1 rounded-md text-[12px] font-medium text-gray-800 hover:text-orange-600 hover:bg-orange-50/80 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ) : null
            )}
          </ul>

          {/* Auth Section */}
          <div className="flex items-center gap-2">
            {authStatus ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center focus:outline-none focus:ring-2 focus:ring-orange-500/20 rounded-full group"
                >
                  <img
                    src={profileImageUrl || "/default-avatar.png"}
                    alt={userData?.name || "Profile"}
                    className="w-12 h-12 rounded-full object-cover border border-transparent group-hover:border-orange-400 transition-colors duration-200"
                  />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100 animate-fadeIn">
                    {/* User Info */}
                    <div className="px-3 py-1.5 border-b border-gray-100">
                      <p className="text-[12px] font-medium text-gray-800">
                        {userData?.name}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {userData?.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        to="/add-post"
                        className="flex items-center px-3 py-1.5 text-[12px] text-gray-800 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg
                          className="w-3 h-3 mr-2 text-gray-400"
                        />
                        Add Post
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center px-3 py-1.5 text-[12px] text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg
                          className="w-3 h-3 mr-2 text-gray-400"
                        />
                        Profile
                      </Link>
                    </div>

                    {/* Logout Button */}
                    <div className="border-t border-gray-100 mt-1">
                      <LogoutBtn className="flex w-full items-center px-3 py-1.5 text-[12px] text-red-500 hover:bg-red-50 transition-colors duration-150" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1 text-[12px] font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
