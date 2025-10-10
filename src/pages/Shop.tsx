import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

import { useToast } from "@/hooks/use-toast";

const Shop = () => {
  const navigate = useNavigate();
  const [selectedEmail, setSelectedEmail] = useState('');
  const { toast } = useToast();

  const BACKEND_URL = 'https://functions.poehali.dev/d7adc20e-e211-4e7b-b230-aa3ffe6cd82c';

  useEffect(() => {
    setSelectedEmail(localStorage.getItem('selectedEmail') || '');
  }, []);

  const createServerForTariff = async (tariff: any) => {
    const serverName = `${tariff.name} Server`;
    const serverId = `srv-${Date.now()}`;
    
    const newServer = {
      id: serverId,
      name: serverName,
      version: '1.20.1',
      customId: `${tariff.name.toLowerCase()}-${Date.now()}`,
      players: 0,
      maxPlayers: tariff.name === 'FREE' ? 10 : tariff.name === 'БАЗОВЫЙ' ? 20 : tariff.name === 'ПОПУЛЯРНЫЙ' ? 50 : 100,
      status: 'online',
      plugins: []
    };

    const savedServers = localStorage.getItem('servers');
    const servers = savedServers ? JSON.parse(savedServers) : [];
    servers.push(newServer);
    localStorage.setItem('servers', JSON.stringify(servers));

    if (selectedEmail) {
      try {
        await fetch(BACKEND_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-User-Email': selectedEmail
          },
          body: JSON.stringify({ servers: [newServer] })
        });
      } catch (error) {
        console.error('Failed to sync server to cloud:', error);
      }
    }

    return newServer;
  };

  const handlePurchaseTariff = async (tariff: any) => {
    const server = await createServerForTariff(tariff);
    
    toast({
      title: tariff.isFree ? "Бесплатный сервер создан! 🎉" : "Покупка успешна! 🎉",
      description: `Сервер "${server.name}" создан и готов к работе`,
    });

    setTimeout(() => {
      navigate('/');
    }, 1500);
  };



  const tariffs = [
    {
      id: 0,
      name: "FREE",
      price: 0,
      icon: "Gift",
      color: "bg-green-600",
      isFree: true,
      features: [
        "Онлайн с 0 до 10 игроков",
        "0.60 GB RAM",
        "Доступ к консоли",
        "Управление игроками",
        "Доступ к файлам игры",
        "Базовые команды"
      ]
    },
    {
      id: 1,
      name: "БАЗОВЫЙ",
      price: 788,
      icon: "Server",
      color: "bg-blue-600",
      features: [
        "Онлайн с 0 до 20 игроков",
        "1.40 GB RAM",
        "Доступ к консоли",
        "Управление игроками",
        "Доступ к файлам игры",
        "Установка модов и плагинов",
        "Резервное копирование"
      ]
    },
    {
      id: 2,
      name: "ПОПУЛЯРНЫЙ",
      price: 1388,
      icon: "Rocket",
      color: "bg-purple-600",
      popular: true,
      features: [
        "Онлайн с 0 до 50 игроков",
        "3.60 GB RAM",
        "Всё из тарифа БАЗОВЫЙ",
        "Приоритетная поддержка",
        "Автоматические обновления",
        "Продвинутая настройка",
        "DDoS защита"
      ]
    },
    {
      id: 3,
      name: "ПРЕМИУМ",
      price: 2388,
      icon: "Crown",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
      features: [
        "Онлайн с 0 до 100 игроков",
        "7.60 GB RAM",
        "Всё из тарифа ПОПУЛЯРНЫЙ",
        "Выделенный IP адрес",
        "24/7 поддержка",
        "Приоритетный запуск",
        "Безлимитные плагины"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Store" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold">Магазин тарифов</h1>
          </div>
          <Button variant="ghost" className="gap-2" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} />
            Вернуться в меню
            Назад
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Выберите свой тариф</h2>
          <p className="text-muted-foreground text-lg">
            Получите уникальные возможности и привилегии на сервере
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tariffs.map((tariff) => (
            <Card 
              key={tariff.id} 
              className={`relative overflow-hidden transition-all hover:scale-105 bg-card/50 backdrop-blur ${
                (tariff as any).isFree
                  ? 'ring-4 ring-green-500 border-green-500/50 shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:shadow-[0_0_60px_rgba(34,197,94,0.8)]'
                  : (tariff as any).isNew 
                    ? 'ring-4 ring-yellow-500 border-yellow-500/50 shadow-[0_0_40px_rgba(234,179,8,0.6)] hover:shadow-[0_0_60px_rgba(234,179,8,0.8)] animate-pulse' 
                    : tariff.popular 
                      ? 'ring-2 ring-primary shadow-2xl shadow-primary/30 animate-pulse border-primary/20 hover:border-primary/50' 
                      : 'border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20'
              }`}
            >
              {(tariff as any).isFree && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-1 text-sm font-bold shadow-lg shadow-green-500/50">
                  БЕСПЛАТНО
                </div>
              )}
              {tariff.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold">
                  ПОПУЛЯРНЫЙ
                </div>
              )}
              {(tariff as any).isNew && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-4 py-1 text-sm font-bold shadow-lg shadow-yellow-500/50">
                  НОВОЕ
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${tariff.color} flex items-center justify-center`}>
                  <Icon name={tariff.icon as any} size={40} className="text-white" />
                </div>
                <CardTitle className="text-2xl">{tariff.name}</CardTitle>
                <CardDescription>
                  {tariff.price === 0 ? (
                    <span className="text-4xl font-bold text-green-500">Бесплатно</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-foreground">{tariff.price}₽</span>
                      <span className="text-muted-foreground">/месяц</span>
                    </>
                  )}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2">
                  {tariff.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex-col gap-2">
                <Button 
                  className="w-full gap-2" 
                  variant={(tariff as any).isFree || tariff.popular || (tariff as any).isNew ? "default" : "outline"}
                  size="lg"
                  onClick={() => handlePurchaseTariff(tariff)}
                >
                  <Icon name={(tariff as any).isFree ? "Download" : "ShoppingCart"} size={20} />
                  {(tariff as any).isFree ? "Получить бесплатно" : "Купить тариф"}
                </Button>

              </CardFooter>
            </Card>
          ))}
        </div>


      </main>


    </div>
  );
};

export default Shop;