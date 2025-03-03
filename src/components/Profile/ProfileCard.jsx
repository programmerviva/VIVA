/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../../store/authSlice";
import { Button } from "..";
import authService from "../../appwrite/auth";

function ProfileCard() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: userData?.name || "",
      bio: userData?.bio || "",
      
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("bio", data.bio);

      if (data.profilePic?.[0]) {
        formData.append("profilePic", data.profilePic[0]);
      }

      await dispatch(updateUserProfile(formData)).unwrap();
      setIsEditing(false);
      setPreviewImage(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <img
            src={previewImage || authService.getFilePreview(userData?.profilePic)}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              {...register("profilePic")}
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          )}
        </div>
        <div className="w-full">
          <label className="block text-gray-100 dark:text-gray-200">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            disabled={!isEditing}
            className="w-full px-4 py-2 text-white mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full">
          <label className="block text-gray-100 dark:text-gray-200">Bio</label>
          <textarea
            {...register("bio")}
            disabled={!isEditing}
            className="w-full px-4 text-white py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        {isEditing ? (
          <>
            <Button
              type="button"
              onClick={() => {
                setIsEditing(false);
                reset();
                setPreviewImage(null);
              }}
              className="bg-gray-500"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </>
        ) : (
          <Button type="button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>
    </form>
  );
}

export default ProfileCard;
