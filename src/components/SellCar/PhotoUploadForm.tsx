import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload, Camera, CarFront, Image, Images } from "lucide-react";

interface PhotoUploadFormProps {
  onPrevious: () => void;
  onNext: (photos: File[]) => void;
}

type PhotoCategory = "front" | "back" | "side" | "other";

interface PhotoData {
  id: string;
  file: File | null;
  url: string | null;
  category: PhotoCategory;
  uploaded: boolean;
}

const PHOTO_CATEGORIES = [
  { id: "front", label: "Front View", icon: CarFront, required: true },
  { id: "back", label: "Back View", icon: CarFront, required: true },
  { id: "side", label: "Side View", icon: CarFront, required: true },
  {
    id: "other",
    label: "Other Relevant Photos",
    icon: Images,
    required: false,
  },
];

const PhotoUploadForm = ({ onPrevious, onNext }: PhotoUploadFormProps) => {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>("front");
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");

  const getPhotosForCategory = (category: PhotoCategory) => {
    return photos.filter((photo) => photo.category === category);
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: PhotoCategory
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newPhoto: PhotoData = {
        id: `${category}-${Date.now()}`,
        file: file,
        url: URL.createObjectURL(file),
        category: category,
        uploaded: true,
      };

      // Replace existing photo if it's a required category
      if (category !== "other" && getPhotosForCategory(category).length > 0) {
        setPhotos((prevPhotos) =>
          prevPhotos.filter((p) => p.category !== category).concat(newPhoto)
        );
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
      }
    }
  };

  const removePhoto = (photoId: string) => {
    setPhotos((prevPhotos) => {
      const photoToRemove = prevPhotos.find((p) => p.id === photoId);
      if (photoToRemove?.url) {
        URL.revokeObjectURL(photoToRemove.url);
      }
      return prevPhotos.filter((p) => p.id !== photoId);
    });
  };

  const handleContinue = () => {
    // Create array of files to pass to the next step
    const photoFiles = photos
      .filter((p) => p.file !== null)
      .map((p) => p.file) as File[];

    onNext(photoFiles);
  };

  const isRequiredPhotosUploaded = () => {
    const requiredCategories = PHOTO_CATEGORIES.filter(
      (cat) => cat.required
    ).map((cat) => cat.id) as PhotoCategory[];

    return requiredCategories.every(
      (cat) => getPhotosForCategory(cat).length > 0
    );
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "carousel" : "grid");
  };

  return (
    <div className="py-6 animate-fade-in">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold">Vehicle Photos</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Photos significantly increase your chances of selling your vehicle.
        Please upload clear photos from different angles.
      </p>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Photo Tips:</h3>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>Clean your vehicle before taking photos</li>
          <li>Take photos in good lighting conditions</li>
          <li>Capture all key angles (front, back, side)</li>
          <li>Include photos of the interior and any special features</li>
          <li>Focus on any unique selling points or modifications</li>
        </ul>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex overflow-x-auto space-x-4">
          {PHOTO_CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`py-3 px-4 border-b-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap transition-colors
                ${
                  activeCategory === category.id
                    ? "border-[#2596be] text-[#2596be]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              onClick={() => setActiveCategory(category.id as PhotoCategory)}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
              {category.required && <span className="text-red-500">*</span>}
              {getPhotosForCategory(category.id as PhotoCategory).length >
                0 && (
                <span className="bg-[#2596be] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getPhotosForCategory(category.id as PhotoCategory).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active Category Upload Area */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">
            {PHOTO_CATEGORIES.find((cat) => cat.id === activeCategory)?.label}
            {PHOTO_CATEGORIES.find((cat) => cat.id === activeCategory)
              ?.required && <span className="text-[#2596be]">*</span>}
          </h3>
          {getPhotosForCategory(activeCategory).length > 0 && (
            <Button
              onClick={toggleViewMode}
              variant="outline"
              className="flex items-center gap-2"
            >
              {viewMode === "grid" ? (
                <>
                  <Image className="h-4 w-4" />
                  <span>Carousel View</span>
                </>
              ) : (
                <>
                  <Images className="h-4 w-4" />
                  <span>Grid View</span>
                </>
              )}
            </Button>
          )}
        </div>

        {getPhotosForCategory(activeCategory).length === 0 ? (
          <div className="border-2 border-dashed rounded-lg p-8 text-center mb-4 border-gray-300">
            <div className="flex flex-col items-center">
              <Camera className="h-10 w-10 text-gray-400 mb-3" />
              <p className="text-lg mb-2">
                {activeCategory === "other"
                  ? "Add more photos"
                  : `Upload ${activeCategory} view`}
              </p>
              <p className="text-gray-500 text-sm mb-4">JPG or PNG, max 5MB</p>
              <label className="bg-btn-primary hover:bg-btn-secondary text-btn-textPrimary font-medium py-2 px-4 rounded cursor-pointer transition-colors">
                Select Photo
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e, activeCategory)}
                />
              </label>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {getPhotosForCategory(activeCategory).map((photo) => (
              <div key={photo.id} className="relative group">
                <div className="rounded-lg overflow-hidden border border-gray-200 aspect-w-4 aspect-h-3">
                  {photo.url && (
                    <img
                      src={photo.url}
                      alt={`${activeCategory} view`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <button
                  onClick={() => removePhoto(photo.id)}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                  aria-label="Remove photo"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}

            {activeCategory === "other" && (
              <div className="border-2 border-dashed rounded-lg aspect-w-4 aspect-h-3 flex flex-col items-center justify-center">
                <label className="cursor-pointer flex flex-col items-center p-4">
                  <Camera className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-gray-500">Add more</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, activeCategory)}
                  />
                </label>
              </div>
            )}
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
            {/* Simple carousel implementation */}
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              {getPhotosForCategory(activeCategory)[0]?.url && (
                <img
                  src={getPhotosForCategory(activeCategory)[0].url || ""}
                  alt={`${activeCategory} view`}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Progress Summary */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Upload Progress:</h4>
        <div className="space-y-2">
          {PHOTO_CATEGORIES.map((category) => {
            const count = getPhotosForCategory(
              category.id as PhotoCategory
            ).length;
            const isRequired = category.required;
            return (
              <div
                key={category.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <category.icon className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{category.label}</span>
                  {isRequired && <span className="text-red-500 ml-1">*</span>}
                </div>
                <div className="flex items-center">
                  <span
                    className={`font-medium ${
                      count > 0
                        ? "text-green-500"
                        : isRequired
                        ? "text-[#2596be]"
                        : "text-gray-500"
                    }`}
                  >
                    {count} {count === 1 ? "photo" : "photos"}
                  </span>
                  {count === 0 && isRequired && (
                    <Button
                      variant="link"
                      size="sm"
                      className="ml-2 text-[#2595be94] p-0"
                      onClick={() =>
                        setActiveCategory(category.id as PhotoCategory)
                      }
                    >
                      Upload
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious} className="hover:bg-gray-100">
          Back to Details
        </Button>
        <Button
          onClick={handleContinue}
          variant="primary"
          className=""
          disabled={!isRequiredPhotosUploaded()}
        >
          Next: Selling Method
        </Button>
      </div>
    </div>
  );
};

export default PhotoUploadForm;
