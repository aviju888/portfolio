'use client';

import { useState, useEffect, useRef } from 'react';

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Photo {
  id: string;
  srcThumb: string;
  srcFull: string;
  title: string;
  visible: boolean;
  orientation: string;
  dateTaken: string;
  album: string;
  blurDataURL?: string;
  cropArea?: CropArea; // Stored crop coordinates (percentages)
  [key: string]: any;
}

export default function AdminPhotosPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [cropPhoto, setCropPhoto] = useState<Photo | null>(null);
  const [cropArea, setCropArea] = useState<CropArea | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const ADMIN_PASSWORD = 'chronos2026';

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/photos');
      const data = await res.json();
      setPhotos(data.photos || []);
      setAlbums(data.albums || []);
    } catch (e) {
      setMessage('Failed to load photos');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) {
      fetchPhotos();
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      setMessage('Wrong password');
    }
  };

  const toggleSelection = (id: string) => {
    setPhotos(photos.map(p =>
      p.id === id ? { ...p, visible: !p.visible } : p
    ));
  };

  const downloadJSON = () => {
    const data = { photos, albums };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'photos.json';
    a.click();
    URL.revokeObjectURL(url);
    setMessage('Downloaded! Replace data/photos.json and push to deploy.');
  };

  const openCropEditor = (photo: Photo) => {
    setCropPhoto(photo);
    setImageLoaded(false);
    // Load existing crop if any
    if (photo.cropArea) {
      setCropArea(photo.cropArea);
    } else {
      setCropArea(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageRef.current || !imageLoaded) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDragStart({ x, y });
    setCropArea({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStart || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
    const y = Math.min(Math.max(0, e.clientY - rect.top), rect.height);

    setCropArea({
      x: Math.min(dragStart.x, x),
      y: Math.min(dragStart.y, y),
      width: Math.abs(x - dragStart.x),
      height: Math.abs(y - dragStart.y)
    });
  };

  const handleMouseUp = () => {
    setDragStart(null);
  };

  const saveCrop = () => {
    if (!cropPhoto || !cropArea || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();

    // Store crop as percentages so it works regardless of display size
    const cropPercentage: CropArea = {
      x: (cropArea.x / rect.width) * 100,
      y: (cropArea.y / rect.height) * 100,
      width: (cropArea.width / rect.width) * 100,
      height: (cropArea.height / rect.height) * 100
    };

    setPhotos(photos.map(p =>
      p.id === cropPhoto.id ? { ...p, cropArea: cropPercentage } : p
    ));

    setMessage(`Crop saved for ${cropPhoto.title}. Download JSON to apply.`);
    setCropPhoto(null);
  };

  const clearCrop = () => {
    if (!cropPhoto) return;

    setPhotos(photos.map(p =>
      p.id === cropPhoto.id ? { ...p, cropArea: undefined } : p
    ));
    setCropArea(null);
    setMessage(`Crop cleared for ${cropPhoto.title}.`);
  };

  const selectedCount = photos.filter(p => p.visible).length;
  const totalCount = photos.length;

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {message && <p className="text-red-500 text-sm mb-4">{message}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Photo Admin</h1>
            <p className="text-sm text-gray-500">
              {selectedCount} of {totalCount} selected
            </p>
          </div>
          <div className="flex items-center gap-4">
            {message && (
              <span className="text-sm text-green-600 max-w-xs truncate">
                {message}
              </span>
            )}
            <button
              onClick={downloadJSON}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Download JSON
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <p className="text-sm text-gray-600 bg-white rounded-lg p-3 shadow-sm">
          Click photos to select/deselect. Only selected photos appear on the live site.
          Use "Crop" to adjust framing without modifying the original file.
        </p>
      </div>

      {/* Photo Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="break-inside-avoid mb-4 relative group"
              >
                {/* Photo with click to toggle */}
                <div
                  onClick={() => toggleSelection(photo.id)}
                  className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                    photo.visible
                      ? 'ring-4 ring-green-500 ring-offset-2'
                      : 'opacity-50 hover:opacity-75'
                  }`}
                >
                  <img
                    src={photo.srcThumb}
                    alt={photo.title}
                    className="w-full h-auto"
                  />

                  {/* Checkmark for selected */}
                  {photo.visible && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}

                  {/* Crop indicator */}
                  {photo.cropArea && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow">
                      Cropped
                    </div>
                  )}
                </div>

                {/* Crop button - separate from selection */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openCropEditor(photo);
                  }}
                  className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-gray-700 text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Crop
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Crop Modal */}
      {cropPhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold">Crop Photo</h2>
              <button
                onClick={() => setCropPhoto(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-500 mb-4">
                Click and drag to select the visible area. The original image is preserved.
              </p>

              <div
                className="relative inline-block cursor-crosshair select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  ref={imageRef}
                  src={cropPhoto.srcFull}
                  alt={cropPhoto.title}
                  className="max-w-full max-h-[60vh]"
                  draggable={false}
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Crop overlay */}
                {imageLoaded && cropArea && cropArea.width > 0 && cropArea.height > 0 && (
                  <>
                    <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                    <div
                      className="absolute border-2 border-white pointer-events-none bg-transparent"
                      style={{
                        left: cropArea.x,
                        top: cropArea.y,
                        width: cropArea.width,
                        height: cropArea.height,
                        boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)'
                      }}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="p-4 border-t flex justify-between">
              <button
                onClick={clearCrop}
                className="px-4 py-2 text-red-600 hover:text-red-800"
              >
                Clear Crop
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setCropPhoto(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={saveCrop}
                  disabled={!cropArea || cropArea.width < 10}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                  Save Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
