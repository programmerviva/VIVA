import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
 
function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  // return (
  //   <header className="py-3 shadow bg-gray-900 text-white">
  //     <Container>
  //       <nav className="flex">
  //         <div className="mr-4">
  //           <Link to="/">
  //             <Logo width="70px"  />
  //           </Link>
  //         </div>
  //         <ul className="flex ml-auto ">
  //           {navItems.map((item) =>
  //             item.active ? (
  //               <li key={item.name}>
  //                 <button
  //                   onClick={() => navigate(item.slug)}
  //                   className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-gray-900 rounded-full"
  //                 >
  //                   {item.name}
  //                 </button>
  //               </li>
  //             ) : null
  //           )}
  //           {authStatus && (
  //             <li>
  //               <LogoutBtn />
  //             </li>
  //           )}
  //         </ul>
  //       </nav>
  //     </Container>
  //   </header>
  // );

return (
  <header className="py-3 shadow bg-gray-900 text-white">
    <Container>
      <nav className="flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <Logo width="70px" />
          </Link>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex w-full lg:w-auto mt-4 lg:mt-0`}
        >
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name} className="mb-2 lg:mb-0">
                <button
                  onClick={() => navigate(item.slug)}
                  className="w-full lg:w-auto inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-gray-900 rounded-full"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </Container>
  </header>
);

}

export default Header;
