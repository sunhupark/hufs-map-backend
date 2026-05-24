import { useState } from "react";
import { Link } from "react-router-dom";
import { account } from "../lib/appwrite";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");
    const secret = params.get("secret");

    if (!userId || !secret) {
      setMessage("비밀번호 재설정 링크가 올바르지 않습니다. 메일 링크로 다시 접속해주세요.");
      return;
    }

    if (!password || !passwordCheck) {
      setMessage("새 비밀번호를 모두 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 8) {
      setMessage("비밀번호는 8자 이상 입력해주세요.");
      return;
    }

    try {
      await account.updateRecovery({
        userId: userId,
        secret: secret,
        password: password,
      });

      setMessage("비밀번호가 변경되었습니다. 이제 새 비밀번호로 로그인할 수 있습니다.");
    } catch (error) {
      console.error(error);
      setMessage("비밀번호 변경 실패: " + error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>새 비밀번호 설정</h1>
        <p>새로 사용할 비밀번호를 입력해주세요.</p>

        <input
          type="password"
          placeholder="새 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <input
          type="password"
          placeholder="새 비밀번호 확인"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          autoComplete="new-password"
        />

        <button
          type="button"
          className="auth-button"
          onClick={handleResetPassword}
        >
          비밀번호 변경
        </button>

        {message && <p className="auth-message">{message}</p>}

        <Link to="/login" className="back-link">
          로그인 페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default ResetPasswordPage;