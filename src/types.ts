export interface Theme {
  id: number | string;
  title: string;
  description: string;
  colorClass: string;
}

export interface Bundle {
  id: number | string;
  name: string;
  patternCount: number;
  lastUpdated: string;
}

export interface Pattern {
  id: number | string;
  title: string;
  source: string;
  resolution: string;
  imageUrl: string;
  themeId?: number | string;
  isFavorite: boolean;
  bundleIds: (number | string)[];
}
