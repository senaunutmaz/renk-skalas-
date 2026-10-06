import React, { useState } from 'react';
import { Plus, Trash2, Heart, Search, Camera, Sparkles, Filter } from 'lucide-react';
import { ClothingCategory, ClothingItem, SubSeason } from '../types/stylist';
import { SEASONAL_PALETTES } from '../data/seasonalPalettes';
import { calculateItemPaletteAffinity } from '../utils/colorMatcher';

interface WardrobeManagerProps {
  wardrobe: ClothingItem[];
  currentSeason: SubSeason;
  onOpenAddItem: () => void;
  onDeleteItem: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const WardrobeManager: React.FC<WardrobeManagerProps> = ({
  wardrobe,
  currentSeason,
  onOpenAddItem,
  onDeleteItem,
  onToggleFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ClothingCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const palette = SEASONAL_PALETTES[currentSeason];

  const categories: { id: ClothingCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Tüm Gardırop' },
    { id: 'top', label: 'Üst Giyim' },
    { id: 'bottom', label: 'Alt Giyim' },
    { id: 'outerwear', label: 'Dış Giyim' },
    { id: 'shoes', label: 'Ayakkabı' },
    { id: 'accessory', label: 'Aksesuar' },
  ];

  const filteredItems = wardrobe.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.colorName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const getCategoryLabel = (cat: ClothingCategory) => {
    switch (cat) {
      case 'top':
        return 'Üst Giyim';
      case 'bottom':
        return 'Alt Giyim';
      case 'outerwear':
        return 'Dış Giyim';
      case 'shoes':
        return 'Ayakkabı';
      case 'accessory':
        return 'Aksesuar';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top controls & summary banner */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Dijital Gardırobunuz
          </h2>
          {/* Metadata rendered as clean unboxed text with subtle typographic separators */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
            <span>{wardrobe.length} Toplam Parça</span>
            <span aria-hidden="true">·</span>
            <span>{wardrobe.filter((i) => i.category === 'top').length} Üst Giyim</span>
            <span aria-hidden="true">·</span>
            <span>{wardrobe.filter((i) => i.category === 'bottom').length} Alt Giyim</span>
            <span aria-hidden="true">·</span>
            <span>Palet: {palette.nameTr}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Kıyafet veya renk ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:bg-white focus:border-stone-900 text-stone-900 placeholder:text-stone-400"
            />
          </div>

          <button
            onClick={onOpenAddItem}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
          >
            <Camera className="w-4 h-4" />
            <span>Fotoğraf Çek / Ekle</span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs (Interactive segmented buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((c) => {
          const count =
            c.id === 'all'
              ? wardrobe.length
              : wardrobe.filter((i) => i.category === c.id).length;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === c.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              <span>{c.label}</span>
              <span
                className={`text-[10px] tabular-nums px-1.5 py-0.2 rounded ${
                  selectedCategory === c.id
                    ? 'bg-white/20 text-white'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Wardrobe Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-stone-300 p-12 text-center max-w-md mx-auto my-8">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900">
            {searchQuery ? 'Aramanıza uygun parça bulunamadı' : 'Bu kategoride parça yok'}
          </h3>
          <p className="text-xs text-stone-500 mt-1 mb-4">
            Dolabınızdaki kıyafetlerin fotoğrafını çekip yükleyerek stilist kombinlerinizi zenginleştirin.
          </p>
          <button
            onClick={onOpenAddItem}
            className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
          >
            İlk Parçayı Yükle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredItems.map((item) => {
            const affinity = calculateItemPaletteAffinity(item, palette);
            return (
              <div
                key={item.id}
                className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md hover:border-stone-300 transition-all flex flex-col justify-between"
              >
                {/* Visual Area with Resilient Fallback */}
                <div className="relative aspect-4/3 bg-stone-100 overflow-hidden flex items-center justify-center">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    // Fallback CSS luxury card with color swatch backdrop
                    <div
                      className="w-full h-full flex flex-col items-center justify-center p-3 relative"
                      style={{
                        background: `linear-gradient(135deg, ${item.colorHex}22 0%, ${item.colorHex}55 100%)`,
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-full shadow-md border-2 border-white/80 mb-2 flex items-center justify-center"
                        style={{ backgroundColor: item.colorHex }}
                      >
                        <span className="text-[10px] text-white/90 font-bold uppercase drop-shadow-xs">
                          {item.colorName.slice(0, 2)}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-stone-700 text-center px-1 truncate max-w-full">
                        {item.colorName}
                      </span>
                    </div>
                  )}

                  {/* Favorite button */}
                  <button
                    onClick={() => onToggleFavorite(item.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-stone-400 hover:text-rose-500 backdrop-blur-xs transition-colors cursor-pointer"
                    title="Favorilere ekle"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        item.isFavorite ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>

                  {/* Color tag on image */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-white text-[10px]">
                    <span
                      className="w-2 h-2 rounded-full inline-block border border-white/20"
                      style={{ backgroundColor: item.colorHex }}
                    />
                    <span className="truncate max-w-[80px]">{item.colorName}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed metadata line */}
                    <div className="flex items-center gap-1 text-[11px] text-stone-500 mb-1">
                      <span>{getCategoryLabel(item.category)}</span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          affinity.score >= 80
                            ? 'text-emerald-700 font-medium'
                            : affinity.score >= 60
                            ? 'text-amber-700 font-medium'
                            : 'text-stone-500'
                        }
                      >
                        %{affinity.score} Uyum
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1 group-hover:text-amber-900 transition-colors">
                      {item.name}
                    </h4>

                    {item.notes && (
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-1">
                        {item.notes}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] text-stone-400">
                      {item.styleVibe.length > 0
                        ? item.styleVibe[0] === 'formal'
                          ? 'Kurumsal'
                          : item.styleVibe[0] === 'smart_casual'
                          ? 'Smart Casual'
                          : 'Günlük'
                        : 'Klasik'}
                    </span>

                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 rounded hover:bg-stone-50 transition-colors cursor-pointer"
                      title="Gardıroptan sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
