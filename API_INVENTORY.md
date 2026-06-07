# API Inventory

This project currently uses two external API surfaces:

- Appwrite Cloud through the Appwrite JavaScript SDK
- Kakao Maps JavaScript SDK

No direct `fetch` or `axios` calls were found in `src`.

## Appwrite

Client setup: `src/lib/appwrite.js`

| Item | Value |
| --- | --- |
| SDK package | `appwrite` `^25.0.0` |
| Endpoint | `https://nyc.cloud.appwrite.io/v1` |
| Project ID | `6a04171c0011ce7ababf` |
| Database ID | `6a0421f70006ae3722a8` |
| Users table ID | `users` |
| Exported clients | `account`, `tablesDB` |
| Exported helpers | `ID`, `Query` |

### Account APIs

| API | File | Purpose |
| --- | --- | --- |
| `account.get()` | `src/pages/LandingPage.jsx:11` | Check whether the current user is logged in. |
| `account.get()` | `src/pages/MyPage.jsx:11` | Load current user profile for My Page. |
| `account.get()` | `src/pages/SignupPage.jsx:158` | Get the authenticated Appwrite user after email OTP verification. |
| `account.deleteSession({ sessionId: "current" })` | `src/pages/LandingPage.jsx:25` | Log out from the landing page. |
| `account.deleteSession({ sessionId: "current" })` | `src/pages/LoginPage.jsx:52` | Clear any existing session before login. |
| `account.deleteSession({ sessionId: "current" })` | `src/pages/MyPage.jsx:25` | Log out from My Page. |
| `account.deleteSession({ sessionId: "current" })` | `src/pages/SignupPage.jsx:42` | Clear existing session before sending email OTP. |
| `account.deleteSession({ sessionId: "current" })` | `src/pages/SignupPage.jsx:78` | Clear existing session before verifying OTP. |
| `account.deleteSession({ sessionId: "current" })` | `src/pages/SignupPage.jsx:180` | Log out after signup completes. |
| `account.createEmailPasswordSession({ email, password })` | `src/pages/LoginPage.jsx:59` | Login with email and password. |
| `account.createEmailToken({ userId, email, phrase: false })` | `src/pages/SignupPage.jsx:49` | Send signup email OTP. |
| `account.createSession({ userId, secret })` | `src/pages/SignupPage.jsx:85` | Verify signup OTP and create a temporary session. |
| `account.updateName({ name })` | `src/pages/SignupPage.jsx:160` | Save nickname as Appwrite account name. |
| `account.updatePassword({ password })` | `src/pages/SignupPage.jsx:164` | Set password after email OTP signup. |
| `account.createRecovery({ email, url })` | `src/pages/ForgotPasswordPage.jsx:16` | Send password recovery email. |
| `account.updateRecovery({ userId, secret, password })` | `src/pages/ResetPasswordPage.jsx:36` | Complete password reset from recovery link. |

### TablesDB APIs

| API | File | Purpose |
| --- | --- | --- |
| `tablesDB.listRows({ databaseId, tableId, queries })` | `src/pages/LoginPage.jsx:35` | If login input is a username, look up the matching email in the `users` table. |
| `tablesDB.listRows({ databaseId, tableId, queries })` | `src/pages/SignupPage.jsx:110` | Check whether a username already exists. |
| `tablesDB.createRow({ databaseId, tableId, rowId, data })` | `src/pages/SignupPage.jsx:168` | Create the app-level user profile row after signup. |

### Users Table Fields Used

The frontend writes or reads these fields from the `users` table:

| Field | Used for |
| --- | --- |
| `email` | Login email lookup and profile row creation. |
| `username` | Username login and duplicate check. |
| `nickname` | App profile nickname. |
| `authUserId` | Link to the Appwrite account user ID. |

## Kakao Maps

Main usage: `src/pages/MapPage.jsx`

