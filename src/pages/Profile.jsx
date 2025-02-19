import { Container } from "../components";
import ProfileCard from "../components/Profile/ProfileCard";

function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
              Your Profile
            </h1>
            <p className="text-gray-300/90 text-lg">
              Manage your account and preferences
            </p>
          </div>

          {/* Profile Card Container */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-600/30">
            <ProfileCard />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
