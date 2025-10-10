import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <Icon name="Store" size={80} className="text-primary mx-auto mb-4" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">FunAcid</h1>
        <p className="text-xl text-gray-400 mb-8">Магазин привилегий Minecraft сервера</p>
        <Button 
          size="lg" 
          className="text-lg px-8 py-6 gap-3"
          onClick={() => navigate("/shop")}
        >
          <Icon name="ShoppingCart" size={24} />
          Открыть магазин
        </Button>
      </div>
    </div>
  );
};

export default Index;