| Item | Value |
| --- | --- |
| SDK URL | `https://dapi.kakao.com/v2/maps/sdk.js?appkey=...&autoload=false` |
| API key source in `.env` | `VITE_KAKAO_MAP_KEY` |
| API key source actually used | Hardcoded in `src/pages/MapPage.jsx:68` |
| Script injection | `src/pages/MapPage.jsx:140` |
| Script URL assignment | `src/pages/MapPage.jsx:142` |

### Kakao SDK Objects Used

| API/Object | Purpose |
| --- | --- |
| `window.kakao.maps.load()` | Initialize map after SDK load. |
| `new window.kakao.maps.LatLng(lat, lng)` | Create map center and marker coordinates. |
| `new window.kakao.maps.Map(element, options)` | Render the campus map. |
| `new window.kakao.maps.Marker({ position })` | Add building markers. |
| `new window.kakao.maps.InfoWindow({ content })` | Show building labels on marker hover. |
| `window.kakao.maps.event.addListener(...)` | Handle marker hover, marker click, and map click events. |

## Notes And Risks

- The Kakao key exists in `.env`, but `MapPage.jsx` uses a hardcoded key instead of `import.meta.env.VITE_KAKAO_MAP_KEY`.
- `ForgotPasswordPage.jsx` hardcodes the recovery URL as `http://localhost:5173/reset-password`, so password reset links will break after deployment unless changed to an environment-based URL.
- The repo contains mojibake/broken Korean text in several JSX files. It does not change the API list, but it may affect UI readability.
- `SignupPage.jsx` has visible JSX text corruption around headings/placeholders; check compile output before deploying.
---

## 3. 건물 즐겨찾기 저장 방식

건물 즐겨찾기 기능은 별도 Collection을 생성하지 않고, `users` 컬렉션에 배열 필드를 추가하여 관리한다. 프론트엔드 구현의 단순성과 마이페이지 연동 편의성을 고려하여 `users.favoriteBuildings` 방식을 사용한다.

### users 컬렉션 추가 필드

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| favoriteBuildings | string[] | no | [] | 사용자가 즐겨찾기한 건물 key 목록 |

### 저장 예시

{
  "favoriteBuildings": ["library", "engineering", "dormitory"]
}

### 건물 key 예시

| Key | Building |
|---|---|
| dormitory | 기숙사 |
| baeknyeon | 백년관 |
| natural_science | 자연과학관 |
| engineering | 공학관 |
| library | 도서관 |
| language | 어문학관 |
| humanities_economics | 인문경상관 |
| myeongsudang | 명수당 |

### 프론트 연동 방식

1. `account.get()`으로 현재 로그인 사용자를 조회한다.
2. `users` 테이블에서 `authUserId`가 현재 사용자 ID와 일치하는 row를 찾는다.
3. 해당 row의 `favoriteBuildings` 배열을 가져온다.
4. 즐겨찾기 추가 시 배열에 건물 key를 추가한다.
5. 즐겨찾기 해제 시 배열에서 건물 key를 제거한다.
6. `tablesDB.updateRow()`로 users row를 업데이트한다.

### 프론트 처리 예시

const currentUser = await account.get();

const result = await tablesDB.listRows({
  databaseId: DATABASE_ID,
  tableId: USERS_TABLE_ID,
  queries: [Query.equal("authUserId", currentUser.$id)],
});

const userRow = result.rows[0];
const currentFavorites = userRow.favoriteBuildings || [];

const newFavorites = currentFavorites.includes(buildingKey)
  ? currentFavorites.filter((building) => building !== buildingKey)
  : [...currentFavorites, buildingKey];

await tablesDB.updateRow({
  databaseId: DATABASE_ID,
  tableId: USERS_TABLE_ID,
  rowId: userRow.$id,
  data: {
    favoriteBuildings: newFavorites,
  },
});

---

## 4. 회원 탈퇴 처리 방식

회원 탈퇴 기능은 프론트엔드 Web SDK만으로 Appwrite Auth 계정을 완전히 삭제하기 어렵기 때문에, 본 프로젝트에서는 우선 `soft delete` 방식을 사용한다. Auth 계정 완전 삭제에는 관리자 권한이 필요하며, 관리자 API Key를 프론트엔드 코드에 포함하는 것은 보안상 위험하기 때문이다.

