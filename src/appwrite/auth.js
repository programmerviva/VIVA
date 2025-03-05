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
        // Call login first to create a session
        return await this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      console.error("Appwrite service error:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      
      const session = await this.account.createEmailPasswordSession(email, password);

      if (!session) {
        throw new Error("Failed to create session");
      }

      // Get user details after successful login
      const userData = await this.account.get();
      return {
        session,
        userData,
      };
    } catch (error) {
      console.error("Login error:", error);
      if (error?.type === "user_invalid_credentials") {
        throw new Error("Invalid email or password");
      } else {
        throw new Error("Login failed. Please try again");
      }
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
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
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
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
