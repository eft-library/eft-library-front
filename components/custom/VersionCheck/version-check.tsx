"use client";

import { useEffect } from "react";

export function VersionCheck() {
  useEffect(() => {
    const savedVersion = localStorage.getItem("appVersion");

    fetch("/version.txt?t=" + Date.now()) // 캐시 방지
      .then((r) => r.text())
      .then((version) => {
        const v = version.trim();
        if (savedVersion && savedVersion !== v) {
          localStorage.setItem("appVersion", v);
          window.location.reload();
        } else {
          localStorage.setItem("appVersion", v);
        }
      })
      .catch(() => {}); // 실패해도 무시
  }, []);

  return null;
}
