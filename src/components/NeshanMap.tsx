"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import NeshanMap, {
  NeshanMapRef,
} from "@neshan-maps-platform/react-openlayers";

import { Button } from "@/components/ui/button";
import { esfahanLatLng } from "@/constants/esfahanLatLng";
import { MapPin } from "lucide-react";
import { toLonLat } from "ol/proj";
import BackButton from "./shared/BackButton";

export default function NeshanLocationPicker() {
  const router = useRouter();

  const mapRef = useRef<NeshanMapRef | null>(null);

  const [location, setLocation] = useState({
    lat: esfahanLatLng.lat,
    lng: esfahanLatLng.lng,
  });

  useEffect(() => {
    const map = mapRef.current?.map;

    if (!map) return;

    const updateLocation = () => {
      const center = map.getView().getCenter();

      if (!center) return;

      const [lng, lat] = toLonLat(center);

      setLocation({
        lat,
        lng,
      });
    };

    // وقتی drag تمام شد
    map.on("moveend", updateLocation);

    // مقدار اولیه
    updateLocation();

    return () => {
      map.un("moveend", updateLocation);
    };
  }, []);

  const saveLocation = () => {
    console.log({
      latitude: location.lat,
      longitude: location.lng,
    });

    /**
     * اینجا می‌توانی:
     * Zustand
     * Context
     * Redux
     * یا searchParams
     * استفاده کنی
     */

    // router.back();
  };

  return (
    <div className="relative h-screen w-full">
      <NeshanMap
        ref={mapRef}
        mapKey={"web.af8eff1729b84f7092e833040161aaaa"}
        center={{
          latitude: location.lat,
          longitude: location.lng,
        }}
        zoom={15}
        className="h-screen w-full"
      />

      {/* مرکز ثابت نقشه */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-20
          -translate-x-1/2
          -translate-y-full
        "
      >
        <MapPin
          className="
            h-12
            w-12
           text-primary
          "
          fill="#9479f9"
        />
      </div>

      <div
        className="
          absolute
          top-5
          right-5
          z-30
        "
      >
        <BackButton />
      </div>
      <div
        className="
          absolute
          bottom-10
          left-5
          right-5
          z-30
        "
      >
        <Button className="w-full" variant={"gradient"} onClick={saveLocation}>
          ذخیره موقعیت
        </Button>
      </div>
    </div>
  );
}
