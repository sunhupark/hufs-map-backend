import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  account,
  tablesDB,
  ID,
  Query,
  DATABASE_ID,
  USERS_TABLE_ID,
} from "../lib/appwrite";

function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otpUserId, setOtpUserId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [username, setUsername] = useState("");
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");

  const [message, setMessage] = useState("");

  const handleSendCode = async () => {
    if (!email) {
      setMessage("학교 이메일을 입력해주세요.");
      return;
    }

    if (!email.endsWith("@hufs.ac.kr")) {
      setMessage("한국외국어대학교 학교 이메일만 사용할 수 있습니다.");
      return;
    }

    try {
      try {
        await account.deleteSession({
          sessionId: "current",
        });
      } catch (error) {
        // 로그인 상태가 아니면 무시
      }

      const token = await account.createEmailToken({
        userId: ID.unique(),
        email: email,
        phrase: false,
      });

      setOtpUserId(token.userId);
      setVerificationCode("");
      setIsEmailVerified(false);
      setMessage("인증번호를 메일로 보냈습니다. 메일함을 확인해주세요.");
    } catch (error) {
      console.error(error);
      setMessage("인증번호 발송 실패: " + error.message);
    }
  };

  const handleVerifyCode = async () => {
    if (!otpUserId) {
      setMessage("먼저 인증번호 받기를 눌러주세요.");
      return;
    }

    if (!verificationCode) {
      setMessage("인증번호를 입력해주세요.");
      return;
    }

    try {
      try {
        await account.deleteSession({
          sessionId: "current",
        });
      } catch (error) {
        // 로그인 상태가 아니면 무시
      }

      await account.createSession({
        userId: otpUserId,
        secret: verificationCode,
      });

      setIsEmailVerified(true);
      setMessage("학교 이메일 인증이 완료되었습니다. 이제 회원정보를 입력해주세요.");
    } catch (error) {
      console.error(error);
      setMessage("인증번호 확인 실패: " + error.message);
    }
  };

  const handleCheckUsername = async () => {
    if (!username) {
      setMessage("아이디를 입력해주세요.");
      return;
    }

    if (username.length < 4) {
      setMessage("아이디는 4자 이상 입력해주세요.");
      return;
    }

    try {
      const result = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: USERS_TABLE_ID,
        queries: [Query.equal("username", username)],
      });

      const rows = result.rows || result.documents || [];

      if (rows.length > 0) {
        setIsUsernameChecked(false);
        setMessage("이미 사용 중인 아이디입니다.");
      } else {
        setIsUsernameChecked(true);
        setMessage("사용 가능한 아이디입니다.");
      }
    } catch (error) {
      console.error(error);
      setMessage("아이디 중복 확인 실패: " + error.message);
    }
  };

  const handleSignup = async () => {
    if (!isEmailVerified) {
      setMessage("먼저 학교 이메일 인증을 완료해주세요.");
      return;
    }

    if (!isUsernameChecked) {
      setMessage("아이디 중복 확인을 먼저 해주세요.");
      return;
    }

    if (!username || !password || !passwordCheck || !nickname) {
      setMessage("모든 항목을 입력해주세요.");
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
      const currentUser = await account.get();

      await account.updateName({
        name: nickname,
      });

      await account.updatePassword({
        password: password,
      });

      await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: USERS_TABLE_ID,
        rowId: ID.unique(),
        data: {
          email: email,
          username: username,
          nickname: nickname,
          authUserId: currentUser.$id,
        },
      });

      await account.deleteSession({
        sessionId: "current",
      });

      setMessage("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("회원가입 실패: " + error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box signup-box">
        <h1>회원가입</h1>
        <p>학교 이메일 인증 후 서비스를 이용할 수 있습니다.</p>

        <form autoComplete="off">
          <input
            type="text"
            name="fake-username"
            autoComplete="username"
            style={{ display: "none" }}
          />
          <input
            type="password"
            name="fake-password"
            autoComplete="new-password"
            style={{ display: "none" }}
          />

          <input
            type="email"
            placeholder="학교 이메일 예: example@hufs.ac.kr"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setOtpUserId("");
              setVerificationCode("");
              setIsEmailVerified(false);
            }}
            disabled={isEmailVerified}
            autoComplete="off"
            name="hufs-signup-email"
          />

          <button type="button" className="sub-button" onClick={handleSendCode}>
            인증번호 받기
          </button>

          <input
            type="text"
            placeholder="인증번호 입력"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            disabled={isEmailVerified}
            autoComplete="off"
            name="hufs-verification-code"
          />

          <button
            type="button"
            className="sub-button"
            onClick={handleVerifyCode}
            disabled={isEmailVerified}
          >
            인증번호 확인
          </button>

          <div className="username-row">
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setIsUsernameChecked(false);
              }}
              autoComplete="off"
              name="hufs-signup-id"
            />

            <button type="button" onClick={handleCheckUsername}>
              중복확인
            </button>
          </div>

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            name="hufs-signup-password"
          />

          <input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            autoComplete="new-password"
            name="hufs-signup-password-check"
          />

          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            autoComplete="off"
            name="hufs-signup-nickname"
          />

          <label className="profile-upload">
            프로필 사진 선택
            <input type="file" />
          </label>

          <button type="button" className="auth-button" onClick={handleSignup}>
            회원가입
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <div className="auth-links">
          <span>이미 계정이 있나요?</span>
          <Link to="/login">로그인</Link>
        </div>

        <Link to="/" className="back-link">
          랜딩페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default SignupPage;