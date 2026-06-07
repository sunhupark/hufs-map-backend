# Troubleshooting

## favoriteBuildings updateRow 401 Error

### Problem

프론트에서 건물 즐겨찾기 버튼을 클릭하면 users row의 `favoriteBuildings`를 `updateRow()`로 수정하는 과정에서 401 오류가 발생하였다.

### Cause

기존 users row에 해당 Auth user의 update permission이 없었고, users 테이블의 Update 권한도 로그인 유저에게 열려 있지 않았다.

또한 Row security가 비활성화되어 있어 기존 row에 row-level permission을 바로 추가할 수 없는 상태였다.

### Solution

users 테이블 권한에 `All users` 역할을 추가하고, 로그인한 유저가 users row를 읽고 수정할 수 있도록 Read/Update 권한을 부여하였다.

### Final Permission

| Role | Create | Read | Update | Delete |
|---|---|---|---|---|
| All users | yes | yes | yes | no |

### Note

최종 서비스에서는 row security를 활성화하고, 각 users row에 해당 authUserId 기준의 read/update/delete 권한을 부여하는 방식이 더 안전하다.