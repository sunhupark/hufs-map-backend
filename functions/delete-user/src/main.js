import { Client, Users, Databases, Query } from "node-appwrite";

const APPWRITE_ENDPOINT =
  process.env.APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1";

const APPWRITE_PROJECT_ID =
  process.env.APPWRITE_PROJECT_ID || "6a04171c0011ce7ababf";

const APPWRITE_DATABASE_ID =
  process.env.APPWRITE_DATABASE_ID || "6a0421f70006ae3722a8";

const APPWRITE_USERS_COLLECTION_ID =
  process.env.APPWRITE_USERS_COLLECTION_ID || "users";

export default async ({ req, res, log, error }) => {
  try {
    log("delete-user function started");
    log(`raw body: ${req.body}`);

    const body = JSON.parse(req.body || "{}");
    const userId = body.userId;

    if (!userId) {
      return res.json(
        {
          success: false,
          message: "userId is required",
        },
        400
      );
    }

    const client = new Client()
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const users = new Users(client);
    const databases = new Databases(client);

    log(`received userId: ${userId}`);

    // 1. Auth > Users 계정 삭제
    await users.delete(userId);
    log(`Auth user deleted: ${userId}`);

    // 2. Database > users row 삭제
    // users 컬렉션 안에 userId 필드가 있는 경우
    const docs = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_USERS_COLLECTION_ID,
      [Query.equal("userId", userId)]
    );

    let deletedDocumentCount = 0;

    for (const doc of docs.documents) {
      await databases.deleteDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_USERS_COLLECTION_ID,
        doc.$id
      );

      deletedDocumentCount += 1;
      log(`users row deleted by query: ${doc.$id}`);
    }

    // 혹시 users 문서 ID 자체가 userId인 구조일 때 대비
    if (deletedDocumentCount === 0) {
      try {
        await databases.deleteDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_USERS_COLLECTION_ID,
          userId
        );

        deletedDocumentCount += 1;
        log(`users row deleted by documentId: ${userId}`);
      } catch (deleteDocError) {
        log(`users row not found by documentId: ${userId}`);
      }
    }

    return res.json(
      {
        success: true,
        message: "Auth user and users row deleted successfully",
        deletedUserId: userId,
        deletedDocumentCount,
      },
      200
    );
  } catch (err) {
    error(`delete-user error: ${err.message}`);

    return res.json(
      {
        success: false,
        message: err.message,
      },
      500
    );
  }
};
