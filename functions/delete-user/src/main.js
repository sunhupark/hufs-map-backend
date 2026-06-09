import { Client, Users, TablesDB, Query } from "node-appwrite";

export default async ({ req, res, log, error }) => {
  log("DELETE_USER_VERSION_20260609_FINAL");

  try {
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY || req.headers["x-appwrite-key"]);

    const users = new Users(client);
    const tablesDB = new TablesDB(client);

    const databaseId = process.env.APPWRITE_DATABASE_ID;
    const usersTableId = process.env.APPWRITE_USERS_TABLE_ID;

    const body =
      req.bodyJson ||
      (req.bodyText ? JSON.parse(req.bodyText) : {});

    const userId =
      body.userId ||
      req.headers["x-hufs-user-id"];

    log(`raw bodyText: ${req.bodyText || ""}`);
    log(`parsed userId: ${userId}`);

    if (!userId) {
      error("userId is missing");
      return res.json({ ok: false, message: "userId is missing" }, 400);
    }

    try {
      await tablesDB.deleteRow({
        databaseId,
        tableId: usersTableId,
        rowId: userId,
      });

      log(`users row deleted by rowId=${userId}`);
    } catch (rowIdDeleteError) {
      log(`delete by rowId failed: ${rowIdDeleteError.message}`);

      const result = await tablesDB.listRows({
        databaseId,
        tableId: usersTableId,
        queries: [Query.equal("authUserId", userId), Query.limit(1)],
      });

      const row = result.rows?.[0];

      if (row) {
        await tablesDB.deleteRow({
          databaseId,
          tableId: usersTableId,
          rowId: row.$id,
        });

        log(`users row deleted by authUserId=${userId}, rowId=${row.$id}`);
      } else {
        log(`users row not found for authUserId=${userId}`);
      }
    }

    await users.delete({ userId });

    log(`Auth user deleted for userId=${userId}`);

    return res.json({
      ok: true,
      message: "User deleted successfully",
      userId,
    });
  } catch (err) {
    error(`delete-user failed: ${err.message}`);

    return res.json({
      ok: false,
      message: err.message,
    }, 500);
  }
};
