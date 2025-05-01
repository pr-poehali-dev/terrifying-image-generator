
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Icon name="GhostIcon" size={80} className="mx-auto text-red-500 mb-6" />
          <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-6">Страница не найдена</h2>
          <p className="text-gray-400 mb-8">
            Страница, которую вы ищете, не существует или была перемещена.
          </p>
          <Link to="/">
            <Button className="bg-red-700 hover:bg-red-800">
              <Icon name="Home" className="mr-2" />
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
