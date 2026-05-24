import { Link } from "react-router-dom";

function MyCommentsPage() {
  return (
    <div className="simple-page">
      <div className="simple-box large">
        <h1>내가 쓴 댓글</h1>
        <p>내가 작성한 댓글 목록을 확인하는 페이지입니다.</p>

        <div className="list-placeholder">
          <div>
            <h3>댓글 내용 예시</h3>
            <p>댓글이 달린 게시글 제목과 작성일이 표시될 예정입니다.</p>
          </div>
          <span>›</span>
        </div>

        <div className="list-placeholder">
          <div>
            <h3>댓글 내용 예시</h3>
            <p>댓글 클릭 시 해당 게시글로 이동 예정입니다.</p>
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

export default MyCommentsPage;