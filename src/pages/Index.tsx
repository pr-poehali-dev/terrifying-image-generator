
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ScaryImage from "../components/ScaryImage";
import Layout from "../components/Layout";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scaryImage, setScaryImage] = useState("");

  const generateScaryImage = () => {
    setIsLoading(true);
    
    // Используем более надежный способ получения изображений
    const scaryKeywords = [
      "horror", "scary", "dark", "creepy", "nightmare", 
      "spooky", "terrifying", "eerie", "sinister", "haunted"
    ];
    
    // Выбираем случайное ключевое слово
    const randomKeyword = scaryKeywords[Math.floor(Math.random() * scaryKeywords.length)];
    // Добавляем случайный параметр для предотвращения кеширования
    const timestamp = new Date().getTime();
    const randomSize = Math.floor(Math.random() * 100) + 800; // случайный размер от 800 до 900
    
    // Формируем URL для получения изображения
    const imageUrl = `https://source.unsplash.com/${randomSize}x600?${randomKeyword}&sig=${timestamp}`;
    
    // Предзагрузка изображения для проверки доступности
    const img = new Image();
    img.onload = () => {
      setScaryImage(imageUrl);
      setIsLoading(false);
    };
    img.onerror = () => {
      // В случае ошибки пробуем другое ключевое слово
      const fallbackKeyword = "dark";
      const fallbackUrl = `https://source.unsplash.com/random/800x600?${fallbackKeyword}&sig=${timestamp}`;
      setScaryImage(fallbackUrl);
      setIsLoading(false);
    };
    img.src = imageUrl;
    
    // Добавляем таймаут на случай, если изображение загружается слишком долго
    setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 5000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Генератор страшных лиц</h1>
            <p className="text-lg text-gray-200 mb-6">
              Нажмите кнопку, чтобы сгенерировать случайное страшное изображение.
              Каждое изображение уникально и генерируется специально для вас.
            </p>
            
            <Button 
              onClick={generateScaryImage} 
              className="bg-red-700 hover:bg-red-800 text-white font-bold"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" />
                  Генерация...
                </>
              ) : (
                <>
                  <Icon name="Skull" className="mr-2" />
                  Сгенерировать страшное лицо
                </>
              )}
            </Button>
          </div>
          
          <ScaryImage imageUrl={scaryImage} isLoading={isLoading} />
          
          {scaryImage && (
            <div className="mt-6 text-center">
              <Button 
                onClick={generateScaryImage} 
                variant="outline" 
                className="border-red-600 text-red-600 hover:bg-red-900 hover:text-white"
              >
                <Icon name="RefreshCw" className="mr-2" />
                Сгенерировать другое
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
