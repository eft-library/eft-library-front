const markerColors: Record<string, string> = {
  "6a31824878450ec91c0ea1ae": "#94a3b8",
  "6a31830dde69ceafd805afa0": "#64748b",
  "6a3182dc6cd8de21cf0a3a7d": "#7dd3fc",
  "6a3182b72fd891345e047eef": "#818cf8",
  "6a3181f178450ec91c0ea1aa": "#fde68a",
  "6a317b9692cfdcddcb02a58e": "#9ca3af",
  "6a31807f17005505b70d5827": "#7dd3fc",
  "6a31828557705071410ca00e": "#38bdf8",
};

export function getDocumentMarkerColor(itemId: string) {
  return markerColors[itemId] ?? "#f59e0b";
}

const markerGlyphs: Record<string, string> = {
  "6a31824878450ec91c0ea1ae": `<rect x="4" y="5" width="16" height="14" rx="2" fill="#252a2e" stroke="#cbd5e1"/><rect x="6" y="7" width="12" height="9.5" rx="1.2" fill="#8f999d" stroke="#475569"/>`,
  "6a31830dde69ceafd805afa0": `<rect x="6" y="3.5" width="12" height="17" rx="1" fill="#252329" stroke="#94a3b8"/><rect x="8.7" y="7" width="5.5" height="3" rx=".4" fill="#f1f5f9"/>`,
  "6a3182dc6cd8de21cf0a3a7d": `<rect x="5.5" y="3" width="13" height="18" rx="1" fill="#dbeafe" stroke="#64748b"/><rect x="8.5" y="2.2" width="7" height="2.2" rx=".6" fill="#64748b"/><circle cx="9" cy="8" r="2.4" fill="#1f2937"/><path d="M12.5 7h4M7.5 13h9M7.5 16h9" stroke="#64748b"/>`,
  "6a3182b72fd891345e047eef": `<rect x="6" y="2.5" width="12" height="19" rx="1" fill="#18223c" stroke="#818cf8"/><path d="M8 16 12 7l4 9-4-3zM8 16l4-3 4 3" fill="none" stroke="#a5b4fc"/>`,
  "6a3181f178450ec91c0ea1aa": `<rect x="4" y="3" width="16" height="18" rx="2" fill="#262629"/><rect x="7" y="3.5" width="4.2" height="16.5" rx="2.1" fill="#f5e89a" stroke="#a99d55"/><ellipse cx="16" cy="17.2" rx="3.2" ry="2.6" fill="#dbeafe" stroke="#94a3b8"/>`,
  "6a317b9692cfdcddcb02a58e": `<rect x="4" y="4.5" width="16" height="15" rx="1.5" fill="#202327" stroke="#9ca3af"/><rect x="6" y="6.5" width="12" height="10.5" rx=".7" fill="#292d31" stroke="#4b5563"/>`,
  "6a31807f17005505b70d5827": `<path d="M5 3.5h14v17H5z" fill="#bae6fd" stroke="#64748b"/><path d="m7 8 4 3-4 3M11 11h6M13 11l3 6M9 17h7" fill="none" stroke="#334155"/>`,
  "6a31828557705071410ca00e": `<rect x="5" y="3" width="14" height="18" rx="1" fill="#dbeafe" stroke="#0284c7"/><rect x="8" y="2.2" width="8" height="2.3" rx=".6" fill="#64748b"/><path d="M7 8h10M7 11h10M7 17h10M11 16l2-4 1.5 2 2.5-4" fill="none" stroke="#0284c7"/>`,
};

export function getDocumentMarkerSvg(itemId: string, size: number) {
  const fallback = `<path d="M6 3h12v18H6z" fill="#e2e8f0" stroke="#64748b"/>`;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">${markerGlyphs[itemId] ?? fallback}</svg>`;
}
