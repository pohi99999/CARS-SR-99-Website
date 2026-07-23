"use client";

import dynamic from "next/dynamic";

export const AIChatAssistant = dynamic(() => import("@/components/AIChatAssistant"), { ssr: false });
export const CompareDock = dynamic(() => import("@/components/CompareDock"), { ssr: false });
export const CookieBanner = dynamic(() => import("@/components/CookieBanner"), { ssr: false });
export const FomoNotification = dynamic(() => import("@/components/FomoNotification"), { ssr: false });
