"use client";

import { esfahanLatLng } from "@/constants/esfahanLatLng";
import NeshanMap from "@neshan-maps-platform/react-openlayers";
import { useRef, useEffect } from "react";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";

export default function NeshanMapPreview() {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;

      // ایجاد موقعیت مارکر
      const position = fromLonLat([esfahanLatLng.lng, esfahanLatLng.lat]);

      // ایجاد Feature برای مارکر
      const markerFeature = new Feature({
        geometry: new Point(position),
      });

      // استایل مارکر
      markerFeature.setStyle(
        new Style({
          image: new Icon({
            src: "https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png",
            anchor: [0.5, 1],
            scale: 0.8,
          }),
        }),
      );

      // ایجاد لایه برداری
      const vectorSource = new VectorSource({
        features: [markerFeature],
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      // اضافه کردن لایه به نقشه
      //   map.addLayer(vectorLayer);
    }

    return () => {
      // پاکسازی
      if (mapRef.current) {
        // حذف لایه در صورت نیاز
      }
    };
  }, []);

  return (
    <div className="relative h-40 w-full rounded-3xl">
      <NeshanMap
        ref={mapRef}
        mapKey={"web.af8eff1729b84f7092e833040161aaaa"}
        center={{
          latitude: esfahanLatLng.lat,
          longitude: esfahanLatLng.lng,
        }}
        zoom={15}
        className="h-40 w-full rounded-3xl"
      />
    </div>
  );
}
