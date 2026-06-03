import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { account } from "../lib/appwrite";

function MyPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.error(error);
        alert("로그인이 필요합니다.");
        window.location.href = "/login";
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession({
        sessionId: "current",
      });
    } catch (error) {
      // 이미 로그아웃 상태면 무시
    }

    window.location.href = "/";
  };

  const handleDeleteAccount = () => {
    alert("회원 탈퇴 기능은 추후 Appwrite와 연동 예정입니다.");
  };

  return (
    <div className="mypage-wrapper">
      <header className="mypage-navbar">
        <nav>
          <Link to="/">캠퍼스맵</Link>
          <Link to="#">게시판</Link>
          <Link to="/mypage">마이페이지</Link>
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
        </nav>
      </header>

      <main className="mypage-main">
        <section className="mypage-title">
          <h1>마이페이지</h1>
          <p>한국외국어대학교 캠퍼스맵을 이용해주셔서 감사합니다.</p>
        </section>

        <section className="profile-card">
          <div className="profile-left">
            <div className="profile-icon">👤</div>

            <div>
              <div className="profile-name-row">
                <h2>{user?.name || "사용자"}</h2>
                <span>학생</span>
              </div>

              <p>{user?.email || "이메일 정보 없음"}</p>
            </div>
          </div>

          <Link to="/edit-profile" className="edit-profile-button">
            정보 수정
          </Link>
        </section>

        <section className="mypage-grid">
          <Link to="/my-posts" className="mypage-card">
            <div className="mypage-card-icon blue">✎</div>
            <div>
              <h3>내가 쓴 글</h3>
              <p>내가 작성한 게시글을 확인해보세요.</p>
            </div>
            <span>›</span>
          </Link>

          <Link to="/my-comments" className="mypage-card">
            <div className="mypage-card-icon purple">▣</div>
            <div>
              <h3>내가 쓴 댓글</h3>
              <p>내가 남긴 댓글을 확인해보세요.</p>
            </div>
            <span>›</span>
          </Link>
        </section>

        <Link to="/favorites" className="mypage-wide-card">
          <div className="mypage-card-icon green">☆</div>
          <div>
            <h3>즐겨찾기</h3>
            <p>즐겨찾기한 건물과 장소를 한눈에 확인해보세요.</p>
          </div>
          <span>›</span>
        </Link>

        <section className="mypage-bottom-grid">
          <button type="button" className="mypage-action-card" onClick={handleLogout}>
            <span>↪</span>
            로그아웃
          </button>

          <button
            type="button"
            className="mypage-action-card danger"
            onClick={handleDeleteAccount}
          >
            <span>✕</span>
            탈퇴하기
          </button>
        </section>

        <Link to="/" className="mypage-home-button">
          랜딩페이지로 돌아가기
        </Link>
      </main>
    </div>
  );
}

export default MyPage;