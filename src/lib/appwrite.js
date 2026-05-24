import { Client, Account, ID, TablesDB, Query } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("6a04171c0011ce7ababf");

export const account = new Account(client);
export const tablesDB = new TablesDB(client);

export const DATABASE_ID = "6a0421f70006ae3722a8";
export const USERS_TABLE_ID = "users";

export { ID, Query };