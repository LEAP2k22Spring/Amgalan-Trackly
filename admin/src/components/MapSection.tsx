import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useMapContext } from "../context";
import { Popup, Marker, TileLayer, MapContainer, useMap } from "react-leaflet";

const ChangeView = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
    map.zoomIn(12);
    // eslint-disable-next-line
  }, [lat, lng]);
  return null;
};

export const MapSection = () => {
  const { activeDriversPos, choseDriversPos } = useMapContext();
  const getIcon = () => {
    return icon({
      iconSize: 30 as any,
      className: "rounded-full duration-1000",
      iconUrl: require("../assets/bus.png"),
    });
  };

  return (
    <MapContainer
      zoom={15}
      center={{
        lat: choseDriversPos.latitude || 47.91,
        lng: choseDriversPos.longitude || 106.8,
      }}
      className="w-[calc(100vw-240px)] h-screen"
    >
      <ChangeView
        lat={choseDriversPos.latitude || 47.91}
        lng={choseDriversPos.longitude || 106.8}
      />
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=BlX75aexttP0PZgDJuki"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {activeDriversPos.map((driver: any, id) => {
        return (
          <Marker
            key={id}
            icon={getIcon()}
            position={{
              lat: driver.location.latitude,
              lng: driver.location.longitude,
            }}
          >
            <Popup>
              <h3 className="mb-1">{driver.fullname}</h3>
              <h3>{driver.phonenumber}</h3>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
