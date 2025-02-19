/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import conf from "../conf/conf";
import { Client, Account,Storage, ID } from 'appwrite'


export class AuthService {
  client = new Client();
  account;
  storage

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    this.storage = new Storage(this.client);
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
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
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

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }

  async updateUserPrefs(userData) {
    try {
      const response = await this.account.updatePrefs(userData);
      return response;
    } catch (error) {
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
}

const authService = new AuthService();

export default authService;
