const LIVE_MAP_PREFERENCES_STORAGE_KEY = "eft-library-live-map-preferences-v1";

export interface LiveMapPreferences {
  areStaticLabelsVisible: boolean;
  isAutoPanLocked: boolean;
  isEyeComfortMode: boolean;
  isMarkerSimplified: boolean;
  mapRotations: Record<string, number>;
}

export function readLiveMapPreferences(): LiveMapPreferences | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(LIVE_MAP_PREFERENCES_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsedValue: unknown = JSON.parse(rawValue);

    if (!parsedValue || typeof parsedValue !== "object") {
      return null;
    }

    const preferences = parsedValue as Partial<LiveMapPreferences>;

    if (
      typeof preferences.areStaticLabelsVisible !== "boolean" ||
      typeof preferences.isAutoPanLocked !== "boolean"
    ) {
      return null;
    }

    return {
      areStaticLabelsVisible: preferences.areStaticLabelsVisible,
      isAutoPanLocked: preferences.isAutoPanLocked,
      isEyeComfortMode:
        typeof preferences.isEyeComfortMode === "boolean"
          ? preferences.isEyeComfortMode
          : false,
      isMarkerSimplified:
        typeof preferences.isMarkerSimplified === "boolean"
          ? preferences.isMarkerSimplified
          : false,
      mapRotations:
        preferences.mapRotations && typeof preferences.mapRotations === "object"
          ? Object.fromEntries(
              Object.entries(preferences.mapRotations).filter(
                ([, value]) => value === 0 || value === 90 || value === 180 || value === 270,
              ),
            )
          : {},
    };
  } catch {
    return null;
  }
}

export function writeLiveMapPreferences(preferences: LiveMapPreferences) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      LIVE_MAP_PREFERENCES_STORAGE_KEY,
      JSON.stringify(preferences),
    );
  } catch {
    // Ignore storage failures so live map controls remain usable.
  }
}
