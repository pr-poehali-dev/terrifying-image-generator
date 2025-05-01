
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

  const handleRetry = () => {
    if (imageUrl) {
      // Попытка загрузить изображение заново
      const img = new Image();
      img.onload = () => {
        setImageError(false);
        setLoaded(true);
        // Обновляем URL с новым параметром для обхода кеша
        window.location.reload();
      };
      img.onerror = () => {
        // Если изображение все равно не загружается, перезагружаем страницу
        window.location.reload();
      };
      img.src = imageUrl;
    } else {
      window.location.reload();
    }
  };

  if (!imageUrl && !isLoading) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 flex items-center justify-center h-[400px] group transition-all duration-500">
        <div className="text-center p-6 transform group-hover:scale-105 transition-transform duration-300">
          <Icon name="Ghost" size={60} className="mx-auto mb-4 text-gray-600 animate-pulse" />
          <p className="text-gray-500">Нажмите кнопку, чтобы сгенерировать пугающее изображение</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-900 to-black">
      {isLoading || !loaded ? (
        <div className="h-[400px] w-full">
          <Skeleton className="h-full w-full bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse" />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Icon name="ImageDown" size={40} className="mx-auto mb-2 animate-bounce" />
                <p className="animate-pulse">Загружаем страшное изображение...</p>
              </div>
            </div>
          )}
        </div>
      ) : null}
      
      {imageUrl && !imageError ? (
        <div className="relative group">
          <img
            src={imageUrl}
            alt="Пугающее изображение"
            className={`w-full h-auto max-h-[600px] object-cover transition-all duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-105 transition-transform duration-300`}
            onLoad={() => setLoaded(true)}
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <p className="text-white text-sm backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full">
              Пугающее изображение
            </p>
          </div>
        </div>
      ) : null}

      {imageError && (
        <div className="flex flex-col items-center justify-center h-[400px] text-red-500 bg-gray-900/50 backdrop-blur-sm">
          <Icon name="AlertCircle" size={48} className="mb-4" />
          <p className="text-center mb-4">Не удалось загрузить изображение</p>
          <Button 
            variant="destructive" 
            onClick={handleRetry}
            className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 shadow-lg shadow-red-900/20"
          >
            <Icon name="RefreshCw" className="mr-2" />
            Попробовать снова
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScaryImage;
