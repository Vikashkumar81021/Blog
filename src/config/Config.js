const config={
    appwriteURL:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProject_ID:String(import.meta.env.VITE_PROJECT_ID),
    appwriteDatabase_ID:String(import.meta.env.VITE_DATABASE_ID),
    appwriteCollection_ID:String(import.meta.env.VITE_COLLECTION_ID),
    appwriteBucket_ID:String(import.meta.env.VITE_BUCKET_ID),

}

export default config