import { Link } from "react-router-dom";

function EditProfilePage() {
  return (
    <div className="simple-page">
      <div className="simple-box">
        <h1>회원 정보 수정</h1>
        <p>프로필 사진, 닉네임, 비밀번호 등을 수정하는 페이지입니다.</p>

        <input type="text" placeholder="닉네임" />
        <input type="password" placeholder="새 비밀번호" />
        <input type="password" placeholder="새 비밀번호 확인" />

        <label className="profile-upload">
          프로필 사진 변경
          <input type="file" />
        </label>

        <button className="auth-button">수정 완료</button>

        <Link to="/mypage" className="back-link">
          마이페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default EditProfilePage;