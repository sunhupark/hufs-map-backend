import { Client, Account, ID, TablesDB, Databases, Storage, Query } from "appwrite";

// =================================================================
// 1. [동료 프로젝트] 로그인 및 기본 회원 관리 설정
// =================================================================
const loginClient = new Client();
loginClient
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("6a04171c0011ce7ababf");

// 동료가 프론트엔드 로그인 기능에서 사용하는 변수들
export const account = new Account(loginClient);
export const tablesDB = new TablesDB(loginClient);
export const DATABASE_ID = "6a0421f70006ae3722a8";
export const USERS_TABLE_ID = "users";


// =================================================================
// 2. [회원님 프로젝트] 게시판 및 파일 업로드(Storage) 설정
// =================================================================
const boardClient = new Client();
boardClient
  .setEndpoint("https://cloud.appwrite.io/v1") // 회원님의 Appwrite 엔드포인트
  .setProject("6a0bd3c70007637f5038");        // 회원님의 실제 프로젝트 ID

// 회원님이 만든 게시판 기능에서 사용하는 변수들
export const databases = new Databases(boardClient);
export const storage = new Storage(boardClient);


// =================================================================
// 3. 공통 유틸리티 내보내기 및 기본 내보내기(default)
// =================================================================
export { ID, Query };

// 기본 클라이언트는 메인으로 쓰일 회원님의 boardClient를 내보냅니다.
export default boardClient;
