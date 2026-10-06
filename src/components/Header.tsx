import React from 'react';
import { Sparkles, Plus, Palette } from 'lucide-react';
import { SubSeason } from '../types/stylist';
import { SEASONAL_PALETTES } from '../data/seasonalPalettes';

interface HeaderProps {
  activeTab: 'weekly' | 'wardrobe' | 'audit' | 'palette';
  setActiveTab: (tab: 'weekly' | 'wardrobe' | 'audit' | 'palette') => void;
  selectedSeason: SubSeason;
  onOpenToneQuiz: () => void;
  onOpenAddItem: () => void;
  onGenerateOutfits: () => void;
  wardrobeCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedSeason,
  onOpenToneQuiz,
  onOpenAddItem,
  onGenerateOutfits,
  wardrobeCount,
}) => {
  const currentPalette = SEASONAL_PALETTES[selectedSeason];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand title, single line text element in display serif */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('weekly');
            }}
            className="group flex items-baseline gap-2 text-stone-900 focus:outline-none"
          >
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors">
              ChromaWardrobe
            </span>
            <span className="hidden sm:inline text-xs uppercase tracking-widest text-stone-500 font-medium">
              Kişisel Stilist
            </span>
          </a>

          {/* Current Palette indicator button */}
          <button
            onClick={onOpenToneQuiz}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs text-stone-600 hover:text-stone-950 bg-stone-100 hover:bg-stone-200/70 rounded border border-stone-200 transition-colors cursor-pointer"
            title="Cilt tonunu değiştir veya testi tekrarla"
          >
            <span
              className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
              style={{ backgroundColor: currentPalette.keyColors[0].hex }}
            />
            <span className="font-medium truncate max-w-[140px]">{currentPalette.nameTr}</span>
            <span className="text-stone-400 text-[11px]">Değiştir</span>
          </button>
        </div>

        {/* Zone 2: 4 clean text navigation links, single-line, no pill boxes */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`transition-colors relative py-1 cursor-pointer ${
              activeTab === 'weekly'
                ? 'text-stone-950 font-semibold'
                : 'hover:text-stone-950'
            }`}
          >
            Haftalık Kombinler
            {activeTab === 'weekly' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('wardrobe')}
            className={`transition-colors relative py-1 cursor-pointer ${
              activeTab === 'wardrobe'
                ? 'text-stone-950 font-semibold'
                : 'hover:text-stone-950'
            }`}
          >
            Gardırobum ({wardrobeCount})
            {activeTab === 'wardrobe' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('palette')}
            className={`transition-colors relative py-1 cursor-pointer ${
              activeTab === 'palette'
                ? 'text-stone-950 font-semibold'
                : 'hover:text-stone-950'
            }`}
          >
            Renk Skalam
            {activeTab === 'palette' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`transition-colors relative py-1 cursor-pointer ${
              activeTab === 'audit'
                ? 'text-stone-950 font-semibold'
                : 'hover:text-stone-950'
            }`}
          >
            Stilist Analizi
            {activeTab === 'audit' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAddItem}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 rounded hover:border-stone-400 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
          >
            <Plus className="w-4 h-4 text-stone-500" />
            <span className="hidden sm:inline">Kıyafet Ekle</span>
            <span className="sm:hidden">Ekle</span>
          </button>

          <button
            onClick={onGenerateOutfits}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors cursor-pointer shadow-xs whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Kombinleri Yenile</span>
          </button>
        </div>
      </div>

      {/* Mobile subnav */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200/60 bg-[#FAF9F5] px-2 py-2 text-xs">
        <button
          onClick={() => setActiveTab('weekly')}
          className={`py-1 px-2 font-medium cursor-pointer ${
            activeTab === 'weekly' ? 'text-stone-900 border-b-2 border-stone-900 font-semibold' : 'text-stone-500'
          }`}
        >
          Haftalık Kombin
        </button>
        <button
          onClick={() => setActiveTab('wardrobe')}
          className={`py-1 px-2 font-medium cursor-pointer ${
            activeTab === 'wardrobe' ? 'text-stone-900 border-b-2 border-stone-900 font-semibold' : 'text-stone-500'
          }`}
        >
          Gardırop ({wardrobeCount})
        </button>
        <button
          onClick={() => setActiveTab('palette')}
          className={`py-1 px-2 font-medium cursor-pointer ${
            activeTab === 'palette' ? 'text-stone-900 border-b-2 border-stone-900 font-semibold' : 'text-stone-500'
          }`}
        >
          Renk Skalam
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`py-1 px-2 font-medium cursor-pointer ${
            activeTab === 'audit' ? 'text-stone-900 border-b-2 border-stone-900 font-semibold' : 'text-stone-500'
          }`}
        >
          Stilist Raporu
        </button>
      </div>
    </header>
  );
};
