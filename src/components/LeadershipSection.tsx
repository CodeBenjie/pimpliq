import React, { useState, useEffect, useRef } from 'react';
import { DIRECTORS } from '../data/pimpliqData';
import { Sparkles, CheckCircle2, Quote, Upload, Camera, Trash2, Download, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LeadershipSection: React.FC = () => {
  // Store custom uploaded photos in localStorage
  const [uploadedPhotos, setUploadedPhotos] = useState<Record<string, string>>({});
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    try {
      const savedPhotos: Record<string, string> = {};
      DIRECTORS.forEach((d) => {
        const stored = localStorage.getItem(`pimpliq_photo_${d.id}`);
        if (stored) {
          savedPhotos[d.id] = stored;
        }
      });
      setUploadedPhotos(savedPhotos);
    } catch {
      // Storage access error fallback
    }
  }, []);

  const showNotification = (msg: string) => {
    setActiveNotification(msg);
    setTimeout(() => {
      setActiveNotification(null);
    }, 4000);
  };

  const processAndSaveFile = (directorId: string, directorName: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      showNotification('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) return;

      // Compress slightly via canvas to ensure localStorage limits are respected
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

          try {
            localStorage.setItem(`pimpliq_photo_${directorId}`, dataUrl);
            setUploadedPhotos((prev) => ({ ...prev, [directorId]: dataUrl }));
            showNotification(`✓ Photo updated for ${directorName}!`);
          } catch {
            showNotification('Image size is too large for local cache. Please try a smaller photo.');
          }
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (directorId: string, directorName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processAndSaveFile(directorId, directorName, files[0]);
    }
  };

  const handleDrop = (directorId: string, directorName: string, e: React.DragEvent) => {
    e.preventDefault();
    setDragOverId(null);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processAndSaveFile(directorId, directorName, e.dataTransfer.files[0]);
    }
  };

  const handleRemovePhoto = (directorId: string, directorName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.removeItem(`pimpliq_photo_${directorId}`);
      setUploadedPhotos((prev) => {
        const next = { ...prev };
        delete next[directorId];
        return next;
      });
      showNotification(`Reset photo for ${directorName}`);
    } catch {
      // Storage error fallback
    }
  };

  const handleDownloadNamedFile = (directorId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const photoData = uploadedPhotos[directorId];
    if (!photoData) return;

    const defaultFilename = directorId === 'dir-2' ? 'sarah_nakate.jpg' : 'nabasa_moreen.jpg';
    const link = document.createElement('a');
    link.href = photoData;
    link.download = defaultFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification(`Downloaded ${defaultFilename} for Git!`);
  };

  return (
    <section id="leadership" className="py-20 md:py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-[#0F172A] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#D4AF37] flex items-center gap-3 text-sm font-semibold"
          >
            <Check className="w-5 h-5 text-[#E8C860]" />
            <span>{activeNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--color-gold-bg)] text-[#A4811B] dark:text-[#E8C860] border border-[#D4AF37]/30 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            EXECUTIVE LEADERSHIP
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-main)] tracking-tight mb-4">
            Meet the Directors
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            The visionary leaders steering Pimpliq Consultancy Ltd to deliver transformative brand management, executive advisory, and corporate growth across East Africa.
          </p>
        </div>

        {/* Directors Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {DIRECTORS.map((director, index) => {
            const hasCustomPhoto = !!uploadedPhotos[director.id];
            const currentImgSrc = uploadedPhotos[director.id] || director.imageUrl;
            const targetFilename = director.id === 'dir-2' ? 'sarah_nakate.jpg' : 'nabasa_moreen.jpg';
            const isDragging = dragOverId === director.id;

            return (
              <motion.div
                key={director.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-[var(--bg-card)] rounded-3xl overflow-hidden border border-[var(--border-color)] hover:border-[#D4AF37]/50 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col sm:flex-row group relative"
              >
                {/* Hidden File Input */}
                <input
                  id={`file-input-${director.id}`}
                  type="file"
                  accept="image/*"
                  ref={(el) => (fileInputRefs.current[director.id] = el)}
                  onChange={(e) => handleFileChange(director.id, director.name, e)}
                  className="hidden"
                />

                {/* Director Portrait & Dropzone Column */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverId(director.id);
                  }}
                  onDragLeave={() => setDragOverId(null)}
                  onDrop={(e) => handleDrop(director.id, director.name, e)}
                  className={`w-full sm:w-5/12 relative overflow-hidden aspect-[3/4] sm:aspect-auto sm:min-h-[480px] shrink-0 flex items-center justify-center transition-all ${
                    isDragging
                      ? 'bg-[#1A6B74]/30 border-2 border-dashed border-[#D4AF37]'
                      : 'bg-gradient-to-br from-[#0F172A] via-[#1A6B74]/20 to-[#0F172A]'
                  }`}
                >
                  {/* Photo Display */}
                  <img
                    id={`director-img-${director.id}`}
                    src={currentImgSrc}
                    alt={`${director.name} - ${director.role}`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const placeholder = document.getElementById(`director-fallback-${director.id}`);
                      if (placeholder) placeholder.style.display = 'flex';
                    }}
                    onLoad={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'block';
                      const placeholder = document.getElementById(`director-fallback-${director.id}`);
                      if (placeholder) placeholder.style.display = 'none';
                    }}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02] ${
                      director.id === 'dir-2' ? 'object-[center_20%]' : 'object-[center_15%]'
                    }`}
                  />

                  {/* Fallback Monogram Avatar if image not found */}
                  <div
                    id={`director-fallback-${director.id}`}
                    className="absolute inset-0 flex-col items-center justify-center p-6 text-center text-white hidden bg-gradient-to-br from-slate-950 via-[#1A6B74]/30 to-slate-900"
                  >
                    <div className="w-24 h-24 rounded-full bg-[#1A6B74]/40 border-2 border-[#D4AF37] flex items-center justify-center mb-4 shadow-xl">
                      <span className="text-3xl font-extrabold text-[#E8C860]">
                        {director.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-white">{director.name}</div>
                    <div className="text-xs text-[#E8C860] mt-1 font-semibold">{director.role}</div>

                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[director.id]?.click()}
                      className="mt-4 px-4 py-2 bg-[#D4AF37] hover:bg-[#E8C860] text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      Upload Photo
                    </button>
                  </div>

                  {/* Floating Action Button (Always Accessible on Hover / Touch) */}
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                    <button
                      type="button"
                      id={`btn-upload-${director.id}`}
                      title={`Upload photo for ${director.name}`}
                      onClick={() => fileInputRefs.current[director.id]?.click()}
                      className="p-2.5 rounded-full bg-slate-900/85 hover:bg-[#D4AF37] text-white hover:text-slate-950 backdrop-blur-md border border-white/20 hover:border-[#D4AF37] shadow-xl transition-all duration-300 cursor-pointer active:scale-95 flex items-center gap-1.5 text-xs font-bold"
                    >
                      <Camera className="w-4 h-4 text-[#E8C860] hover:text-slate-950" />
                      <span className="hidden sm:inline pr-1">Upload</span>
                    </button>

                    {hasCustomPhoto && (
                      <>
                        <button
                          type="button"
                          id={`btn-download-${director.id}`}
                          title={`Download as ${targetFilename}`}
                          onClick={(e) => handleDownloadNamedFile(director.id, e)}
                          className="p-2.5 rounded-full bg-slate-900/85 hover:bg-[#1A6B74] text-[#E8C860] hover:text-white backdrop-blur-md border border-white/20 shadow-xl transition-all duration-300 cursor-pointer active:scale-95"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          id={`btn-reset-${director.id}`}
                          title="Remove custom photo"
                          onClick={(e) => handleRemovePhoto(director.id, director.name, e)}
                          className="p-2.5 rounded-full bg-red-900/80 hover:bg-red-600 text-white backdrop-blur-md border border-red-500/30 shadow-xl transition-all duration-300 cursor-pointer active:scale-95"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Drag and drop overlay visual feedback */}
                  {isDragging && (
                    <div className="absolute inset-0 bg-[#1A6B74]/80 backdrop-blur-sm flex flex-col items-center justify-center text-white z-30 p-4 text-center pointer-events-none">
                      <Upload className="w-12 h-12 text-[#E8C860] animate-bounce mb-2" />
                      <div className="font-bold text-base">Drop photo here</div>
                      <div className="text-xs text-slate-200 mt-1">Accepts JPG, PNG, WebP</div>
                    </div>
                  )}

                  {/* Mobile-only subtle bottom gradient for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent sm:hidden pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 text-white sm:hidden pointer-events-none">
                    <div className="text-xs font-bold text-[#E8C860] uppercase tracking-wider">{director.role}</div>
                    <h3 className="text-xl font-bold">{director.name}</h3>
                  </div>
                </div>

                {/* Director Details Column */}
                <div className="w-full sm:w-7/12 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="hidden sm:block mb-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-teal-bg)] text-[#1A6B74] dark:text-[#2BA0AD] mb-2 transition-transform duration-300 group-hover:translate-x-1">
                        {director.role}
                      </span>
                      <h3 className="text-2xl font-extrabold text-[var(--text-main)] tracking-tight group-hover:text-[#1A6B74] dark:group-hover:text-[#E8C860] transition-colors duration-300">
                        {director.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#D4AF37] mt-0.5">
                        {director.title}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                      {director.bio}
                    </p>

                    {/* Expertise Tags */}
                    <div className="mb-6">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
                        Core Strategic Focus
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {director.expertise.map((item, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--bg-tertiary)] text-[var(--text-main)] border border-[var(--border-color)] group-hover:border-[#D4AF37]/30 transition-colors duration-300"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#1A6B74] dark:text-[#E8C860]" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Upload Callout Button for Ease of Use */}
                    <div className="mb-6 pt-3 border-t border-[var(--border-color)] flex items-center justify-between flex-wrap gap-2">
                      <button
                        type="button"
                        id={`btn-card-upload-${director.id}`}
                        onClick={() => fileInputRefs.current[director.id]?.click()}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[var(--bg-tertiary)] hover:bg-[#D4AF37] text-[var(--text-main)] hover:text-slate-950 border border-[var(--border-color)] hover:border-[#D4AF37] shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#1A6B74] dark:text-[#E8C860] group-hover:text-slate-950" />
                        {hasCustomPhoto ? 'Change Photo' : `Upload ${director.name}'s Photo`}
                      </button>

                      {hasCustomPhoto && (
                        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Custom photo active
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Director Leadership Quote */}
                  {director.quote && (
                    <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] border-l-4 border-l-[#D4AF37] relative group-hover:shadow-md transition-shadow duration-300 mt-2">
                      <Quote className="w-4 h-4 text-[#D4AF37] mb-1.5 opacity-80" />
                      <p className="text-xs italic text-[var(--text-main)] leading-relaxed">
                        "{director.quote}"
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
