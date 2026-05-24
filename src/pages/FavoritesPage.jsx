import { Link } from "react-router-dom";

function FavoritesPage() {
  return (
    <div className="simple-page">
      <div className="simple-box large">
        <h1>즐겨찾기</h1>
        <p>즐겨찾기한 건물과 장소를 확인하는 페이지입니다.</p>

        <div className="list-placeholder">
          <div>
            <h3>건물명 예시</h3>
            <p>즐겨찾기한 장소 설명과 위치 정보가 표시될 예정입니다.</p>
          </div>
          <span>›</span>
        </div>

        <div className="map-placeholder">
          지도 영역
          <br />
          추후 Leaflet 지도와 마커 데이터 연동 예정
        </div>

        <Link to="/mypage" className="back-link">
          마이페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default FavoritesPage;