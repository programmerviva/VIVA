import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";

const client = new Client();
client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

// Account instance banaiye current user ke details fetch karne ke liye
export const account = new Account(client);

export class Service {
  client = new Client();
  databases;
  storage;
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
    this.account = new Account(this.client);
  }

  // Helper function to create slug
  createSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, "-");
  }

  // Add helper method to get current user name
  async getCurrentUserName(userId) {
    try {
      const currentAccount = await this.account.get();
      // Only fetch prefs if it's the logged-in user
      if (currentAccount.$id === userId) {
        const prefs = await this.account.getPrefs();
        return prefs.name || currentAccount.name || "Unknown User";
      }
      return "Unknown User";
    } catch {
      return "Unknown User";
    }
  }

  async createPost({ title, content, featuredImage, status }) {
    try {
      // Get current user info
      const userData = await this.account.get();

      // Get user name from preferences or account
      const userPrefs = await this.account.getPrefs();
      const authorName = userPrefs.name || userData.name || "Unknown User";

      // Create slug from title
      const slug = this.createSlug(title);

      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          status,
          userId: userData.$id,
          authorName,
          slug,
          // Removed createdAt as it's not in the collection
        }
      );
    } catch (error) {
      console.error("createPost error: ", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error("Post update error:", error);
      throw error;
    }
  }

  async togglePostStatus(slug, currentStatus) {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          status: newStatus,
        }
      );
    } catch (error) {
      console.error("Status toggle error:", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );

      if (post) {
        post.authorName = await this.getCurrentUserName(post.userId);
      }

      return post;
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts() {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );

      // Add current author names to all posts
      const postsWithAuthors = await Promise.all(
        response.documents.map(async (post) => {
          post.authorName = await this.getCurrentUserName(post.userId);
          return post;
        })
      );

      response.documents = postsWithAuthors;
      return response;
    } catch (error) {
      console.log("getPosts error: ", error);
      return {
        documents: [], // Return empty array if error occurs
      };
    }
  }

  // Add a new method to fetch user information
  async getUser() {
    try {
      // First try to get from preferences
      const prefs = await this.account.getPrefs();
      if (prefs && prefs.name) {
        return {
          name: prefs.name,
          email: prefs.email,
        };
      }
      return { name: "Unknown User" };
    } catch (error) {
      console.error("getUser error: ", error);
      return { name: "Unknown User" };
    }
  }

  // Add a new method to fetch posts by user
  async getUserPosts(userId) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("userId", userId)]
      );

      return response;
    } catch (error) {
      console.log("getUserPosts error: ", error);
      return {
        documents: [],
      };
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("File upload error:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("File deletion error:", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      if (!fileId) return null;
      return this.storage.getFilePreview(
        conf.appwriteBucketId,
        fileId,
        2000, // width
        2000, // height
        "center",
        100 // quality
      );
    } catch (error) {
      console.error("File preview error:", error);
      return null;
    }
  }
}

const service = new Service();
export default service;
