import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Minecraft Server Panel</h1>
        <p className="text-xl text-gray-400 mb-8">Начните создавать свой сервер</p>
        <Button size="lg" className="text-lg px-8 py-6">
          Начать
        </Button>
      </div>
    </div>
  );
};

export default Index;
