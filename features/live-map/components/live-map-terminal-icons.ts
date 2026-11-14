// Shared by the sidebar and map markers so both use the approved artwork.
export const terminalMarkerColors: Record<string, string> = {
  power_panel: "#e2e8f0",
  toolset_spawn: "#e879f9",
};

export function getTerminalMarkerSvg(category: string, size: number): string | undefined {
  const color = terminalMarkerColors[category];
  if (!color) return undefined;
  const body = category === "power_panel"
    ? `<rect x="4.6" y="2.8" width="14.8" height="18.4" rx="1.8" stroke="${color}" stroke-width="2.2" />
       <path d="m13 6.2-3.9 6h3.2l-.8 5.6 4.1-6.3h-3.2z" fill="${color}" />`
    : `<path d="M3.2 10.2h17.6v8.9a1.7 1.7 0 0 1-1.7 1.7H4.9a1.7 1.7 0 0 1-1.7-1.7z" stroke="${color}" stroke-width="2.1" stroke-linejoin="round" />
       <path d="M3.2 10.2 5 6.6h14l1.8 3.6" stroke="${color}" stroke-width="2.1" stroke-linejoin="round" />
       <path d="M9.2 6.6V4.7c0-.6.4-1 1-1h3.6c.6 0 1 .4 1 1v1.9" stroke="${color}" stroke-width="2" stroke-linecap="round" />
       <rect x="10.3" y="12.4" width="3.4" height="2.8" rx=".6" fill="${color}" />`;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">${body}</svg>`;
}
