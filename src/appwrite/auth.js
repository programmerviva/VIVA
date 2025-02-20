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
      const session = await this.account.createEmailPasswordSession(email, password);
      if (!session) {
        throw new Error("Failed to create session");
      }

      const userData = await this.account.get();
      if (!userData) {
        throw new Error("Failed to get user data");
      }

      return {
        userData,
        session,
      };
    } catch (error) {
      console.error("Login error:", error);
      if (error?.code === 401) {
        throw new Error("Invalid email or password");
      }
      throw new Error("Login failed. Please try again.");
    }
  }

  async getCurrentUser() {
    try {
      const userData = await this.account.get();
      return userData;
    } catch (error) {
      console.error("Get current user error:", error);
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
      await this.account.deleteSession("current");
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
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

  // Add method to get file preview
  async getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Get file preview error:", error);
      return null;
    }
  }
}

const authService = new AuthService();

export default authService;
