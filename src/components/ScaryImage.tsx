
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ScaryImageProps {
  imageUrl: string;
  isLoading: boolean;
}

const ScaryImage = ({ imageUrl, isLoading }: ScaryImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setLoaded(false);
      setImageError(false);
    }
  }, [imageUrl]);

  if (!imageUrl && !isLoading) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-gray-900 border-2 border-dashed border-gray-700 flex items-center justify-center h-[400px]">
        <div className="text-center p-6">
          <Icon name="Ghost" size={60} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-500">Нажмите кнопку, чтобы сгенерировать пугающее изображение</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-900">
      {isLoading || !loaded ? (
        <Skeleton className="h-[400px] w-full bg-gray-800 animate-pulse" />
      ) : null}
      
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt="Пугающее изображение"
          className={`w-full h-auto max-h-[600px] object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => setImageError(true)}
        />
      ) : null}

      {imageError && (
        <div className="flex flex-col items-center justify-center h-[400px] text-red-500">
          <Icon name="AlertCircle" size={48} className="mb-4" />
          <p className="text-center mb-4">Не удалось загрузить изображение</p>
          <Button variant="destructive" onClick={() => window.location.reload()}>
            <Icon name="RefreshCw" className="mr-2" />
            Попробовать снова
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScaryImage;
