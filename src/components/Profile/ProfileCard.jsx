import { useState } from "react";
import Container from "../../components/container/Container";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../../store/authSlice.js";
import Button from "../../components/Button.jsx";

function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData?.name || "",
      bio: userData?.bio || "",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("bio", data.bio);
    formData.append("existingProfilePic", userData?.profilePic || "");

    if (data.profilePic[0]) {
      formData.append("profilePic", data.profilePic[0]);
    }

    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="py-8">
      <Container>
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            {!isEditing ? (
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <img
                    src={userData?.profilePic || "/default-avatar.png"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-4">{userData?.name}</h2>
                <p className="text-gray-600 text-center mb-6">
                  {userData?.bio || "No bio added yet."}
                </p>
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Edit Profile
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <img
                      src={
                        previewImage ||
                        userData?.profilePic ||
                        "/default-avatar.png"
                      }
                      alt="Profile Preview"
                      className="w-32 h-32 rounded-full object-cover"
                    />
                    <input
                      type="file"
                      {...register("profilePic")}
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                    <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    {...register("bio")}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-center space-x-4">
                  <Button type="submit">Save Changes</Button>
                  <Button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 hover:bg-gray-600"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
