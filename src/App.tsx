import React, { useState, useEffect } from 'react';
import { ClothingCategory, ClothingItem, DailyOutfit, DayOfWeek, SubSeason } from './types/stylist';
import { SEASONAL_PALETTES } from './data/seasonalPalettes';
import { INITIAL_WARDROBE_ITEMS } from './data/sampleWardrobe';
import { generateWeeklyPlan } from './utils/colorMatcher';
import { Header } from './components/Header';
import { WeeklyPlanner } from './components/WeeklyPlanner';
import { WardrobeManager } from './components/WardrobeManager';
import { PaletteViewer } from './components/PaletteViewer';
import { WardrobeAuditView } from './components/WardrobeAuditView';
import { SkinToneTestModal } from './components/SkinToneTestModal';
import { AddItemModal } from './components/AddItemModal';

const STORAGE_KEY_WARDROBE = 'chromawardrobe_items_v1';
const STORAGE_KEY_SEASON = 'chromawardrobe_season_v1';

export default function App() {
  // Load saved season or default to warm_autumn
  const [selectedSeason, setSelectedSeason] = useState<SubSeason>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SEASON);
      if (saved && SEASONAL_PALETTES[saved as SubSeason]) {
        return saved as SubSeason;
      }
    } catch {
      // fallback
    }
    return 'warm_autumn';
  });

  // Load saved wardrobe or default to curated initial items
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WARDROBE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_WARDROBE_ITEMS;
  });

  const [activeTab, setActiveTab] = useState<'weekly' | 'wardrobe' | 'palette' | 'audit'>('weekly');
  const [isToneQuizOpen, setIsToneQuizOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  // Weekly outfits state
  const [weeklyOutfits, setWeeklyOutfits] = useState<DailyOutfit[]>(() => {
    const pal = SEASONAL_PALETTES[selectedSeason];
    return generateWeeklyPlan(wardrobe, pal);
  });

  // Persist season
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SEASON, selectedSeason);
    } catch {
      // ignore
    }
  }, [selectedSeason]);

  // Persist wardrobe
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WARDROBE, JSON.stringify(wardrobe));
    } catch {
      // ignore
    }
  }, [wardrobe]);

  // Re-generate weekly plan when season or wardrobe changes
  const handleRegenerateOutfits = () => {
    const pal = SEASONAL_PALETTES[selectedSeason];
    const newPlan = generateWeeklyPlan(wardrobe, pal);
    setWeeklyOutfits(newPlan);
  };

  const handleSelectSeason = (season: SubSeason) => {
    setSelectedSeason(season);
    const pal = SEASONAL_PALETTES[season];
    const newPlan = generateWeeklyPlan(wardrobe, pal);
    setWeeklyOutfits(newPlan);
  };

  const handleAddItem = (newItem: ClothingItem) => {
    const updatedWardrobe = [newItem, ...wardrobe];
    setWardrobe(updatedWardrobe);
    const pal = SEASONAL_PALETTES[selectedSeason];
    setWeeklyOutfits(generateWeeklyPlan(updatedWardrobe, pal));
  };

  const handleDeleteItem = (id: string) => {
    const updatedWardrobe = wardrobe.filter((item) => item.id !== id);
    setWardrobe(updatedWardrobe);
    const pal = SEASONAL_PALETTES[selectedSeason];
    setWeeklyOutfits(generateWeeklyPlan(updatedWardrobe, pal));
  };

  const handleToggleFavorite = (id: string) => {
    setWardrobe((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  // Swap a single piece on a specific day
  const handleSwapPiece = (
    day: DayOfWeek,
    pieceType: 'top' | 'bottom' | 'outerwear' | 'shoes' | 'accessory'
  ) => {
    const categoryMapping: Record<string, ClothingCategory> = {
      top: 'top',
      bottom: 'bottom',
      outerwear: 'outerwear',
      shoes: 'shoes',
      accessory: 'accessory',
    };

    const targetCategory = categoryMapping[pieceType];
    const candidates = wardrobe.filter((i) => i.category === targetCategory);

    if (candidates.length <= 1) return;

    setWeeklyOutfits((prev) =>
      prev.map((outfit) => {
        if (outfit.day !== day) return outfit;

        const currentPiece = (outfit as any)[pieceType] as ClothingItem | undefined;
        const currentId = currentPiece?.id;

        // Find next candidate in array
        const currentIndex = candidates.findIndex((c) => c.id === currentId);
        const nextIndex = (currentIndex + 1) % candidates.length;
        const nextPiece = candidates[nextIndex];

        return {
          ...outfit,
          [pieceType]: nextPiece,
          stylistNote: `${nextPiece.name} ile kombin yenilendi; renk dengesi korundu.`,
        };
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedSeason={selectedSeason}
        onOpenToneQuiz={() => setIsToneQuizOpen(true)}
        onOpenAddItem={() => setIsAddItemOpen(true)}
        onGenerateOutfits={handleRegenerateOutfits}
        wardrobeCount={wardrobe.length}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'weekly' && (
          <WeeklyPlanner
            outfits={weeklyOutfits}
            currentSeason={selectedSeason}
            wardrobe={wardrobe}
            onRegenerateAll={handleRegenerateOutfits}
            onSwapPiece={handleSwapPiece}
            onOpenToneQuiz={() => setIsToneQuizOpen(true)}
          />
        )}

        {activeTab === 'wardrobe' && (
          <WardrobeManager
            wardrobe={wardrobe}
            currentSeason={selectedSeason}
            onOpenAddItem={() => setIsAddItemOpen(true)}
            onDeleteItem={handleDeleteItem}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activeTab === 'palette' && (
          <PaletteViewer
            currentSeason={selectedSeason}
            onOpenToneQuiz={() => setIsToneQuizOpen(true)}
            onSelectSeason={handleSelectSeason}
          />
        )}

        {activeTab === 'audit' && (
          <WardrobeAuditView
            wardrobe={wardrobe}
            currentSeason={selectedSeason}
            onOpenAddItem={() => setIsAddItemOpen(true)}
            onOpenToneQuiz={() => setIsToneQuizOpen(true)}
          />
        )}
      </main>

      {/* Footer conforming to design rules (quiet, no telemetry engines) */}
      <footer className="border-t border-stone-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-serif font-semibold text-stone-900 text-sm">
              ChromaWardrobe
            </span>
            <span aria-hidden="true">·</span>
            <span>Cilt Tonuna Göre Kişisel Haftalık Gardırop Stilisti</span>
          </div>

          <div className="flex items-center gap-4 text-stone-500">
            <span>12 Mevsimsel Renk Teorisi</span>
            <span aria-hidden="true">·</span>
            <span>Kişisel Verileriniz Tarayıcınızda Saklanır</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SkinToneTestModal
        isOpen={isToneQuizOpen}
        onClose={() => setIsToneQuizOpen(false)}
        currentSeason={selectedSeason}
        onSelectSeason={handleSelectSeason}
      />

      <AddItemModal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        onAddItem={handleAddItem}
        currentSeason={selectedSeason}
      />
    </div>
  );
}
