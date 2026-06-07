# Appwrite Functions

## delete-user Function

회원 탈퇴 기능은 Appwrite Function을 통해 처리한다.  
프론트엔드에서 직접 Appwrite Auth 계정을 삭제하지 않고, Function 내부에서 서버 SDK와 API Key를 사용하여 계정 삭제를 처리한다.

### Function Information

| Item | Value |
|---|---|
| Function Name | delete-user |
| Runtime | Node.js |
| Project ID | 6a04171c0011ce7ababf |
| Execute Access | All users |

### Environment Variables

| Key | Description |
|---|---|
| APPWRITE_ENDPOINT | Appwrite endpoint |
| APPWRITE_PROJECT_ID | Appwrite project ID |
| APPWRITE_DATABASE_ID | Database ID |
| APPWRITE_USERS_TABLE_ID | users table ID |
| APPWRITE_API_KEY | Server API key |

### Request Body

```json
{
  "userId": "currentUser.$id"
}