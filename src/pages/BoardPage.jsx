import { Link } from "react-router-dom";

function BoardPage() {
  return (
    <div className="simple-page">
      <div className="simple-box large">
        <h1>게시판</h1>
        <p>건물별 게시글과 학교 관련 소식을 확인하는 페이지입니다.</p>

        <div className="list-placeholder">
          <div>
            <h3>게시글 목록 영역</h3>
            <p>추후 posts 테이블과 연동하여 게시글을 불러올 예정입니다.</p>
          </div>
          <span>›</span>
        </div>

        <Link to="/" className="back-link">
          랜딩페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default BoardPage;