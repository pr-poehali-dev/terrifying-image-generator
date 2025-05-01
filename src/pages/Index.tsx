
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
    
    // Используем надежные API для получения страшных изображений
    const scaryImageSources = [
      // Пиксабей API (без ключа API, открытый доступ)
      "https://pixabay.com/api/?key=40957173-23b05d6f4ad5ae80e3f0c8b87&q=scary+horror+dark+nightmare&image_type=photo&orientation=horizontal&per_page=100",
      // Альтернативные источники с прямыми URL к изображениям
      "https://images.unsplash.com/photo-1590005354167-6da97870c757",
      "https://images.unsplash.com/photo-1581337204873-ef36aa186caa",
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c",
      "https://images.unsplash.com/photo-1596003861584-4adf71bde6e4",
      "https://images.unsplash.com/photo-1533000759938-aa0ba70beceb",
      "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1",
      "https://images.unsplash.com/photo-1635776062127-d379bfcba9f9",
      "https://images.unsplash.com/photo-1604871000636-074fa5117945",
      "https://images.unsplash.com/photo-1535868463750-2646f8e65d0d"
    ];
    
    // Выбираем случайный URL из коллекции для разнообразия
    const randomIndex = Math.floor(Math.random() * (scaryImageSources.length - 1)) + 1;
    
    if (randomIndex === 0) {
      // Если выбран API Pixabay, делаем запрос и получаем случайное изображение
      fetch(scaryImageSources[0])
        .then(response => response.json())
        .then(data => {
          if (data.hits && data.hits.length > 0) {
            const randomHitIndex = Math.floor(Math.random() * data.hits.length);
            const imageUrl = data.hits[randomHitIndex].largeImageURL;
            setScaryImage(imageUrl);
          } else {
            // Если API не вернул изображения, используем резервный вариант
            const fallbackIndex = Math.floor(Math.random() * (scaryImageSources.length - 1)) + 1;
            setScaryImage(scaryImageSources[fallbackIndex]);
          }
          setIsLoading(false);
        })
        .catch(() => {
          // При ошибке API используем резервное изображение
          const fallbackIndex = Math.floor(Math.random() * (scaryImageSources.length - 1)) + 1;
          setScaryImage(scaryImageSources[fallbackIndex]);
          setIsLoading(false);
        });
    } else {
      // Используем прямой URL к изображению
      const imageUrl = scaryImageSources[randomIndex];
      
      // Предзагрузка изображения
      const img = new Image();
      img.onload = () => {
        setScaryImage(imageUrl);
        setIsLoading(false);
      };
      img.onerror = () => {
        // При ошибке загрузки пробуем другое изображение
        const fallbackIndex = (randomIndex % (scaryImageSources.length - 1)) + 1;
        setScaryImage(scaryImageSources[fallbackIndex]);
        setIsLoading(false);
      };
      img.src = imageUrl;
    }
    
    // Таймаут для предотвращения бесконечной загрузки
    setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        // При таймауте показываем одно из надежных изображений
        const fallbackIndex = Math.floor(Math.random() * (scaryImageSources.length - 1)) + 1;
        setScaryImage(scaryImageSources[fallbackIndex]);
      }
    }, 5000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-800 mb-4 animate-fade-in">
              Генератор страшных лиц
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in">
              Нажмите кнопку, чтобы сгенерировать случайное страшное изображение.
              Каждое изображение уникально и помогает погрузиться в мир ужасов.
            </p>
            
            <Button 
              onClick={generateScaryImage} 
              className="bg-gradient-to-r from-red-700 to-purple-900 hover:from-red-800 hover:to-purple-950 text-white font-bold shadow-lg shadow-red-900/20 hover:scale-105 transition-all duration-300"
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
          
          <div className="rounded-xl overflow-hidden shadow-2xl shadow-red-900/20 transition-all duration-300 animate-fade-in border border-gray-800">
            <ScaryImage imageUrl={scaryImage} isLoading={isLoading} />
          </div>
          
          {scaryImage && (
            <div className="mt-8 text-center animate-fade-in">
              <Button 
                onClick={generateScaryImage} 
                variant="outline" 
                className="border-red-600 text-red-500 hover:bg-red-900/20 hover:text-white transition-all duration-300 hover:scale-105"
                size="lg"
              >
                <Icon name="RefreshCw" className="mr-2" />
                Сгенерировать другое
              </Button>
              
              <p className="text-gray-400 mt-4 text-sm max-w-md mx-auto">
                Не все изображения одинаково страшные. Продолжайте генерировать, 
                чтобы найти самое пугающее!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
