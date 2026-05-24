import { Link } from "react-router-dom";

function TermsPage() {
  return (
    <div className="simple-page">
      <div className="simple-box large">
        <h1>이용약관</h1>
        <p>HUFS MAP 서비스 이용과 관련한 기본 약관입니다.</p>

        <div className="policy-content">
          <h3>제1조 목적</h3>
          <p>
            본 약관은 한국외국어대학교 캠퍼스맵 서비스의 이용 조건과
            사용자와 서비스 간의 권리 및 의무를 정하는 것을 목적으로 합니다.
          </p>

          <h3>제2조 서비스 내용</h3>
          <p>
            본 서비스는 캠퍼스 건물 정보, 편의시설 정보, 게시글 및 댓글 작성,
            즐겨찾기 등 학교 생활에 필요한 정보를 제공합니다.
          </p>

          <h3>제3조 이용자의 의무</h3>
          <p>
            이용자는 타인의 권리를 침해하거나 허위 정보, 부적절한 게시글,
            비방성 댓글 등을 작성해서는 안 됩니다.
          </p>

          <h3>제4조 게시글 관리</h3>
          <p>
            서비스 운영상 부적절하다고 판단되는 게시글이나 댓글은 신고 또는
            관리자 확인을 통해 제한될 수 있습니다.
          </p>

          <h3>제5조 서비스 변경 및 중단</h3>
          <p>
            서비스는 개발 및 운영 상황에 따라 일부 기능이 변경되거나 일시적으로
            중단될 수 있습니다.
          </p>
        </div>

        <Link to="/" className="back-link">
          랜딩페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default TermsPage;