import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  Printer,
  Calendar,
  ChevronRight,
  ShieldCheck,
  ArrowRightLeft,
  CheckCircle2,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClothingItem, DailyOutfit, DayOfWeek, SubSeason } from '../types/stylist';
import { SEASONAL_PALETTES } from '../data/seasonalPalettes';
import { calculateItemPaletteAffinity } from '../utils/colorMatcher';

interface WeeklyPlannerProps {
  outfits: DailyOutfit[];
  currentSeason: SubSeason;
  wardrobe: ClothingItem[];
  onRegenerateAll: () => void;
  onSwapPiece: (day: DayOfWeek, pieceType: 'top' | 'bottom' | 'outerwear' | 'shoes' | 'accessory') => void;
  onOpenToneQuiz: () => void;
}

export const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({
  outfits,
  currentSeason,
  wardrobe,
  onRegenerateAll,
  onSwapPiece,
  onOpenToneQuiz,
}) => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('monday');
  const palette = SEASONAL_PALETTES[currentSeason];

  const currentOutfit = outfits.find((o) => o.day === selectedDay) || outfits[0];

  const handleRegenerateWithCelebration = () => {
    onRegenerateAll();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4A325', '#C86446', '#1C5468', '#C19A6B'],
      });
    } catch {
      // safe fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Editorial Hero Spotlight */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1C1917] text-stone-100 p-6 sm:p-8 shadow-xl border border-stone-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
          <img
            src="/src/assets/images/hero_color_wardrobe_1791309970594.jpg"
            alt="Color Palette Stylist"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Kişisel Renk Analizli Haftalık Stilist</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Her Sabah Ne Giyeceğim Stresine Son.
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
            Özel stilistlere binlerce lira ödemek yerine, <span className="text-amber-200 font-medium">{palette.nameTr}</span> cilt alt tonunuza özel olarak gardırobunuzdaki parçalarla hazırlanan 7 günlük profesyonel iş ve yaşam kombinleriniz hazır.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full inline-block bg-emerald-400" />
              <span>Yüz Çevresi Renk Uyum Garantisi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full inline-block bg-amber-400" />
              <span>Dengeli Kapsül Rotasyonu</span>
            </div>
            <button
              onClick={onOpenToneQuiz}
              className="text-amber-300 hover:text-white underline cursor-pointer transition-colors"
            >
              Cilt Tonunu Değiştir
            </button>
          </div>
        </div>
      </div>

      {/* 7-Day Day Selector Strip (Interactive segmented buttons) */}
      <div className="bg-white p-2 rounded-xl border border-stone-200 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
          {outfits.map((outfit) => {
            const isSelected = outfit.day === selectedDay;
            return (
              <button
                key={outfit.day}
                onClick={() => setSelectedDay(outfit.day)}
                className={`py-3 px-2 rounded-lg text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-sm ring-1 ring-stone-900'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-950'
                }`}
              >
                <span className="text-xs uppercase tracking-wider font-semibold">
                  {outfit.dayLabelTr}
                </span>

                {/* Micro preview swatches of top + bottom */}
                <div className="flex items-center gap-1 my-0.5">
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-black/10"
                    style={{ backgroundColor: outfit.top.colorHex }}
                    title={outfit.top.colorName}
                  />
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-black/10"
                    style={{ backgroundColor: outfit.bottom.colorHex }}
                    title={outfit.bottom.colorName}
                  />
                  {outfit.outerwear && (
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: outfit.outerwear.colorHex }}
                      title={outfit.outerwear.colorName}
                    />
                  )}
                </div>

                <span
                  className={`text-[11px] tabular-nums ${
                    isSelected ? 'text-amber-300 font-medium' : 'text-stone-500'
                  }`}
                >
                  %{outfit.harmonyScore} Uyum
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Day Detail Display */}
      {currentOutfit && (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          {/* Day Header Bar */}
          <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold text-stone-900">
                  {currentOutfit.dayLabelTr}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  %{currentOutfit.harmonyScore} Cilt Tonu Uyumu
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                {currentOutfit.occasion}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded hover:bg-stone-50 transition-colors cursor-pointer"
                title="Haftalık kombinleri yazdır veya PDF olarak kaydet"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Yazdır / Kaydet</span>
              </button>

              <button
                onClick={handleRegenerateWithCelebration}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Tüm Haftayı Yenile</span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Stylist Color Commentary Box */}
            <div className="bg-[#FBF9F5] border-l-4 border-amber-800 p-4 rounded-r-xl">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-amber-100 rounded-full text-amber-900 mt-0.5 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                    Stilist Renk Değerlendirmesi
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
                    {currentOutfit.stylistNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Pieces Showcase Grid */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Günün Kombin Parçaları
                </span>
                <span className="text-xs text-stone-400">
                  Herhangi bir parçayı tek tıkla değiştirebilirsiniz
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. TOP */}
                <PieceCard
                  piece={currentOutfit.top}
                  roleLabel="Üst Giyim (Yüz Çevresi)"
                  onSwap={() => onSwapPiece(currentOutfit.day, 'top')}
                  isFaceFraming={true}
                  palette={palette}
                />

                {/* 2. BOTTOM */}
                <PieceCard
                  piece={currentOutfit.bottom}
                  roleLabel="Alt Giyim (Dengeleyici)"
                  onSwap={() => onSwapPiece(currentOutfit.day, 'bottom')}
                  palette={palette}
                />

                {/* 3. OUTERWEAR OR SHOES */}
                {currentOutfit.outerwear ? (
                  <PieceCard
                    piece={currentOutfit.outerwear}
                    roleLabel="Dış Giyim (Katman)"
                    onSwap={() => onSwapPiece(currentOutfit.day, 'outerwear')}
                    palette={palette}
                  />
                ) : (
                  <PieceCard
                    piece={currentOutfit.shoes}
                    roleLabel="Ayakkabı"
                    onSwap={() => onSwapPiece(currentOutfit.day, 'shoes')}
                    palette={palette}
                  />
                )}

                {/* 4. ACCESSORY OR SHOES */}
                {currentOutfit.outerwear ? (
                  <PieceCard
                    piece={currentOutfit.shoes}
                    roleLabel="Ayakkabı"
                    onSwap={() => onSwapPiece(currentOutfit.day, 'shoes')}
                    palette={palette}
                  />
                ) : currentOutfit.accessory ? (
                  <PieceCard
                    piece={currentOutfit.accessory}
                    roleLabel="Aksesuar & Takı"
                    onSwap={() => onSwapPiece(currentOutfit.day, 'accessory')}
                    palette={palette}
                  />
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-stone-200 bg-stone-50/50 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-medium text-stone-600 mb-1">
                      Metal Aksesuar Tavsiyesi
                    </span>
                    <p className="text-[11px] text-stone-500">
                      {palette.bestMetals.join(', ')} tonlarında bir kolye veya saat ekleyin.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Daily Summary bar */}
            <div className="p-4 bg-stone-100/70 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>
                  Bu kombin, <strong>{palette.nameTr}</strong> alt tonunuza göre yüzünüze doğrudan ışıltı katacak ve iş ortamında profesyonel bir duruş sağlayacaktır.
                </span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-stone-400">Tavsiye Edilen Takı: </span>
                <strong className="text-stone-900">{palette.bestMetals[0]}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Schedule Overview (All 7 Days Cards) */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Tüm Haftanın Kombin Takvimi
            </h3>
            <p className="text-xs sm:text-sm text-stone-500">
              Pazartesi'den Pazar'a tek bakışta haftalık stil rehberiniz
            </p>
          </div>
          <button
            onClick={handleRegenerateWithCelebration}
            className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-stone-950 font-medium px-3 py-1.5 rounded border border-stone-200 bg-white hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Kombinleri Yeniden Dağıt</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {outfits.map((outfit) => {
            const isSelected = outfit.day === selectedDay;
            return (
              <div
                key={outfit.day}
                onClick={() => setSelectedDay(outfit.day)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer bg-white group flex flex-col justify-between ${
                  isSelected
                    ? 'border-stone-900 ring-2 ring-stone-900 shadow-md'
                    : 'border-stone-200 hover:border-stone-400 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-900 transition-colors">
                      {outfit.dayLabelTr}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      %{outfit.harmonyScore}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-500 line-clamp-1 mb-3">
                    {outfit.occasion}
                  </p>

                  {/* Thumbnail Row of Pieces */}
                  <div className="grid grid-cols-3 gap-1.5 mb-3">
                    <div className="aspect-square bg-stone-100 rounded overflow-hidden relative border border-stone-200">
                      {outfit.top.imageUrl ? (
                        <img
                          src={outfit.top.imageUrl}
                          alt={outfit.top.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full"
                          style={{ backgroundColor: outfit.top.colorHex }}
                        />
                      )}
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] px-1 truncate text-center">
                        Üst
                      </span>
                    </div>

                    <div className="aspect-square bg-stone-100 rounded overflow-hidden relative border border-stone-200">
                      {outfit.bottom.imageUrl ? (
                        <img
                          src={outfit.bottom.imageUrl}
                          alt={outfit.bottom.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full"
                          style={{ backgroundColor: outfit.bottom.colorHex }}
                        />
                      )}
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] px-1 truncate text-center">
                        Alt
                      </span>
                    </div>

                    <div className="aspect-square bg-stone-100 rounded overflow-hidden relative border border-stone-200">
                      {outfit.shoes.imageUrl ? (
                        <img
                          src={outfit.shoes.imageUrl}
                          alt={outfit.shoes.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full"
                          style={{ backgroundColor: outfit.shoes.colorHex }}
                        />
                      )}
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] px-1 truncate text-center">
                        Ayakkabı
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                    {outfit.stylistNote}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="text-[11px] text-stone-400">
                    {outfit.outerwear ? '+ Ceket Dahil' : 'Hafif Kombin'}
                  </span>
                  <span className="text-stone-900 font-medium group-hover:underline flex items-center gap-1">
                    Görüntüle <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Subcomponent for each piece inside the outfit
interface PieceCardProps {
  piece: ClothingItem;
  roleLabel: string;
  onSwap: () => void;
  isFaceFraming?: boolean;
  palette: any;
}

const PieceCard: React.FC<PieceCardProps> = ({
  piece,
  roleLabel,
  onSwap,
  isFaceFraming,
  palette,
}) => {
  const affinity = calculateItemPaletteAffinity(piece, palette);

  return (
    <div className="group/card bg-white rounded-xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:border-stone-300 transition-all shadow-2xs">
      <div>
        {/* Image Area with Fallback */}
        <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
          {piece.imageUrl ? (
            <img
              src={piece.imageUrl}
              alt={piece.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center p-3"
              style={{
                background: `linear-gradient(135deg, ${piece.colorHex}33 0%, ${piece.colorHex}66 100%)`,
              }}
            >
              <div
                className="w-10 h-10 rounded-full border-2 border-white shadow-xs mb-1"
                style={{ backgroundColor: piece.colorHex }}
              />
              <span className="text-[11px] font-medium text-stone-700">{piece.colorName}</span>
            </div>
          )}

          {/* Color tag on image */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-stone-900/80 backdrop-blur-xs text-white text-[10px]">
            <span
              className="w-2 h-2 rounded-full inline-block border border-white/20"
              style={{ backgroundColor: piece.colorHex }}
            />
            <span className="truncate max-w-[90px]">{piece.colorName}</span>
          </div>

          {isFaceFraming && (
            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-amber-500/90 text-white text-[9px] font-semibold uppercase tracking-wider backdrop-blur-xs">
              Yüz Çevresi
            </div>
          )}
        </div>

        {/* Piece info */}
        <div className="p-3">
          <div className="text-[11px] text-stone-500 flex items-center justify-between mb-0.5">
            <span>{roleLabel}</span>
            <span className="font-semibold text-stone-800">%{affinity.score} Uyum</span>
          </div>

          <h5 className="text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1">
            {piece.name}
          </h5>

          {piece.notes && (
            <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
              {piece.notes}
            </p>
          )}
        </div>
      </div>

      {/* Piece actions */}
      <div className="p-3 pt-0">
        <button
          onClick={onSwap}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 rounded border border-stone-200 transition-colors cursor-pointer"
          title="Gardıroptan bu parça yerine başka bir uyumlu seçenek getir"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-stone-500" />
          <span>Farklı Parça Dene</span>
        </button>
      </div>
    </div>
  );
};
