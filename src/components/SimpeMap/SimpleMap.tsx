import React, { useState, lazy, Suspense } from "react";
import GoogleMapReact from "google-map-react";
import LocationSvg from "../../img/icon-location-marker.svg";
import { MapSettings, YOUR_API_KEY } from "../../const";
import cl from "clsx";
import s from "./SimpleMap.module.scss";

const MapImg = lazy(() => import("../../img/map.png"));

interface MarkerProp {
  lat?: number;
  lng?: number;
}

const Marker = ({ lat, lng }: MarkerProp) => (
  <img
    className={cl(s.marker)}
    src={LocationSvg}
    alt="marker"
    id={`${lat}${lng}`}
  />
);

const SimpleMap = () => {
  const [isShowOfflineMap, setIsShowOfflineMap] = useState(false);
  const handleShowOfflineMapClick = () => setIsShowOfflineMap(true);

  return (
    // Important! Always set the container height explicitly
    <div className={cl(s.map)} style={{ backgroundImage: `url(${MapImg})` }}>
      {!isShowOfflineMap && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: YOUR_API_KEY }}
          defaultCenter={MapSettings.center}
          defaultZoom={MapSettings.zoom}
        >
          {MapSettings.markers.map((marker, i) => {
            return <Marker key={`${i}`} lat={marker.lat} lng={marker.lng} />;
          })}
        </GoogleMapReact>
      )}
      <button
        type="button"
        className={cl(s.defaultMapButton)}
        onClick={handleShowOfflineMapClick}
      >
        Карта не загрузилась
      </button>
    </div>
  );
};

export default SimpleMap;
