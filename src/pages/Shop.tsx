import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Shop = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<"privileges" | "additional" | "tokens">("privileges");

  const handlePurchase = (itemName: string, price: number) => {
    window.open("https://plutka.kesug.com/EzFunTimeEz.php", "_blank");
    toast({
      title: "Переход к оплате",
      description: `${itemName} - ${price}₽`
    });
  };

  const privileges = [
    { name: "Герцог", price: 339, icon: "Crown", color: "bg-gradient-to-r from-purple-600 to-pink-600", popular: true },
    { name: "Князь", price: 256, icon: "ShieldCheck", color: "bg-gradient-to-r from-blue-600 to-purple-600" },
    { name: "Титан", price: 199, icon: "Zap", color: "bg-gradient-to-r from-orange-500 to-red-600" },
    { name: "Элита", price: 127, icon: "Star", color: "bg-gradient-to-r from-yellow-500 to-orange-500" },
    { name: "Глава", price: 99, icon: "User", color: "bg-blue-600" },
    { name: "Сквид", price: 77, icon: "Fish", color: "bg-cyan-600" },
    { name: "Герой", price: 55, icon: "Sword", color: "bg-green-600" },
    { name: "Страж", price: 34, icon: "Shield", color: "bg-teal-600" },
    { name: "Барон", price: 12, icon: "CircleUser", color: "bg-gray-600" }
  ];

  const additional = [
    { name: "Разбан", price: 267, icon: "Unlock", color: "bg-red-600", description: "Снятие блокировки аккаунта" },
    { name: "Размут", price: 89, icon: "Volume2", color: "bg-orange-600", description: "Снятие мута в чате" }
  ];

  const tokens = [
    { name: "1 Токен", price: 17, icon: "Coins", color: "bg-yellow-600", description: "Игровая валюта сервера" }
  ];

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Store" size={32} className="text-primary" />
            <div>
              <h1 className="text-2xl font-bold">FunAcid</h1>
              <p className="text-sm text-muted-foreground">Магазин привилегий</p>
            </div>
          </div>
          <Button variant="ghost" className="gap-2" onClick={() => navigate("/")}>
            <Icon name="ArrowLeft" size={20} />
            Назад
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">Магазин привилегий</h2>
          <p className="text-muted-foreground text-lg mb-6">
            Получите уникальные возможности на сервере
          </p>
          
          <div className="flex justify-center gap-3 flex-wrap">
            <Button
              variant={selectedCategory === "privileges" ? "default" : "outline"}
              onClick={() => setSelectedCategory("privileges")}
              className="gap-2"
            >
              <Icon name="Crown" size={18} />
              Привилегии
            </Button>
            <Button
              variant={selectedCategory === "additional" ? "default" : "outline"}
              onClick={() => setSelectedCategory("additional")}
              className="gap-2"
            >
              <Icon name="Unlock" size={18} />
              Дополнительно
            </Button>
            <Button
              variant={selectedCategory === "tokens" ? "default" : "outline"}
              onClick={() => setSelectedCategory("tokens")}
              className="gap-2"
            >
              <Icon name="Coins" size={18} />
              Токены
            </Button>
          </div>
        </div>

        {selectedCategory === "privileges" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {privileges.map((privilege, idx) => (
              <Card
                key={idx}
                className={`relative overflow-hidden transition-all hover:scale-105 bg-card/50 backdrop-blur ${
                  privilege.popular
                    ? "ring-2 ring-primary shadow-2xl shadow-primary/30 border-primary/50"
                    : "border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
                }`}
              >
                {privilege.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold">
                    ПОПУЛЯРНЫЙ
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${privilege.color} flex items-center justify-center`}>
                    <Icon name={privilege.icon as any} size={40} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">{privilege.name}</CardTitle>
                  <CardDescription>
                    <span className="text-4xl font-bold text-foreground">{privilege.price}₽</span>
                  </CardDescription>
                </CardHeader>

                <CardFooter>
                  <Button
                    className="w-full gap-2"
                    variant={privilege.popular ? "default" : "outline"}
                    size="lg"
                    onClick={() => handlePurchase(privilege.name, privilege.price)}
                  >
                    <Icon name="ShoppingCart" size={20} />
                    Купить привилегию
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {selectedCategory === "additional" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {additional.map((item, idx) => (
              <Card
                key={idx}
                className="relative overflow-hidden transition-all hover:scale-105 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${item.color} flex items-center justify-center`}>
                    <Icon name={item.icon as any} size={40} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">{item.name}</CardTitle>
                  <CardDescription className="text-base mb-2">{item.description}</CardDescription>
                  <CardDescription>
                    <span className="text-4xl font-bold text-foreground">{item.price}₽</span>
                  </CardDescription>
                </CardHeader>

                <CardFooter>
                  <Button
                    className="w-full gap-2"
                    variant="outline"
                    size="lg"
                    onClick={() => handlePurchase(item.name, item.price)}
                  >
                    <Icon name="ShoppingCart" size={20} />
                    Купить услугу
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {selectedCategory === "tokens" && (
          <div className="max-w-md mx-auto">
            {tokens.map((token, idx) => (
              <Card
                key={idx}
                className="relative overflow-hidden transition-all hover:scale-105 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${token.color} flex items-center justify-center`}>
                    <Icon name={token.icon as any} size={40} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">{token.name}</CardTitle>
                  <CardDescription className="text-base mb-2">{token.description}</CardDescription>
                  <CardDescription>
                    <span className="text-4xl font-bold text-foreground">{token.price}₽</span>
                  </CardDescription>
                </CardHeader>

                <CardFooter>
                  <Button
                    className="w-full gap-2"
                    variant="outline"
                    size="lg"
                    onClick={() => handlePurchase(token.name, token.price)}
                  >
                    <Icon name="ShoppingCart" size={20} />
                    Купить токены
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-16 max-w-2xl mx-auto">
          <Card className="border-primary/20 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Icon name="Send" size={28} className="text-primary" />
                Наш Telegram канал
              </CardTitle>
              <CardDescription className="text-center text-base">
                Следите за новостями и обновлениями сервера
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <Button
                variant="default"
                className="gap-2"
                size="lg"
                onClick={() => window.open("https://t.me/av7272g", "_blank")}
              >
                <Icon name="Send" size={20} />
                Перейти в Telegram
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Shop;
