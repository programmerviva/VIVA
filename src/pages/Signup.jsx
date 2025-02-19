import { Signup as SignupComponent } from "../components";

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-full max-w-md">
        <SignupComponent />
      </div>
    </div>
  );
}

export default Signup;
