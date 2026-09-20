"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot, Root } from "react-dom/client";

const NESHAN_CSS_URL =
  "https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.css";

const NESHAN_JS_URL =
  "https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.js";

export interface NeshanMarkerData {
  id: string | number;

  lat: number;

  lng: number;

  /**
   * محتوای سفارشی Marker
   */
  marker?: React.ReactNode;

  /**
   * آیکون معمولی Leaflet
   */
  iconUrl?: string;

  /**
   * اندازه آیکون
   */
  iconSize?: [number, number];

  /**
   * محل Anchor
   */
  iconAnchor?: [number, number];

  /**
   * عنوان Marker
   */
  title?: string;

  /**
   * opacity
   */
  opacity?: number;

  /**
   * قابلیت Drag
   */
  draggable?: boolean;

  /**
   * محتوای Popup
   */
  popup?: React.ReactNode | string;

  /**
   * داده دلخواه
   */
  data?: Record<string, any>;
}

interface NeshanLeafletMapProps {
  mapKey: string;

  markers?: NeshanMarkerData[];

  center?: {
    latitude: number;
    longitude: number;
  };

  zoom?: number;

  defaultType?: "dreamy" | "standard" | "standard-night" | string;

  poi?: boolean;

  traffic?: boolean;

  className?: string;

  style?: React.CSSProperties;

  onMapClick?: (coords: { lng: number; lat: number }) => void;

  onMarkerClick?: (marker: NeshanMarkerData) => void;

  onMarkerDragEnd?: (
    marker: NeshanMarkerData,
    coords: {
      lat: number;
      lng: number;
    },
  ) => void;

  onMapReady?: (map: any) => void;
}

declare global {
  interface Window {
    L: any;
  }
}

const DEFAULT_CENTER = {
  latitude: 35.699756,
  longitude: 51.338076,
};

const DEFAULT_ZOOM = 14;

