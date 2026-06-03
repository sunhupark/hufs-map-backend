import { useEffect, useState } from "react";
import { account } from "../lib/appwrite";

function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await account.get();
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsCheckingLogin(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession({
        sessionId: "current",
      });
    } catch (error) {
      // 이미 로그아웃 상태면 무시
    }

    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="page">
      <header className="navbar">
        <nav>
          <a href="/map">캠퍼스맵</a>
          <a href="/board">게시판</a>
          <a href="/mypage">마이페이지</a>

          {isCheckingLogin ? (
            <span className="nav-loading">확인 중...</span>
          ) : isLoggedIn ? (
            <button
              type="button"
              className="nav-button"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          ) : (
            <a href="/login">로그인</a>
          )}
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <div className="hero-text">
            <p className="service-name">한국외국어대학교 캠퍼스 맵</p>

            <h1>
              한눈에 보는
              <br />
              <span>우리 학교</span>
            </h1>

            <p className="description">
              건물 위치와 편의시설을 쉽고 빠르게 확인하고
              <br />
              필요한 정보를 편리하게 이용해보세요.
            </p>

            <button
              type="button"
              className="start-button"
              onClick={() => {
                window.location.href = "/map";
              }}
            >
              지도로 시작하기 <span>›</span>
            </button>
          </div>

          <div className="hero-image">
            <div className="school-box">🏫</div>
          </div>
        </section>

        <section className="feature-row">
          <div
            className="feature-card clickable-card"
            onClick={() => {
              window.location.href = "/buildings";
            }}
          >
            <div className="icon">⌕</div>
            <div>
              <h3>건물 검색</h3>
              <p>건물을 검색하여 위치를 찾아보세요.</p>
            </div>
          </div>

          <div
            className="feature-card clickable-card"
            onClick={() => {
              window.location.href = "/board";
            }}
          >
            <div className="icon">▤</div>
            <div>
              <h3>게시판</h3>
              <p>공지사항과 다양한 소식을 확인해 보세요.</p>
            </div>
          </div>

          <div
            className="feature-card clickable-card"
            onClick={() => {
              window.location.href = "/facilities";
            }}
          >
            <div className="icon">♨</div>
            <div>
              <h3>편의시설</h3>
              <p>식당, 카페, 화장실 등 주요 시설을 확인하세요.</p>
            </div>
          </div>
        </section>

        <section
          className="map-preview clickable-map"
          onClick={() => {
            window.location.href = "/map";
          }}
        >
          <div className="map-card">
            <h3>캠퍼스 지도 미리보기</h3>
            <p>지도를 클릭하여 자세히 확인해 보세요.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="/terms">이용약관</a>
        <span>|</span>
        <a href="/privacy">개인정보처리방침</a>
        <span>|</span>
        <a href="/contact">문의하기</a>
      </footer>
    </div>
  );
}

export default LandingPage;