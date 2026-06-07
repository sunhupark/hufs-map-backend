import {
  account,
  tablesDB,
  Query,
  DATABASE_ID,
  USERS_TABLE_ID,
} from "./appwrite";

export const getCurrentUserRow = async () => {
  const currentUser = await account.get();

  const result = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: USERS_TABLE_ID,
    queries: [Query.equal("authUserId", currentUser.$id)],
  });

  const rows = result.rows || result.documents || [];

  if (rows.length === 0) {
    throw new Error("사용자 정보를 찾을 수 없습니다.");
  }

  return rows[0];
};
export const updateFavoriteBuildings = async (buildingKey) => {
  const userRow = await getCurrentUserRow();
  const currentFavorites = userRow.favoriteBuildings || [];

  const nextFavorites = currentFavorites.includes(buildingKey)
    ? currentFavorites.filter((building) => building !== buildingKey)
    : [...currentFavorites, buildingKey];

  return tablesDB.updateRow({
    databaseId: DATABASE_ID,
    tableId: USERS_TABLE_ID,
    rowId: userRow.$id,
    data: {
      favoriteBuildings: nextFavorites,
    },
  });
};
export const getMyProfile = async () => {
  const userRow = await getCurrentUserRow();

  return {
    email: userRow.email,
    username: userRow.username,
    nickname: userRow.nickname,
    favoriteBuildings: userRow.favoriteBuildings || [],
    deleted: userRow.deleted || false,
  };
};