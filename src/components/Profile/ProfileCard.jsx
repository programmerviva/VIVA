import { useState, useEffect } from "react";
import Container from "../../components/container/Container";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../../store/authSlice.js";
import Button from "../../components/Button.jsx";
import authService from "../../appwrite/auth";

function ProfileCard() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    console.log("Current userData:", userData);
  }, [userData]);

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData?.name || "",
      bio: userData?.bio || "",
    },
  });

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name,
        bio: userData.bio,
      });
    }
  }, [userData, reset]);

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
    console.log("Form data:", data);
    const formData = new FormData();

    // Ensure all fields are included
    formData.append("name", data.name || userData?.name || "");
    formData.append("bio", data.bio || userData?.bio || "");
    formData.append("existingProfilePic", userData?.profilePic || "");

    if (data.profilePic?.[0]) {
      formData.append("profilePic", data.profilePic[0]);
    }

    try {
      const result = await dispatch(updateUserProfile(formData)).unwrap();
      console.log("Update result:", result);

      // Reset form with new values
      reset({
        name: result.name,
        bio: result.bio,
      });

      setIsEditing(false);
      setPreviewImage(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <img
                    src={
                      previewImage || profileImageUrl || "/default-avatar.png"
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                  {isEditing && (
                    <>
                      <input
                        type="file"
                        {...register("profilePic")}
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                      />
                      <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 pt-20 pb-8">
              {!isEditing ? (
                <div className="text-center space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {userData?.name}
                    </h2>
                    <p className="mt-3 text-gray-600 max-w-lg mx-auto">
                      {userData?.bio || "No bio added yet."}
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    Edit Profile
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 max-w-md mx-auto"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Tell us about yourself"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-4">
                    <Button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 transition-all"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ProfileCard;
