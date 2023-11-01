import config from "../config/Config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  Client = new Client();
  Databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProject_ID);
    this.Databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createpost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.Databases.createDocument(
        config.appwriteDatabase_ID,
        config.appwriteCollection_ID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("appWRITE service :: createpost:: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.Databases.updateDocument(
        config.appwriteCollection_ID,
        config.appwriteDatabase_ID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("appwrite service :: updatepost::error", error);
    }

  }
  async deletePost(slug){
    try {
        await this.Databases.deleteDocument(
            config.appwriteDatabase_ID,
            config.appwriteCollection_ID,
            slug
        )
        return true
    } catch (error) {
        console.log("appwrite service ::deletePost:: error",error);
        return false
    }
  }
  async getPost(slug){
    try {
        return await this.Databases.getDocument(
            config.appwriteDatabase_ID,
            config.appwriteCollection_ID,
            slug
        )
    } catch (error) {
        console.log('AppWrite service ::getPost :: error',error);
        return false
    }
  }
  async getPosts(queries=[Query.equal("status","active")]){
   try {
    return await this.Databases.listDocuments(
        config.appwriteDatabase_ID,
        config.appwriteCollection_ID,
        queries,
    )
   } catch (error) {
    console.log('AppWrite service :: getPosts :: error',error);
    return false
    
   }
  }
  //FILE UPLOAD SERVICE
  async uploadFile(file){
    try {
        return await this.bucket.createFile(
            config.appwriteBucket_ID,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log('AppWrite service :: uploadFile ::error',error);
    }
  }
  async deleteFile(fileId){
  try {
    await this.bucket.deleteFile(
        config.appwriteBucket_ID,
        fileId
    )
    return true
  } catch (error) {
    console.log('AppWrite service :: deletefile ::error',error);
    return false
  }
  }
  getFilePreview(fileId){
    return this.bucket.getFilePreview(
        config.appwriteBucket_ID,
        fileId,
    )
  }
}

const service = new Service();
export default service;