export default function NeshanLeafletMap({
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
  onMarkerDragEnd,
  onMapReady,
}: NeshanLeafletMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const mapRef = useRef<any>(null);

  const markersLayerRef = useRef<any>(null);

  const markerRefs = useRef<Map<string | number, any>>(new Map());

  const markerRootsRef = useRef<Map<string | number, Root>>(new Map());

  const callbacksRef = useRef({
    onMapClick,
    onMarkerClick,
    onMarkerDragEnd,
    onMapReady,
  });

  const cleanupMarkerRoots = () => {
    const roots = Array.from(markerRootsRef.current.values());

    markerRootsRef.current.clear();

    requestAnimationFrame(() => {
      roots.forEach((root) => {
        try {
          root.unmount();
        } catch {
          // root ممکن است قبلاً unmount شده باشد
        }
      });
    });
  };

  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    callbacksRef.current = {
      onMapClick,
      onMarkerClick,
      onMarkerDragEnd,
      onMapReady,
    };
  }, [onMapClick, onMarkerClick, onMarkerDragEnd, onMapReady]);

  /**
   * Load Neshan CSS
   */
  useEffect(() => {
    const existingLink = document.querySelector(
      `link[href="${NESHAN_CSS_URL}"]`,
    );

    if (existingLink) return;

    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.href = NESHAN_CSS_URL;

    document.head.appendChild(link);
  }, []);

  /**
   * Initialize Map
   */
  useEffect(() => {
    let cancelled = false;

    const initializeMap = () => {
      if (cancelled) return;

      if (!containerRef.current) return;

      if (!window.L) {
        console.error("Neshan Leaflet SDK is not loaded.");

        return;
      }

      if (!mapKey?.trim()) {
        console.error("Neshan Leaflet Map: mapKey is missing.");

        return;
      }

      if (mapRef.current) return;

      const L = window.L;

      const map = new L.Map(containerRef.current, {
        key: mapKey,
        maptype: defaultType,
        center: [center.latitude, center.longitude],
        zoom,
        poi,
        traffic,
        zoomControl: false,
      });

      mapRef.current = map;

      const markersLayer = L.layerGroup().addTo(map);

      markersLayerRef.current = markersLayer;

      setMapReady(true);

      map.on("click", (event: any) => {
        callbacksRef.current.onMapClick?.({
          lat: event.latlng.lat,
          lng: event.latlng.lng,
        });
      });

      callbacksRef.current.onMapReady?.(map);
    };

    if (window.L) {
      initializeMap();

      return () => {
        cancelled = true;
      };
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${NESHAN_JS_URL}"]`,
    );

    if (existingScript) {
      existingScript.addEventListener("load", initializeMap);

      return () => {
        cancelled = true;

        existingScript.removeEventListener("load", initializeMap);
      };
    }

    const script = document.createElement("script");

    script.src = NESHAN_JS_URL;

    script.async = true;

    script.onload = initializeMap;

    script.onerror = () => {
      console.error("Failed to load Neshan Leaflet SDK.");
    };

    document.body.appendChild(script);

    return () => {
      cancelled = true;
    };
  }, [
    mapKey,
    center.latitude,
    center.longitude,
    zoom,
    defaultType,
    poi,
    traffic,
  ]);

  /**
   * Sync Markers
   */
  useEffect(() => {
    const map = mapRef.current;

    const markersLayer = markersLayerRef.current;

    if (!map || !markersLayer || !window.L) {
      return;
    }

    const L = window.L;

    /**
     * Remove previous markers
     */
    markersLayer.clearLayers();

    /**
     * Unmount previous React roots
     */
    cleanupMarkerRoots();

    markerRefs.current.clear();

    /**
     * Create markers
     */
    markers.forEach((markerData) => {
      let marker: any;

      /**
       * --------------------------------
       * React custom marker
       * --------------------------------
       */
      if (markerData.marker) {
        const markerContainer = document.createElement("div");

        markerContainer.style.width = "fit-content";

        markerContainer.style.height = "fit-content";

        const root = createRoot(markerContainer);

        root.render(markerData.marker);

        markerRootsRef.current.set(markerData.id, root);

        const divIcon = L.divIcon({
          html: markerContainer,

          className: "neshan-custom-marker",

          iconSize: markerData.iconSize ?? null,

          iconAnchor: markerData.iconAnchor ?? null,
        });

        marker = L.marker([markerData.lat, markerData.lng], {
          icon: divIcon,

          title: markerData.title,

          opacity: markerData.opacity ?? 1,

          draggable: markerData.draggable ?? false,
        });
      } else if (markerData.iconUrl) {
        /**
         * --------------------------------
         * Normal Leaflet Icon
         * --------------------------------
         */
        const icon = L.icon({
          iconUrl: markerData.iconUrl,

          iconSize: markerData.iconSize ?? [32, 48],

          iconAnchor: markerData.iconAnchor ?? [16, 48],

          popupAnchor: [0, -48],
        });

        marker = L.marker([markerData.lat, markerData.lng], {
          icon,

          title: markerData.title,

          opacity: markerData.opacity ?? 1,

          draggable: markerData.draggable ?? false,
        });
      } else {
        /**
         * --------------------------------
         * Default Leaflet Marker
         * --------------------------------
         */
        marker = L.marker([markerData.lat, markerData.lng], {
          title: markerData.title,

          opacity: markerData.opacity ?? 1,

          draggable: markerData.draggable ?? false,
        });
      }

      /**
       * Popup
       */
      if (markerData.popup) {
        const popupContent =
          typeof markerData.popup === "string"
            ? markerData.popup
            : (() => {
                const element = document.createElement("div");

                const root = createRoot(element);

                root.render(markerData.popup);

                /**
                 * فعلاً root را نگه می‌داریم
                 * تا در cleanup بتوانیم unmount کنیم.
                 */
                return element;
              })();

        marker.bindPopup(popupContent, {
          direction: "rtl",
        });
      }

      /**
       * Marker Click
       */
      marker.on("click", (event: any) => {
        event?.originalEvent?.stopPropagation();

        callbacksRef.current.onMarkerClick?.(markerData);
      });

      /**
       * Drag End
       */
      if (markerData.draggable) {
        marker.on("dragend", () => {
          const position = marker.getLatLng();

          callbacksRef.current.onMarkerDragEnd?.(markerData, {
            lat: position.lat,
            lng: position.lng,
          });
        });
      }

      marker.addTo(markersLayer);

      markerRefs.current.set(markerData.id, marker);
    });
  }, [markers, mapReady]);

  /**
   * Cleanup
   */
  useEffect(() => {
    return () => {
      markerRootsRef.current.forEach((root) => {
        root.unmount();
      });

      markerRootsRef.current.clear();

      if (mapRef.current) {
        mapRef.current.remove();

        mapRef.current = null;
      }

      markersLayerRef.current = null;

      markerRefs.current.clear();

      setMapReady(false);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        ...style,
      }}
    />
  );
}
