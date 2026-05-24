import { Link } from "react-router-dom";

function BuildingsPage() {
  return (
    <div className="simple-page">
      <div className="simple-box large">
        <h1>건물 검색</h1>
        <p>캠퍼스 건물을 검색하고 위치를 확인하는 페이지입니다.</p>

        <div className="map-placeholder">
          건물 검색 기능 영역
          <br />
          추후 담당자 기능과 연동 예정
        </div>

        <Link to="/" className="back-link">
          랜딩페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default BuildingsPage;