따라서 사용자가 탈퇴를 요청하면 Appwrite Auth 계정을 즉시 삭제하지 않고, `users` 컬렉션에 탈퇴 상태를 기록한다.

### users 컬렉션 추가 필드

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| deleted | boolean | no | false | 탈퇴 처리 여부 |
| deletedAt | string | no |  | 탈퇴 처리 시간 |

### 탈퇴 처리 흐름

1. `account.get()`으로 현재 로그인 사용자를 조회한다.
2. `users` 테이블에서 `authUserId`가 현재 사용자 ID와 일치하는 row를 찾는다.
3. 해당 row의 `deleted` 값을 `true`로 변경한다.
4. `deletedAt`에 현재 시간을 저장한다.
5. `account.deleteSession("current")`로 현재 세션을 삭제한다.
6. 랜딩페이지 또는 로그인 페이지로 이동한다.

### 탈퇴 처리 예시

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

const userRow = rows[0];

await tablesDB.updateRow({
  databaseId: DATABASE_ID,
  tableId: USERS_TABLE_ID,
  rowId: userRow.$id,
  data: {
    deleted: true,
    deletedAt: new Date().toISOString(),
  },
});

await account.deleteSession({
  sessionId: "current",
});

### 로그인 차단 처리

soft delete 방식에서는 탈퇴 처리된 사용자가 다시 로그인하지 못하도록 로그인 후 `deleted` 값을 확인해야 한다. 로그인 성공 후 users row를 조회했을 때 `deleted` 값이 `true`라면 즉시 세션을 삭제하고 로그인을 차단한다.

const currentUser = await account.get();

const userResult = await tablesDB.listRows({
  databaseId: DATABASE_ID,
  tableId: USERS_TABLE_ID,
  queries: [Query.equal("authUserId", currentUser.$id)],
});

const userRows = userResult.rows || userResult.documents || [];

if (userRows.length > 0 && userRows[0].deleted === true) {
  await account.deleteSession({
    sessionId: "current",
  });

  throw new Error("탈퇴 처리된 계정입니다.");
}

### 향후 개선 방향

추후 Auth 계정까지 완전히 삭제해야 할 경우 Appwrite Function 또는 별도 백엔드 API를 추가로 구현한다. 이 경우 프론트엔드는 Function을 호출하고, Function 내부에서 관리자 권한으로 Auth 계정 삭제와 users row 삭제 또는 비활성화를 처리한다.
---

## 회원 탈퇴 Appwrite Function

회원 탈퇴는 Appwrite Function을 통해 처리한다. 프론트 Web SDK에서 Auth 계정을 직접 삭제하지 않고, Function 내부에서 서버 SDK와 API Key를 사용하여 사용자 데이터를 처리한다.

### Function 정보

| 항목 | 값 |
|---|---|
| Function ID | delete-user |
| Runtime | Node.js |
| 호출 방식 | functions.createExecution() |

### 환경변수

| 변수명 | 설명 |
|---|---|
| APPWRITE_ENDPOINT | Appwrite endpoint |
| APPWRITE_PROJECT_ID | Appwrite project ID |
| APPWRITE_API_KEY | 서버 API Key |
| APPWRITE_DATABASE_ID | HUFS MAP database ID |
| APPWRITE_USERS_TABLE_ID | users table ID |

### 프론트 요청 body

```json
{
  "userId": "currentUser.$id"
}
---

## Appwrite Project Information

본 프로젝트는 Appwrite를 활용하여 사용자 인증, 데이터베이스, 스토리지, 회원 탈퇴 Function을 관리한다.

- Project Name: HUFS MAP
- Project ID: 6a04171c0011ce7ababf
- Endpoint: https://nyc.cloud.appwrite.io/v1
- Database Name: HUFS MAP db
- Database ID: 6a0421f7006ae3722a8

주요 기능은 사용자 인증, 학교 이메일 인증, users 테이블 사용자 정보 저장, 건물 즐겨찾기, 회원 탈퇴 Function, 마이페이지 데이터 조회 기능이다.