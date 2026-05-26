const LIVE_MAP_FILTER_STORAGE_PREFIX = "eft-library-live-map-filters-v1:";

export interface LiveMapFilterStorageState {
  disabledEventIds?: string[];
  disabledQuestIds?: string[];
  disabledStaticIds?: string[];
  disabledStoryIds?: string[];
}

function getLiveMapFilterStorageKey(normalizedName: string) {
  return `${LIVE_MAP_FILTER_STORAGE_PREFIX}${normalizedName}`;
}

export function readLiveMapFilterStorage(normalizedName: string): LiveMapFilterStorageState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(getLiveMapFilterStorageKey(normalizedName));

    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue) as Partial<LiveMapFilterStorageState>;

    return {
      disabledEventIds: getStringArray(parsedValue.disabledEventIds),
      disabledQuestIds: getStringArray(parsedValue.disabledQuestIds),
      disabledStaticIds: getStringArray(parsedValue.disabledStaticIds),
      disabledStoryIds: getStringArray(parsedValue.disabledStoryIds),
    };
  } catch {
    return null;
  }
}

export function writeLiveMapFilterStorage(
  normalizedName: string,
  state: LiveMapFilterStorageState,
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      getLiveMapFilterStorageKey(normalizedName),
      JSON.stringify(state),
    );
  } catch {
    // Ignore storage failures so map interaction stays unaffected.
  }
}

function getStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}

export function getEnabledIdsFromDisabled(allIds: string[], disabledIds: string[] = []) {
  const disabledSet = new Set(disabledIds);

  return new Set(allIds.filter((id) => !disabledSet.has(id)));
}

export function getDisabledIds(allIds: string[], enabledIds: Set<string>) {
  return allIds.filter((id) => !enabledIds.has(id));
}
