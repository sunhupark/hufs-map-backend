import { useEffect, useState } from "react";
import {
  account,
  tablesDB,
  Query,
  DATABASE_ID,
  USERS_TABLE_ID,
} from "../lib/appwrite";

function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberId, setRememberId] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedId = localStorage.getItem("rememberedLoginId");

    if (savedId) {
      setLoginId(savedId);
      setRememberId(true);
    }
  }, []);

  const handleLogin = async () => {
    if (!loginId || !password) {
      setMessage("아이디 또는 이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      let loginEmail = loginId;

      if (!loginId.includes("@")) {
        const result = await tablesDB.listRows({
          databaseId: DATABASE_ID,
          tableId: USERS_TABLE_ID,
          queries: [Query.equal("username", loginId)],
        });

        const rows = result.rows || result.documents || [];

        if (rows.length === 0) {
          setMessage("존재하지 않는 아이디입니다.");
          return;
        }

        loginEmail = rows[0].email;
      }

      try {
        await account.deleteSession({
          sessionId: "current",
        });
      } catch (error) {
        // 기존 세션이 없으면 무시
      }

      await account.createEmailPasswordSession({
        email: loginEmail,
        password: password,
      });

      if (rememberId) {
        localStorage.setItem("rememberedLoginId", loginId);
      } else {
        localStorage.removeItem("rememberedLoginId");
      }

      setMessage("로그인 성공! 랜딩페이지로 이동합니다.");

      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } catch (error) {
      console.error(error);
      setMessage("로그인 실패: " + error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>로그인</h1>
        <p>한국외국어대학교 캠퍼스 맵에 로그인하세요.</p>

        <form autoComplete="off">
          <input
            type="text"
            placeholder="아이디 또는 학교 이메일"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            autoComplete="off"
            name="hufs-login-id"
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            name="hufs-login-password"
          />

          <label className="remember-row">
            <input
              type="checkbox"
              checked={rememberId}
              onChange={(e) => setRememberId(e.target.checked)}
            />
            아이디 기억하기
          </label>

          <button type="button" className="auth-button" onClick={handleLogin}>
            로그인
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <div className="auth-links">
          <a href="/forgot-password">비밀번호 재설정</a>
          <span>|</span>
          <a href="/signup">회원가입</a>
        </div>

        <a href="/" className="back-link">
          랜딩페이지로 돌아가기
        </a>
      </div>
    </div>
  );
}

export default LoginPage;