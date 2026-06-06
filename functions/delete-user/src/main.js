import { Client, Users, TablesDB, Query } from "node-appwrite";

export default async ({ req, res, log, error }) => {
  try {
    const endpoint = process.env.APPWRITE_ENDPOINT;
    const projectId = process.env.APPWRITE_PROJECT_ID;
    const apiKey = process.env.APPWRITE_API_KEY;
    const databaseId = process.env.APPWRITE_DATABASE_ID;
    const usersTableId = process.env.APPWRITE_USERS_TABLE_ID;

    if (!endpoint || !projectId || !apiKey || !databaseId || !usersTableId) {
      return res.json(
        {
          ok: false,
          message: "Function environment variables are missing.",
        },
        500
      );
    }

    const payload = req.bodyJson || JSON.parse(req.body || "{}");
    const { userId } = payload;

    if (!userId) {
      return res.json(
        {
          ok: false,
          message: "userId is required.",
        },
        400
      );
    }

    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId)
      .setKey(apiKey);

    const users = new Users(client);
    const tablesDB = new TablesDB(client);

    const userRowsResult = await tablesDB.listRows({
      databaseId,
      tableId: usersTableId,
      queries: [Query.equal("authUserId", userId)],
    });

    const rows = userRowsResult.rows || userRowsResult.documents || [];

    if (rows.length > 0) {
      const userRow = rows[0];

      await tablesDB.updateRow({
        databaseId,
        tableId: usersTableId,
        rowId: userRow.$id,
        data: {
          deleted: true,
          deletedAt: new Date().toISOString(),
        },
      });
    }

    try {
      await users.deleteSessions({
        userId,
      });
    } catch (sessionError) {
      log("deleteSessions failed or no sessions: " + sessionError.message);
    }

    await users.delete({
      userId,
    });

    return res.json({
      ok: true,
      message: "User deleted successfully.",
    });
  } catch (err) {
    error(err.message);

    return res.json(
      {
        ok: false,
        message: err.message,
      },
      500
    );
  }
};