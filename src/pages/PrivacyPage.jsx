import { Link } from "react-router-dom";

function PrivacyPage() {
  return (
    <div className="simple-page">
      <div className="simple-box large">
        <h1>개인정보처리방침</h1>
        <p>HUFS MAP 서비스의 개인정보 처리 기준입니다.</p>

        <div className="policy-content">
          <h3>1. 수집하는 개인정보 항목</h3>
          <p>
            서비스는 회원가입 및 이용을 위해 학번, 이메일, 아이디, 닉네임,
            프로필 사진, 작성 게시글 및 댓글 정보를 수집할 수 있습니다.
          </p>

          <h3>2. 개인정보 이용 목적</h3>
          <p>
            수집한 정보는 회원 식별, 로그인, 게시글 작성자 구분, 마이페이지
            제공, 서비스 운영 및 관리 목적으로 사용합니다.
          </p>

          <h3>3. 개인정보 보관</h3>
          <p>
            회원 정보는 서비스 이용 기간 동안 보관하며, 탈퇴 요청 또는 관련
            법령 및 운영 정책에 따라 삭제 또는 비식별 처리할 수 있습니다.
          </p>

          <h3>4. 개인정보 제3자 제공</h3>
          <p>
            서비스는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.
            단, 법령에 따라 요청이 있는 경우 예외가 있을 수 있습니다.
          </p>

          <h3>5. 개인정보 보호 조치</h3>
          <p>
            서비스는 Appwrite 인증 및 데이터베이스 권한 설정을 통해 사용자
            정보를 보호하고, 신고 내역 등 민감한 데이터는 조회 권한을
            제한합니다.
          </p>
        </div>

        <Link to="/" className="back-link">
          랜딩페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default PrivacyPage;
