import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";

export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData) => {
    try {
      let imageUrl = null;
      const file = formData.get("profilePic");

      if (file instanceof File) {
        const fileId = await authService.uploadFile(file);
        if (fileId) {
          imageUrl = fileId;
        }
      }

      const updateData = {
        name: formData.get("name"),
        bio: formData.get("bio"),
        profilePic: imageUrl || formData.get("existingProfilePic"),
      };

      console.log("Sending update data:", updateData);
      const result = await authService.updateUserPrefs(updateData);
      console.log("Update result:", result);

      return result;
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  }
);

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = {
        ...action.payload.userData,
        ...action.payload.userData.prefs,
      };
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      if (action.payload) {
        state.userData = {
          ...state.userData,
          ...action.payload,
          ...action.payload.prefs,
          name: action.payload.name,
          bio: action.payload.bio,
          profilePic: action.payload.profilePic,
        };
      }
    });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
