/* eslint-disable no-useless-catch */
import conf from "../conf/conf";
import { Client, Account, Storage, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  storage;

  constructor() {
    try {
      this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
      // Removed setSelfSigned as it's not needed anymore

      this.account = new Account(this.client);
      this.storage = new Storage(this.client);
    } catch (error) {
      console.error("Failed to initialize Appwrite client:", error);
      throw new Error("Service initialization failed");
    }
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // Login immediately after successful signup
        return await this.login({ email, password });
      }
    } catch (error) {
      console.error("Appwrite service error:", error);
      if (error?.code === 409) {
        throw new Error("Email already registered. Please login instead.");
      }
      throw new Error("Account creation failed. Please try again.");
    }
  }

  async login({ email, password }) {
    try {
      // Create new session without checking current session
      const session = await this.account.createEmailPasswordSession(email, password);

      if (session) {
        const userData = await this.account.get();
        return { userData, session };
      }

      throw new Error("Failed to create session");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("getCurrentUser error:", error);
      return null;
    }
  }

  async getCurrentUserDetails() {
    try {
      const user = await this.account.get();
      const prefs = await this.account.getPrefs();

      return {
        userId: user.$id,
        name: user.name,
        email: user.email,
        bio: prefs.bio || "",
        profilePic: prefs.profilePic || "",
        joinedDate: prefs.joinedDate,
        lastActivity: prefs.lastActivity,
        status: prefs.status,
      };
    } catch (error) {
      console.error("Get current user details error:", error);
      return null;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.error("Logout error:", error);
      return null;
    }
  }

  async updateUserPrefs(userData) {
    try {
      console.log("Updating prefs with:", userData);

      // Get current preferences first
      const currentUser = await this.getCurrentUser();
      const currentPrefs = currentUser.prefs || {};

      // Prepare new preferences
      const newPrefs = {
        ...currentPrefs,
        name: userData.name,
        bio: userData.bio || "",
        profilePic: userData.profilePic || currentPrefs.profilePic || "",
      };

      console.log("New prefs to be set:", newPrefs);

      // Update preferences in Appwrite
      const response = await this.account.updatePrefs(newPrefs);
      console.log("Appwrite update response:", response);

      // Return complete user data
      return {
        ...currentUser,
        name: userData.name,
        bio: userData.bio,
        profilePic: userData.profilePic || currentPrefs.profilePic,
        prefs: response,
      };
    } catch (error) {
      console.error("Update prefs error:", error);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      const response = await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      return response.$id;
    } catch (error) {
      throw error;
    }
  }

  async getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Get file preview error:", error);
      return null;
    }
  }

  async updateProfile(formData) {
    try {
      const userData = await this.account.get();
      let updatedData = { ...userData };

      // Update name if provided
      if (formData.get("name")) {
        await this.account.updateName(formData.get("name"));
        updatedData.name = formData.get("name");
      }

      // Handle profile picture upload
      if (formData.get("profilePic")) {
        // Delete existing profile picture if exists
        if (userData.profilePic) {
          try {
            await this.storage.deleteFile(
              conf.appwriteBucketId,
              userData.profilePic
            );
          } catch {
            console.log("No existing profile picture to delete");
          }
        }

        // Upload new profile picture
        const file = await this.storage.createFile(
          conf.appwriteBucketId,
          ID.unique(),
          formData.get("profilePic")
        );
        updatedData.profilePic = file.$id;
      }

      // Update preferences (bio)
      if (formData.get("bio")) {
        await this.account.updatePrefs({
          bio: formData.get("bio"),
        });
        updatedData.bio = formData.get("bio");
      }

      return updatedData;
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
