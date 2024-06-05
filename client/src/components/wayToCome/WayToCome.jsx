import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { TiPhoneOutline } from "react-icons/ti";
import AOS from "aos";
import "aos/dist/aos.css";

const WayToComeBlock = styled.div`
  margin-top: 106px;
  margin-bottom: 30px;
  height: 100vh;
  position: relative;
  .map_wrap,
  .map_wrap * {
    margin: 0;
    padding: 0;
    font-family: var(--m-f-m);
    font-size: 14px;
  }
  .map_wrap {
    width: 100%;
    height: 500px;
    padding: 20px;
    position: relative;
    .WayToCome__mainTitle {
      text-align: center;
      padding: 30px 0;
      p {
        .title__ico {
          font-size: 5em;
          color: var(--main);
        }
      }
      h1 {
        font-size: 3em;
        padding-top: 20px;
        color: #414141;
        font-weight: 100;
      }
      .under__line {
        border-bottom: 2px solid #dadada;
        width: 40px;
        display: inline-block;
        padding: 10px 0;
      }
      .sub__text {
        font-size: 1em;
      }
      .mainTitle__subtext {
        padding-top: 20px;
        p {
          font-size: 1.3em;
          font-family: var(--m-f-n);
          padding-bottom: 5px;
          font-weight: 500;
        }
        span {
          font-size: 1.1em;
          font-family: var(--m-f-n);
          font-weight: bold;
          color: #969696;
        }
      }
    }
    #map {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      border: 1px solid #ccc;
    }
    .marker__info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 25px;
      border: 1px solid #ccc;
      border-top: none;
      /* left와 top 값을 계산하여 설정합니다. */
      left: 0;
      top: 0;
      z-index: 10;
      h2 {
        font-size: 1.7em;
        color: var(--main);
        font-weight: 500;
      }
      p {
        font-size: 1em;
        font-family: var(--m-f-n);
        padding-top: 10px;
      }
      .marker__info__right {
        display: flex;
        justify-content: space-between;
        p {
          font-size: 1em;
          font-weight: 500;
          font-family: var(--m-f-n);
        }

        .marker__info__ico1 {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-right: 30px;
        }
        .marker__info__ico2 {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
      span {
        .ico {
          font-size: 4em;
          border: 2px solid var(--main);
          padding: 10px;
          border-radius: 50%;
          color: var(--main);
          transition: all 0.3s ease;
        }
      }
      a:hover {
        span {
          .ico {
            border: 2px solid var(--main);
            background: var(--main);
            color: white;
          }
        }
      }
    }
  }
`;

const WayToCome = () => {
  const kakao = window.kakao;
  const mapRef = useRef(null);
  const [myMap, setMyMap] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();
    const address = "서울시 송파구 위례성대로 2 장은빌딩 18층";

    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        let mapOption = {
          center: coords,
          level: 7,
        };
        let mapContainer = mapRef.current;
        let mapInstance = new kakao.maps.Map(mapContainer, mapOption);
        let infowindowInstance = new kakao.maps.InfoWindow({ zIndex: 1 });

        setMyMap(mapInstance);
        setInfowindow(infowindowInstance);

        // 마커를 추가하는 부분
        let marker = new kakao.maps.Marker({
          position: coords,
          map: mapInstance,
        });

        // 마커에 인포윈도우를 추가하는 부분
        let infowindowContent =
          '<div style="padding:5px;">송파구 위례성대로 2 장은빌딩 18층</div>';
        infowindowInstance.setContent(infowindowContent);
        infowindowInstance.open(mapInstance, marker);

        // 마커의 화면 상 좌표 계산
        const projection = mapInstance.getProjection();
        const markerPosition = projection.pointFromCoords(coords);
        setMarkerPosition({ left: markerPosition.x, top: markerPosition.y });
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 700,
    });
  }, []);

  return (
    <WayToComeBlock
      markerLeft={markerPosition.left}
      markerTop={markerPosition.top}
    >
      <div className="map_wrap">
        <div
          className="WayToCome__mainTitle"
          data-aos="fade-down"
          data-aos-anchor-placement="top"
        >
          <p>
            <FaMapLocationDot className="title__ico" />
          </p>
          <h1>오시는길</h1>
          <span className="under__line"></span>
          <div className="mainTitle__subtext">
            <p className="sub__text">배달의 민족 본사로 찾아오는 길</p>
            <span>(송파구 위례성대로 2 장은빌딩 18층)</span>
          </div>
        </div>
        <div
          id="map"
          ref={mapRef}
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
          }}
        ></div>
        <div className="marker__info">
          <div className="marker__info__left">
            <h2>배달의민족</h2>
            <p>송파구 위례성대로 2 장은빌딩 18층</p>
          </div>
          <div className="marker__info__right">
            <a
              className="marker__info__ico1"
              href="https://map.kakao.com/?from=roughmap&eName=%EC%9A%B0%EC%95%84%ED%95%9C%ED%98%95%EC%A0%9C%EB%93%A4&eX=524923.0&eY=1115971.0"
              target="_blank"
            >
              <span>
                <LuMapPin className="ico" />
              </span>
              <p>길찾기</p>
            </a>
            <a href="tel:1600-0987" className="marker__info__ico2">
              <span>
                <TiPhoneOutline className="ico" />
              </span>
              <p>1600-0987</p>
            </a>
          </div>
        </div>
      </div>
    </WayToComeBlock>
  );
};

export default WayToCome;
