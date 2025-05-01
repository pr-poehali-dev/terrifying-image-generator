
import { useState } from 'react';
import Layout from '@/components/Layout';
import ScaryImage from '@/components/ScaryImage';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [imageCount, setImageCount] = useState(1);
  
  const handleAddImage = () => {
    if (imageCount < 3) {
      setImageCount(prev => prev + 1);
    }
  };

  const handleRemoveImage = () => {
    if (imageCount > 1) {
      setImageCount(prev => prev - 1);
    }
  };

  return (
    <Layout>
      <div className="scary-container p-4 sm:p-6 md:p-8">
        <header className="text-center mb-12">
          <h1 className="scary-title font-serif">
            Генератор Кошмаров
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Погрузитесь в мир ужаса с нашим генератором пугающих изображений. 
            Каждое изображение уникально и случайно, заставляя ваше сердце биться чаще.
          </p>
        </header>

        <div className="controls flex justify-center gap-4 mb-8">
          <Button 
            onClick={handleRemoveImage} 
            disabled={imageCount <= 1}
            variant="outline" 
            className="border-red-900 text-red-500 hover:bg-red-950 hover:text-red-400"
          >
            <Icon name="Minus" className="mr-1" />
            Меньше ужаса
          </Button>
          
          <Button 
            onClick={handleAddImage} 
            disabled={imageCount >= 3}
            variant="outline" 
            className="border-purple-900 text-purple-500 hover:bg-purple-950 hover:text-purple-400"
          >
            <Icon name="Plus" className="mr-1" />
            Больше ужаса
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(imageCount)].map((_, index) => (
            <div key={index} className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.7)] border border-red-900/30 backdrop-blur-sm">
              <ScaryImage className="w-full" />
            </div>
          ))}
        </div>

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p className="mb-2">
            Осторожно: изображения могут вызвать тревожные чувства у чувствительных людей.
          </p>
          <p className="animate-pulse text-red-700">
            Используйте на свой страх и риск...
          </p>
        </footer>
      </div>
    </Layout>
  );
}
