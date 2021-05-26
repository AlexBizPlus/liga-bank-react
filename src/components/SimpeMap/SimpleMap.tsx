import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationSvg from "../../img/icon-location-marker.svg";
import MapImg from "../../img/map.png";
import { MapSettings, YOUR_API_KEY } from "../../const";
import cl from "clsx";
import s from "./SimpleMap.module.scss";

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
    <div className={cl(s.map)}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: YOUR_API_KEY }}
        defaultCenter={MapSettings.center}
        defaultZoom={MapSettings.zoom}
      >
        {MapSettings.markers.map((marker, i) => {
          return <Marker key={`${i}`} lat={marker.lat} lng={marker.lng} />;
        })}
      </GoogleMapReact>
      <img
        className={cl(s.defaultMapImg)}
        src={MapImg}
        alt="map"
      />
    </div>
  );
};

export default SimpleMap;
