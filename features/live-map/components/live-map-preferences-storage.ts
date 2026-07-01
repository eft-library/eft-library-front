const LIVE_MAP_PREFERENCES_STORAGE_KEY = "eft-library-live-map-preferences-v1";

export interface LiveMapPreferences {
  areStaticLabelsVisible: boolean;
  isAutoPanLocked: boolean;
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
