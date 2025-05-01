
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ScaryImage from "@/components/ScaryImage";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scaryImage, setScaryImage] = useState("");

  const generateScaryImage = () => {
    setIsLoading(true);
    
    // Имитация запроса к API генерации изображений
    // В реальном приложении здесь был бы запрос к API генерации изображений
    setTimeout(() => {
      // Генерируем случайное изображение через Unsplash с тематикой horror/scary
      const randomId = Math.floor(Math.random() * 1000);
      const imageUrl = `https://source.unsplash.com/random/800x600?horror,scary,dark,creepy&sig=${randomId}`;
      setScaryImage(imageUrl);
      setIsLoading(false);
    }, 1500);
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
                  <Icon name="Loader2" className="animate-spin" />
                  Генерация...
                </>
              ) : (
                <>
                  <Icon name="Skull" />
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
                <Icon name="RefreshCw" />
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
