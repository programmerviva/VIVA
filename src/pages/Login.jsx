import { Login as LoginComponent } from "../components";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-full max-w-md">
        <LoginComponent />
      </div>
    </div>
  );
}

export default Login;
