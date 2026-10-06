export type Undertone = 'warm' | 'cool' | 'neutral';

export type SeasonGroup = 'spring' | 'summer' | 'autumn' | 'winter';

export type SubSeason =
  | 'light_spring'
  | 'warm_spring'
  | 'bright_spring'
  | 'light_summer'
  | 'cool_summer'
  | 'soft_summer'
  | 'soft_autumn'
  | 'warm_autumn'
  | 'deep_autumn'
  | 'deep_winter'
  | 'cool_winter'
  | 'bright_winter';

export interface ColorSwatch {
  name: string;
  hex: string;
  description: string;
  isAccent?: boolean;
}

export interface SeasonalPalette {
  id: SubSeason;
  nameTr: string;
  seasonGroup: SeasonGroup;
  undertone: Undertone;
  contrastLevel: 'Düşük' | 'Orta' | 'Yüksek';
  description: string;
  bestMetals: ('Altın' | 'Gümüş' | 'Rose Gold' | 'Bronz' | 'Platin' | 'Beyaz Altın')[];
  keyColors: ColorSwatch[];
  neutralColors: ColorSwatch[];
  avoidColors: ColorSwatch[];
  faceFramingTips: string;
  celebrityExamples: string[];
}

export type ClothingCategory = 'top' | 'bottom' | 'outerwear' | 'shoes' | 'accessory';

export type StyleVibe = 'formal' | 'smart_casual' | 'casual' | 'evening';

export type SeasonSuitability = 'all' | 'spring_summer' | 'fall_winter';

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  colorName: string;
  colorHex: string;
  imageUrl?: string;
  styleVibe: StyleVibe[];
  seasonSuitability: SeasonSuitability;
  isFavorite?: boolean;
  notes?: string;
  createdAt: number;
}

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface DailyOutfit {
  day: DayOfWeek;
  dayLabelTr: string;
  occasion: string;
  top: ClothingItem;
  bottom: ClothingItem;
  outerwear?: ClothingItem;
  shoes: ClothingItem;
  accessory?: ClothingItem;
  harmonyScore: number; // 0 - 100
  stylistNote: string;
  paletteCompliance: 'perfect' | 'good' | 'balanced';
}

export interface WardrobeAuditResult {
  totalItems: number;
  paletteMatchPercentage: number;
  faceFramingMatchPercentage: number;
  topMatches: number;
  neutralMatches: number;
  clashingCount: number;
  missingRecommendations: string[];
  stylistSummary: string;
}
