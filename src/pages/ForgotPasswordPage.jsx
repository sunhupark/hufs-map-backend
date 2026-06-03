import { useState } from "react";
import { Link } from "react-router-dom";
import { account } from "../lib/appwrite";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendRecoveryEmail = async () => {
    if (!email) {
      setMessage("이메일을 입력해주세요.");
      return;
    }

    try {
      await account.createRecovery({
        email: email,
        url: "http://localhost:5173/reset-password",
      });

      setMessage("비밀번호 재설정 메일을 보냈습니다. 메일함을 확인해주세요.");
    } catch (error) {
      console.error(error);
      setMessage("비밀번호 재설정 메일 발송 실패: " + error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>비밀번호 재설정</h1>
        <p>가입한 학교 이메일을 입력하면 재설정 메일을 보내드립니다.</p>

        <input
          type="email"
          placeholder="학교 이메일 예: example@hufs.ac.kr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />

        <button
          type="button"
          className="auth-button"
          onClick={handleSendRecoveryEmail}
        >
          재설정 메일 보내기
        </button>

        {message && <p className="auth-message">{message}</p>}

        <Link to="/login" className="back-link">
          로그인 페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;