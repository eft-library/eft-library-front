"use client";

import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { ColorPaletteTypes } from "./post-editor.types";

const COLORS = [
  "#000000",
  "#333333",
  "#666666",
  "#999999",
  "#E53E3E",
  "#DD6B20",
  "#D69E2E",
  "#3182CE",
  "#38A169",
  "#805AD5",
  "#2D3748",
  "#718096",
  "#CBD5E0",
  "#F7FAFC",
  "#1A202C",
  "#4A5568",
  "#A0AEC0",
];

export default function ColorPalette({ editor }: ColorPaletteTypes) {
  if (!editor) return null;

  const [open, setOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [color, setColor] = useState(
    editor.getAttributes("textStyle").color || "#000000"
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 외부 클릭 시 닫기
    function onClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setColorPickerOpen(false);
      }
    }
    if (open || colorPickerOpen) {
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open, colorPickerOpen]);

  const applyColor = (newColor: string) => {
    setColor(newColor);
    editor.chain().focus().setColor(newColor).run();
    setOpen(false);
    setColorPickerOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* 메인 버튼: 현재 색상 표시 */}
      <button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          setColorPickerOpen(false);
        }}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-400 hover:ring-2 hover:ring-offset-1 hover:ring-blue-500 transition"
        aria-label="색상 선택 열기"
      >
        <div
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: color }}
        />
      </button>

      {/* 기본 색상 팔레트 팝업 */}
      {open && (
        <div className="absolute top-full mb-2 left-0 z-30 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg flex flex-wrap gap-2 max-w-xs w-52">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={(e) => {
                e.stopPropagation();
                applyColor(c);
              }}
              className="w-7 h-7 rounded-full border border-gray-400 hover:ring-2 hover:ring-offset-1 hover:ring-blue-500 transition"
              style={{ backgroundColor: c }}
              aria-label={`색상 ${c}`}
              type="button"
            />
          ))}

          {/* 커스텀 컬러 피커 열기 버튼 */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setColorPickerOpen(true);
              setOpen(false);
            }}
            className="flex items-center justify-center w-7 h-7 rounded-full border border-gray-400 hover:ring-2 hover:ring-offset-1 hover:ring-blue-500 transition text-xl font-bold select-none"
            aria-label="커스텀 컬러 피커 열기"
          >
            +
          </button>
        </div>
      )}

      {/* react-colorful 컬러 피커 팝업 */}
      {colorPickerOpen && (
        <div className="absolute top-full mt-2 left-0 ml-2 z-40 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg max-w-xs w-56">
          <HexColorPicker
            color={color}
            onChange={(newColor) => setColor(newColor)}
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={() => applyColor(color)}
              className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              적용
            </button>
            <button
              onClick={() => setColorPickerOpen(false)}
              className="px-3 py-1 rounded border border-gray-400 hover:bg-gray-100 transition"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
