import { Link } from "react-router-dom";

function FacilitiesPage() {
  return (
    <div className="simple-page">
      <div className="simple-box large">
        <h1>편의시설</h1>
        <p>식당, 카페, 화장실 등 주요 편의시설을 확인하는 페이지입니다.</p>

        <div className="map-placeholder">
          편의시설 지도 및 목록 영역
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

export default FacilitiesPage;