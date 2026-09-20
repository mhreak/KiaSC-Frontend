"use client";

import { useEffect, useRef, useCallback } from "react";
import NeshanMap, {
  NeshanMapRef,
} from "@neshan-maps-platform/react-openlayers";
import "@neshan-maps-platform/react-openlayers/dist/style.css";

// تایپ‌های OpenLayers از پکیج نشان
import type Map from "@neshan-maps-platform/ol/Map";
import Feature from "@neshan-maps-platform/ol/Feature";
import Point from "@neshan-maps-platform/ol/geom/Point";
import VectorSource from "@neshan-maps-platform/ol/source/Vector";
import VectorLayer from "@neshan-maps-platform/ol/layer/Vector";
import { fromLonLat, toLonLat } from "@neshan-maps-platform/ol/proj";
import {
  Style,
  Icon,
  Circle as CircleStyle,
  Fill,
  Stroke,
} from "@neshan-maps-platform/ol/style";
import Overlay from "@neshan-maps-platform/ol/Overlay";

export interface MarkerData {
  id: string | number;
  lng: number;
  lat: number;
  /** آدرس تصویر مارکر (اختیاری) */
  iconUrl?: string;
  /** مقیاس آیکون (پیش‌فرض ۰.۵) */
  scale?: number;
  /** رنگ مارکر دایره‌ای اگر iconUrl نباشد */
  color?: string;
  /** متن یا HTML برای Popup */
  popup?: string;
  /** داده‌های دلخواه */
  data?: Record<string, any>;
}

interface NeshanOlMapProps {
  mapKey: string;
  markers?: MarkerData[];
  center?: { latitude: number; longitude: number };
  zoom?: number;
  defaultType?: "dreamy" | "standard-night" | string;
  poi?: boolean;
  traffic?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onMapClick?: (coords: { lng: number; lat: number }) => void;
  onMarkerClick?: (marker: MarkerData) => void;
  onMapReady?: (map: Map) => void;
}

const DEFAULT_CENTER = { latitude: 35.699756, longitude: 51.338076 };
const DEFAULT_ZOOM = 14;
const DEFAULT_ICON =
  "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-red.png";

export default function NeshanOlMap({
  mapKey,
  markers = [],
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  defaultType = "dreamy",
  poi = false,
  traffic = false,
  className = "",
  style,
  onMapClick,
  onMarkerClick,
  onMapReady,
}: NeshanOlMapProps) {
  const mapRef = useRef<NeshanMapRef | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);
  const vectorLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const popupOverlayRef = useRef<Overlay | null>(null);
  const popupElementRef = useRef<HTMLDivElement | null>(null);

  // ایجاد لایه مارکرها و Popup بعد از آماده شدن نقشه
  const handleInit = useCallback(
    (map: Map) => {
      // لایه وکتور برای مارکرها
      const source = new VectorSource();
      const layer = new VectorLayer({
        source,
        zIndex: 100,
      });
      map.addLayer(layer);

      vectorSourceRef.current = source;
      vectorLayerRef.current = layer;

      // عنصر Popup
      const popupEl = document.createElement("div");
      popupEl.className = "neshan-ol-popup";
      popupEl.style.cssText = `
        background: white;
        padding: 10px 14px;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.25);
        min-width: 120px;
        font-family: Tahoma, sans-serif;
        font-size: 13px;
        direction: rtl;
        position: relative;
      `;
      popupElementRef.current = popupEl;

      const overlay = new Overlay({
        element: popupEl,
        autoPan: true,
        positioning: "bottom-center",
        offset: [0, -12],
      });
      map.addOverlay(overlay);
      popupOverlayRef.current = overlay;

      // کلیک روی نقشه
      map.on("click", (evt) => {
        const feature = map.forEachFeatureAtPixel(
          evt.pixel,
          (feature: any) => feature,
          {},
        ) as any;

        // اگر روی Marker کلیک شده
        if (feature) {
          const markerData = feature.get("markerData") as
            | MarkerData
            | undefined;

          if (markerData) {
            onMarkerClick?.(markerData);

            if (
              markerData.popup &&
              popupElementRef.current &&
              popupOverlayRef.current
            ) {
              popupElementRef.current.innerHTML = markerData.popup;
              popupOverlayRef.current.setPosition(evt.coordinate);
            } else {
              popupOverlayRef.current?.setPosition(undefined);
            }

            return;
          }
        }

        // فقط در صورتی که روی Marker کلیک نشده باشد
        const [lng, lat] = toLonLat(evt.coordinate);

        onMapClick?.({ lng, lat });

        popupOverlayRef.current?.setPosition(undefined);
      });

      onMapReady?.(map);
    },
    [onMapClick, onMarkerClick, onMapReady],
  );

  // همگام‌سازی مارکرها با آرایه ورودی
  useEffect(() => {
    const source = vectorSourceRef.current;
    if (!source) return;

    source.clear();

    markers.forEach((m) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([m.lng, m.lat])),
      });

      feature.set("markerData", m);
      feature.setId(m.id);

      // استایل مارکر
      if (m.iconUrl || !m.color) {
        feature.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 1],
              scale: m.scale ?? 0.5,
              src: m.iconUrl || DEFAULT_ICON,
              crossOrigin: "anonymous",
            }),
          }),
        );
      } else {
        // مارکر دایره‌ای رنگی
        feature.setStyle(
          new Style({
            image: new CircleStyle({
              radius: 10,
              fill: new Fill({ color: m.color }),
              stroke: new Stroke({ color: "#fff", width: 2 }),
            }),
          }),
        );
      }

      source.addFeature(feature);
    });
  }, [markers]);

  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", ...style }}
    >
      <NeshanMap
        ref={mapRef}
        mapKey={mapKey}
        defaultType={defaultType as any}
        center={center}
        zoom={zoom}
        poi={poi}
        traffic={traffic}
        style={{ width: "100%", height: "100%" }}
        onInit={handleInit}
        className="h-full"
      />
    </div>
  );
}
