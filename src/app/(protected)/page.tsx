"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";

export default function Page() {
  const router = useTransitionRouter();

  return <div className="h-full overflow-auto">main page</div>;
}
