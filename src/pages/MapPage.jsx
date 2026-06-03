import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const buildings = [
  {
    name: "기숙사",
    lat: 37.3359,
    lng: 127.2722,
    desc: "HUFS Dorm 기숙사입니다.",
  },
  {
    name: "백년관",
    lat: 37.3379,
    lng: 127.2697,
    desc: "한국외국어대학교 글로벌캠퍼스의 주요 건물입니다.",
  },
  {
    name: "자연과학관",
    lat: 37.3387,
    lng: 127.2688,
    desc: "자연과학 계열 수업이 이루어지는 건물입니다.",
  },
  {
    name: "공학관",
    lat: 37.3384,
    lng: 127.2708,
    desc: "공학 계열 수업과 실습이 이루어지는 건물입니다.",
  },
  {
    name: "도서관",
    lat: 37.3374,
    lng: 127.2682,
    desc: "자료 열람과 학습 공간을 제공하는 도서관입니다.",
  },
  {
    name: "어문학관",
    lat: 37.3369,
    lng: 127.2689,
    desc: "어문 계열 수업이 진행되는 건물입니다.",
  },
  {
    name: "인문경상관",
    lat: 37.3364,
    lng: 127.2701,
    desc: "인문 및 경상 계열 수업이 이루어지는 건물입니다.",
  },
  {
    name: "명수당",
    lat: 37.3372,
    lng: 127.2714,
    desc: "글로벌캠퍼스 안의 명수당입니다.",
  },
];

function MapPage() {
  const mapRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [clickedPosition, setClickedPosition] = useState(
    "아직 좌표를 클릭하지 않았습니다."
  );

  useEffect(() => {
    const kakaoMapKey = "572dbb6e13cf948ed5f60d695c4885a3";
    const scriptId = "kakao-map-script";

    const drawMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        setErrorMessage("카카오맵 객체를 불러오지 못했습니다.");
        return;
      }

      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const hufsGlobal = new window.kakao.maps.LatLng(37.3376, 127.2697);

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: hufsGlobal,
          level: 3,
        });

        buildings.forEach((building) => {
          const markerPosition = new window.kakao.maps.LatLng(
            building.lat,
            building.lng
          );

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(map);

          const infoWindow = new window.kakao.maps.InfoWindow({
            content: `
              <div style="padding:7px 10px;font-size:13px;font-weight:600;white-space:nowrap;">
                ${building.name}
              </div>
            `,
          });

          window.kakao.maps.event.addListener(marker, "mouseover", () => {
            infoWindow.open(map, marker);
          });

          window.kakao.maps.event.addListener(marker, "mouseout", () => {
            infoWindow.close();
          });

          window.kakao.maps.event.addListener(marker, "click", () => {
            setSelectedBuilding(building);
          });
        });

        window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
          const latlng = mouseEvent.latLng;

          const lat = latlng.getLat().toFixed(7);
          const lng = latlng.getLng().toFixed(7);
          const coordinateText = `lat: ${lat}, lng: ${lng}`;

          setClickedPosition(coordinateText);
          console.log("클릭 좌표:", coordinateText);
        });
      });
    };

    const oldScript = document.getElementById(scriptId);

    if (oldScript) {
      drawMap();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`;
    script.async = true;
    script.onload = drawMap;
    script.onerror = () => {
      setErrorMessage(
        "카카오맵 스크립트 로딩 실패: JavaScript 키 또는 Web 도메인 설정을 확인해주세요."
      );
    };

    document.head.appendChild(script);
  }, []);

  const handleFavorite = (buildingName) => {
    if (favorites.includes(buildingName)) {
      setFavorites(favorites.filter((item) => item !== buildingName));
      setToast(`${buildingName} 즐겨찾기를 해제했습니다.`);
    } else {
      setFavorites([...favorites, buildingName]);
      setToast(`${buildingName}을 즐겨찾기에 추가했습니다.`);
    }

    setTimeout(() => {
      setToast("");
    }, 1800);
  };

  return (
    <div className="campus-map-page">
      <div className="campus-map-container">
        <div ref={mapRef} className="campus-kakao-map" />

        {errorMessage && <div className="map-error-message">{errorMessage}</div>}

        <div className="coordinate-box">
          <strong>클릭 좌표</strong>
          <br />
          {clickedPosition}
        </div>

        <button
          type="button"
          className="hamburger-button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="메뉴 열기"
        >
          ☰
        </button>

        {isMenuOpen && (
          <div className="side-menu">
            <button
              type="button"
              className="side-menu-close"
              onClick={() => setIsMenuOpen(false)}
              aria-label="메뉴 닫기"
            >
              ×
            </button>

            <div className="side-profile">
              <div className="side-profile-circle">프로필</div>
              <p>닉네임</p>
              <span>이름</span>
            </div>

            <Link to="/mypage">마이페이지</Link>
            <Link to="/login">로그인 / 회원가입</Link>
            <Link to="/contact">서비스 정보</Link>
            <Link to="/terms">이용약관</Link>
          </div>
        )}

        {selectedBuilding && (
          <div className="building-popup">
            <button
              type="button"
              className="popup-close"
              onClick={() => setSelectedBuilding(null)}
              aria-label="팝업 닫기"
            >
              ×
            </button>

            <h2>{selectedBuilding.name}</h2>
            <p>{selectedBuilding.desc}</p>

            <div className="popup-button-row">
              <button
                type="button"
                onClick={() => handleFavorite(selectedBuilding.name)}
                className={
                  favorites.includes(selectedBuilding.name)
                    ? "favorite-button active"
                    : "favorite-button"
                }
              >
                {favorites.includes(selectedBuilding.name)
                  ? "★ 즐겨찾기됨"
                  : "☆ 즐겨찾기"}
              </button>

              <button
                type="button"
                className="board-move-button"
                onClick={() => {
                  window.location.href = `/board?building=${encodeURIComponent(
                    selectedBuilding.name
                  )}`;
                }}
              >
                게시글 보기
              </button>
            </div>
          </div>
        )}

        {toast && <div className="map-toast">{toast}</div>}
      </div>
    </div>
  );
}

export default MapPage;
