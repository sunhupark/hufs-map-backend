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
