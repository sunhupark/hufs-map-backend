import { Link } from "react-router-dom";

function MyPostsPage() {
  return (
    <div className="simple-page">
      <div className="simple-box large">
        <h1>내가 쓴 글</h1>
        <p>내가 작성한 게시글 목록을 확인하는 페이지입니다.</p>

        <div className="list-placeholder">
          <div>
            <h3>게시글 제목 예시</h3>
            <p>건물명 / 작성일 / 좋아요 수 등이 표시될 예정입니다.</p>
          </div>
          <span>›</span>
        </div>

        <div className="list-placeholder">
          <div>
            <h3>게시글 제목 예시</h3>
            <p>게시글 클릭 시 상세 페이지 또는 수정 페이지로 이동 예정입니다.</p>
          </div>
          <span>›</span>
        </div>

        <Link to="/mypage" className="back-link">
          마이페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default MyPostsPage;