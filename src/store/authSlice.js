import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";

export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData) => {
    try {
      let imageUrl = null;
      const file = formData.get("profilePic");

      // Only upload if file exists and is a File object
      if (file instanceof File) {
        const uploadedFile = await authService.uploadFile(file);
        if (uploadedFile.$id) {
          imageUrl = uploadedFile.$id;
        }
      }

      // Prepare user data with existing profile pic if no new image
      const userData = {
        name: formData.get("name"),
        bio: formData.get("bio"),
        profilePic: imageUrl || formData.get("existingProfilePic"),
      };

      const updatedUser = await authService.updateUserPrefs(userData);
      return {
        ...updatedUser,
        profilePic: userData.profilePic,
      };
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  }
);

const initialState = {
  status: false,
  userData: {
    name: "",
    email: "",
    profilePic: "",
    bio: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (action.payload) {
          state.userData = {
            ...state.userData,
            ...action.payload,
          };
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        console.error("Profile update failed:", action.error);
      });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
