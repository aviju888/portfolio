'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Photo {
  id: string;
  srcThumb: string;
  srcFull: string;
  title: string;
  visible: boolean;
  orientation: string;
  dateTaken: string;
  album: string;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function AdminPhotosPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [cropPhoto, setCropPhoto] = useState<Photo | null>(null);
  const [cropArea, setCropArea] = useState<CropArea | null>(null);
  const [cropping, setCropping] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/photos');
      const data = await res.json();
      setPhotos(data.photos || []);
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
    setAuthenticated(true);
  };

  const toggleVisibility = (id: string) => {
    setPhotos(photos.map(p =>
      p.id === id ? { ...p, visible: !p.visible } : p
    ));
  };

  const saveChanges = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, photos })
      });

      if (res.ok) {
        setMessage('Saved successfully!');
      } else {
        const data = await res.json();
        setMessage(data.error || 'Failed to save');
      }
    } catch (e) {
      setMessage('Failed to save');
    }
    setSaving(false);
  };

  const openCropEditor = (photo: Photo) => {
    setCropPhoto(photo);
    setCropArea(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
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

  const applyCrop = async () => {
    if (!cropPhoto || !cropArea || !imageRef.current) return;

    setCropping(true);
    try {
      const rect = imageRef.current.getBoundingClientRect();
      const scaleX = imageRef.current.naturalWidth / rect.width;
      const scaleY = imageRef.current.naturalHeight / rect.height;

      const res = await fetch('/api/photos/crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          photoId: cropPhoto.id,
          crop: {
            x: Math.round(cropArea.x * scaleX),
            y: Math.round(cropArea.y * scaleY),
            width: Math.round(cropArea.width * scaleX),
            height: Math.round(cropArea.height * scaleY)
          }
        })
      });

      if (res.ok) {
        setMessage('Cropped successfully!');
        setCropPhoto(null);
        // Refresh photos with cache bust
        await fetchPhotos();
      } else {
        setMessage('Failed to crop');
      }
    } catch (e) {
      setMessage('Failed to crop');
    }
    setCropping(false);
  };

  const visibleCount = photos.filter(p => p.visible).length;
  const hiddenCount = photos.filter(p => !p.visible).length;

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
              {visibleCount} visible, {hiddenCount} hidden
            </p>
          </div>
          <div className="flex items-center gap-4">
            {message && (
              <span className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </span>
            )}
            <button
              onClick={saveChanges}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className={`break-inside-avoid mb-4 relative group rounded-lg overflow-hidden ${
                  !photo.visible ? 'opacity-40' : ''
                }`}
              >
                <img
                  src={photo.srcThumb + '?v=' + Date.now()}
                  alt={photo.title}
                  className="w-full h-auto"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <button
                    onClick={() => toggleVisibility(photo.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      photo.visible
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {photo.visible ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => openCropEditor(photo)}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-900 hover:bg-gray-100 transition"
                  >
                    Crop
                  </button>
                </div>

                {/* Hidden badge */}
                {!photo.visible && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Hidden
                  </div>
                )}
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
                Click and drag to select the area you want to keep
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
                  src={cropPhoto.srcFull + '?v=' + Date.now()}
                  alt={cropPhoto.title}
                  className="max-w-full max-h-[60vh]"
                  draggable={false}
                />

                {/* Crop overlay */}
                {cropArea && cropArea.width > 0 && cropArea.height > 0 && (
                  <>
                    {/* Darkened areas */}
                    <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                    {/* Clear crop area */}
                    <div
                      className="absolute border-2 border-white pointer-events-none"
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

            <div className="p-4 border-t flex justify-end gap-3">
              <button
                onClick={() => setCropPhoto(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={applyCrop}
                disabled={!cropArea || cropArea.width < 10 || cropping}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                {cropping ? 'Cropping...' : 'Apply Crop'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
