// src/pages/Profile.jsx
import { Container } from "../components";
import ProfileCard from "../components/Profile/ProfileCard";

function Profile() {
  return (
    <div className="py-8">
      <Container>
        <ProfileCard />
      </Container>
    </div>
  );
}

export default Profile;