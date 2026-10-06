import React, { useState, useRef } from 'react';
import { X, Camera, Upload, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import { ClothingCategory, ClothingItem, SeasonSuitability, StyleVibe, SubSeason } from '../types/stylist';
import { SEASONAL_PALETTES } from '../data/seasonalPalettes';
import { extractDominantColor, getFriendlyColorName } from '../utils/imageColorExtractor';
import { calculateItemPaletteAffinity } from '../utils/colorMatcher';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: ClothingItem) => void;
  currentSeason: SubSeason;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  onAddItem,
  currentSeason,
}) => {
  const palette = SEASONAL_PALETTES[currentSeason];

  const [name, setName] = useState('');
  const [category, setCategory] = useState<ClothingCategory>('top');
  const [colorHex, setColorHex] = useState(palette.keyColors[0].hex);
  const [colorName, setColorName] = useState(palette.keyColors[0].name);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedVibes, setSelectedVibes] = useState<StyleVibe[]>(['smart_casual', 'formal']);
  const [seasonSuitability, setSeasonSuitability] = useState<SeasonSuitability>('all');
  const [notes, setNotes] = useState('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle image upload & automatic color extraction
  const handleImageFile = async (file: File) => {
    setIsProcessingImage(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setImagePreview(dataUrl);

      // Extract dominant color from image
      try {
        const detectedHex = await extractDominantColor(dataUrl);
        setColorHex(detectedHex);
        const friendly = getFriendlyColorName(detectedHex);
        setColorName(friendly);
        if (!name) {
          setName(`${friendly} ${getCategoryDefaultName(category)}`);
        }
      } catch (err) {
        // Keep fallback
      } finally {
        setIsProcessingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const getCategoryDefaultName = (cat: ClothingCategory) => {
    switch (cat) {
      case 'top':
        return 'Gömlek / Bluz';
      case 'bottom':
        return 'Pantolon';
      case 'outerwear':
        return 'Ceket / Blazer';
      case 'shoes':
        return 'Ayakkabı';
      case 'accessory':
        return 'Aksesuar';
    }
  };

  const toggleVibe = (vibe: StyleVibe) => {
    if (selectedVibes.includes(vibe)) {
      if (selectedVibes.length > 1) {
        setSelectedVibes(selectedVibes.filter((v) => v !== vibe));
      }
    } else {
      setSelectedVibes([...selectedVibes, vibe]);
    }
  };

  const tempItem: ClothingItem = {
    id: 'temp',
    name: name || 'Yeni Parça',
    category,
    colorHex,
    colorName,
    styleVibe: selectedVibes,
    seasonSuitability,
    createdAt: Date.now(),
  };

  const affinity = calculateItemPaletteAffinity(tempItem, palette);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: ClothingItem = {
      id: `w-${Date.now()}`,
      name: name.trim(),
      category,
      colorHex,
      colorName: colorName || getFriendlyColorName(colorHex),
      imageUrl: imagePreview || undefined,
      styleVibe: selectedVibes,
      seasonSuitability,
      notes: notes.trim() || undefined,
      createdAt: Date.now(),
    };

    onAddItem(newItem);
    onClose();

    // Reset fields
    setName('');
    setImagePreview(null);
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-[#FAF9F5] rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-white">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
              Gardıroba Kıyafet Ekle
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Fotoğraf yükleyin veya kamera ile çekin; renk tonu otomatik algılanacaktır
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Photo upload zone */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Kıyafet Fotoğrafı (Kamera veya Dosya)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Photo Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[160px] ${
                  imagePreview
                    ? 'border-stone-300 bg-stone-50'
                    : 'border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50/50'
                }`}
              >
                {imagePreview ? (
                  <div className="relative w-full h-36 flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Kıyafet Önizleme"
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain rounded-md shadow-xs"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center rounded-md transition-opacity text-white text-xs font-medium">
                      Fotoğrafı Değiştir
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 py-4">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-500">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-stone-800">
                        Fotoğraf Seç veya Sürükle
                      </span>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        PNG, JPG veya WEBP
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions (Camera vs presets) */}
              <div className="flex flex-col justify-between gap-2 bg-white p-4 rounded-xl border border-stone-200">
                <div>
                  <span className="text-xs font-medium text-stone-900 block mb-1">
                    Hızlı Çekim & Algılama
                  </span>
                  <p className="text-xs text-stone-500 leading-relaxed mb-3">
                    Kıyafetinizi düz bir zemin üzerine serip doğal ışıkta çekerseniz renk algılama en yüksek doğrulukla çalışır.
                  </p>
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200/80 rounded border border-stone-200 transition-colors cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-stone-600" />
                    <span>Kamerayla Fotoğraf Çek</span>
                  </button>
                </div>

                {isProcessingImage && (
                  <div className="text-xs text-amber-800 flex items-center gap-1.5 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Görselden kumaş rengi algılanıyor...</span>
                  </div>
                )}

                {/* Hidden Inputs */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageFile(file);
                  }}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageFile(file);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Item Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
              Kıyafet İsmi / Başlığı
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn: İtalyan Kesim Camel Blazer, Ekru İpek Bluz"
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900 focus:border-stone-900 transition-all text-stone-900 placeholder:text-stone-400"
            />
          </div>

          {/* Category selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
              Kategori
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'top' as ClothingCategory, label: 'Üst Giyim' },
                { id: 'bottom' as ClothingCategory, label: 'Alt Giyim' },
                { id: 'outerwear' as ClothingCategory, label: 'Dış Giyim' },
                { id: 'shoes' as ClothingCategory, label: 'Ayakkabı' },
                { id: 'accessory' as ClothingCategory, label: 'Aksesuar' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all cursor-pointer text-center ${
                    category === c.id
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color detection & swatch picker */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Kıyafet Rengi & Palet Uyumu
                </label>
                <span className="text-xs text-stone-500">
                  Algılanan veya seçilen renk tonu
                </span>
              </div>
              {/* Color preview circle with color picker */}
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colorHex}
                  onChange={(e) => {
                    setColorHex(e.target.value);
                    setColorName(getFriendlyColorName(e.target.value));
                  }}
                  className="w-8 h-8 rounded-full border border-stone-300 cursor-pointer p-0 overflow-hidden"
                  title="Özel renk seç"
                />
                <input
                  type="text"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  placeholder="Renk Adı"
                  className="w-32 text-xs px-2.5 py-1.5 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            {/* Quick Palette Recommendations Swatches */}
            <div>
              <span className="text-[11px] font-medium text-stone-500 mb-1.5 block">
                {palette.nameTr} Paletinden Hızlı Seçim:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[...palette.keyColors, ...palette.neutralColors].map((swatch, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setColorHex(swatch.hex);
                      setColorName(swatch.name);
                    }}
                    className={`flex items-center gap-1.5 px-2 py-1 text-[11px] rounded border transition-all cursor-pointer ${
                      colorHex.toLowerCase() === swatch.hex.toLowerCase()
                        ? 'border-stone-900 bg-stone-100 font-semibold ring-1 ring-stone-900'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/10 inline-block"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span>{swatch.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Stylist Palette Match Score */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-600">
                {palette.nameTr} Skalasına Uygunluk:
              </span>
              <div className="flex items-center gap-1.5 font-medium">
                <span
                  className={
                    affinity.score >= 80
                      ? 'text-emerald-700'
                      : affinity.score >= 60
                      ? 'text-amber-700'
                      : 'text-stone-600'
                  }
                >
                  %{affinity.score} Uyum
                </span>
                {affinity.isFaceBest && (
                  <span className="text-amber-800 text-[11px] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    Yüzü Aydınlatan Renk
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Style vibe tags */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
              Stil & Kullanım Ortamı
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'formal' as StyleVibe, label: 'Ofis & Kurumsal' },
                { id: 'smart_casual' as StyleVibe, label: 'Smart Casual' },
                { id: 'casual' as StyleVibe, label: 'Rahat Hafta Sonu' },
                { id: 'evening' as StyleVibe, label: 'Akşam & Şık Davet' },
              ].map((v) => {
                const active = selectedVibes.includes(v.id);
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => toggleVibe(v.id)}
                    className={`py-1.5 px-3 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      active
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
              Stilist Notu (İsteğe Bağlı)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Örn: Keten kumaş, omuzları rahat, dökümlü kesim"
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 text-stone-900"
            />
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            İptal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors cursor-pointer"
          >
            Gardıroba Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};
