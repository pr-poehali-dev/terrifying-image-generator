
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import Icon from './ui/icon';

// Список APIs для получения страшных изображений
const SCARY_IMAGE_APIS = [
  // Прямые ссылки на страшные изображения
  "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&auto=format", // Маска
  "https://images.unsplash.com/photo-1602493053231-90293aea8d81?w=800&auto=format", // Кладбище
  "https://images.unsplash.com/photo-1635016288720-908f4577696f?w=800&auto=format", // Тыква
  "https://images.unsplash.com/photo-1604005950576-8430bba49bc4?w=800&auto=format", // Лес
  "https://images.unsplash.com/photo-1414490929659-9a12b7e31907?w=800&auto=format", // Туман
  "https://images.unsplash.com/photo-1596627118111-5ab204b0f130?w=800&auto=format", // Жуткая кукла
  "https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=800&auto=format", // Туннель
  "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=800&auto=format", // Колодец
  "https://images.unsplash.com/photo-1603367433513-635b6c2e412a?w=800&auto=format", // Заброшенный дом
  "https://images.unsplash.com/photo-1602179475152-79423f43ec53?w=800&auto=format", // Рука зомби
  "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=800&auto=format", // Страшная маска
  "https://images.unsplash.com/photo-1508465818285-f05a6e2f4fad?w=800&auto=format", // Вороны
];

// Список ключевых слов для генерации эффекта ужаса
const SCARY_KEYWORDS = [
  "жуткое лицо",
  "призрак",
  "демон",
  "зомби",
  "монстр",
  "кошмар",
  "ведьма",
  "вампир",
  "оборотень",
  "потусторонний",
  "паранормальное",
  "смерть",
  "страх",
  "ужас",
  "кровь",
];

// Функция для выбора случайного элемента из массива
const getRandomItem = <T,>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

// Функция для эффекта мерцания
const getFlickerEffect = () => {
  const intensity = Math.random() * 0.3;
  return {
    filter: `brightness(${0.7 + intensity})`,
    transition: 'filter 0.5s ease',
  };
};

interface ScaryImageProps {
  className?: string;
}

export default function ScaryImage({ className = "" }: ScaryImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>(getRandomItem(SCARY_KEYWORDS));
  const [flickerStyle, setFlickerStyle] = useState({});

  // Функция для генерации нового страшного изображения
  const generateNewImage = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      // Выбираем новое ключевое слово для контекста
      const newKeyword = getRandomItem(SCARY_KEYWORDS);
      setKeyword(newKeyword);
      
      // Получаем случайное изображение из нашего списка
      const randomImage = getRandomItem(SCARY_IMAGE_APIS);
      
      // Проверка доступности изображения перед установкой
      const imgCheck = new Image();
      imgCheck.onload = () => {
        setImageUrl(randomImage);
        setIsLoading(false);
        setFlickerStyle(getFlickerEffect());
      };
      imgCheck.onerror = () => {
        throw new Error("Ошибка загрузки изображения");
      };
      imgCheck.src = randomImage;
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error);
      setErrorMessage("Не удалось загрузить изображение. Попробуйте еще раз.");
      setIsLoading(false);
    }
  };

  // Генерируем изображение при первом рендере
  useEffect(() => {
    generateNewImage();
    
    // Эффект периодического мерцания
    const flickerInterval = setInterval(() => {
      setFlickerStyle(getFlickerEffect());
    }, 3000);
    
    return () => clearInterval(flickerInterval);
  }, []);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="mb-6 text-center">
        <h2 className="text-xl mb-2 font-semibold text-red-500 animate-flicker">
          {keyword.toUpperCase()}
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          Это изображение может вызвать чувство тревоги...
        </p>
      </div>
      
      <div className="scary-image-container w-full max-w-2xl aspect-video mb-6">
        {isLoading ? (
          <Skeleton className="scary-loading w-full h-full" />
        ) : errorMessage ? (
          <div className="flex flex-col items-center justify-center w-full h-80 bg-gray-900 rounded-lg border border-red-900 p-4">
            <Icon name="AlertCircle" className="text-red-500 mb-3" size={48} />
            <p className="text-red-400 text-center">{errorMessage}</p>
          </div>
        ) : (
          <img 
            src={imageUrl || ""} 
            alt="Страшное изображение" 
            className="w-full h-full object-cover rounded-lg transition-all duration-500"
            style={flickerStyle}
            onError={() => setErrorMessage("Ошибка загрузки изображения")}
          />
        )}
      </div>
      
      <Button 
        onClick={generateNewImage} 
        disabled={isLoading}
        className="scary-button group"
      >
        {isLoading ? (
          <>
            <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
            Загрузка...
          </>
        ) : (
          <>
            <Icon name="Skull" className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            Генерировать новый ужас
          </>
        )}
      </Button>
    </div>
  );
}
