import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const Shop = () => {
  const tariffs = [
    {
      id: 1,
      name: "Игрок",
      price: 99,
      icon: "User",
      color: "bg-gray-600",
      features: [
        "Базовый доступ к серверу",
        "1 приватный регион",
        "Стандартные команды",
        "Доступ к общему чату"
      ]
    },
    {
      id: 2,
      name: "Крипер",
      price: 299,
      icon: "Zap",
      color: "bg-green-600",
      features: [
        "Все из тарифа Игрок",
        "3 приватных региона",
        "Команда /fly",
        "Цветной ник в чате",
        "Приоритетный вход"
      ]
    },
    {
      id: 3,
      name: "Паук",
      price: 499,
      icon: "Bug",
      color: "bg-purple-600",
      features: [
        "Все из тарифа Крипер",
        "5 приватных регионов",
        "Команда /tp",
        "Уникальный префикс",
        "Доступ к VIP зоне",
        "Набор ресурсов"
      ]
    },
    {
      id: 4,
      name: "Голем",
      price: 799,
      icon: "ShieldCheck",
      color: "bg-blue-600",
      features: [
        "Все из тарифа Паук",
        "10 приватных регионов",
        "Команды /heal, /feed",
        "Кастомный ник",
        "Бессмертие от мобов",
        "Набор брони",
        "Доступ к креативу"
      ]
    },
    {
      id: 5,
      name: "Эндермен",
      price: 1299,
      icon: "Sparkles",
      color: "bg-pink-600",
      features: [
        "Все из тарифа Голем",
        "Безлимитные регионы",
        "Все команды модератора",
        "Телепорт без задержки",
        "Уникальные эффекты",
        "Приоритетная поддержка",
        "Доступ к эндер-миру"
      ]
    },
    {
      id: 6,
      name: "Херобрин",
      price: 2499,
      icon: "Crown",
      color: "bg-gradient-to-r from-orange-500 to-red-600",
      features: [
        "ВСЕ возможности сервера",
        "Неограниченные привилегии",
        "Команды администратора",
        "Уникальная аура в игре",
        "Доступ к консоли",
        "Личный саппорт 24/7",
        "Голос в развитии сервера",
        "Бессмертие и бесконечные ресурсы"
      ]
    },
    {
      id: 7,
      name: "Unlimited",
      price: 5999,
      icon: "Infinity",
      color: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
      popular: true,
      features: [
        "24/7 онлайн сервер",
        "Всё из тарифа Херобрин",
        "Абсолютно ВСЁ без ограничений",
        "Персональный выделенный сервер",
        "Кастомные плагины под заказ",
        "Приватная поддержка в любое время",
        "Полный контроль над сервером",
        "Безлимитные ресурсы и мощности",
        "Доступ к бета-функциям",
        "Пожизненная VIP поддержка"
      ]
    },
    {
      id: 8,
      name: "ANARCHY",
      price: 12999,
      icon: "Flame",
      color: "bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600",
      isNew: true,
      features: [
        "Эксклюзивный анархия режим",
        "Всё из тарифа Unlimited",
        "Полная свобода действий без правил",
        "Приоритетный доступ к новым функциям",
        "Личный выделенный сервер с максимальными мощностями",
        "Безлимитные ресурсы и возможности",
        "Кастомные миры и генерация",
        "Доступ к эксклюзивным ивентам",
        "Премиум поддержка 24/7/365",
        "Уникальные привилегии и статус",
        "Пожизненные обновления и апгрейды"
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
          <Button variant="ghost" onClick={() => window.history.back()}>
            <Icon name="ArrowLeft" size={20} />
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
              className={`relative overflow-hidden transition-all hover:scale-105 border-primary/20 hover:border-primary/50 bg-card/50 backdrop-blur ${
                tariff.popular ? 'ring-2 ring-primary shadow-2xl shadow-primary/30 animate-pulse' : 'hover:shadow-lg hover:shadow-primary/20'
              } ${(tariff as any).isNew ? 'ring-2 ring-yellow-500 shadow-2xl shadow-yellow-500/30' : ''}`}
            >
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
                  <span className="text-4xl font-bold text-foreground">{tariff.price}₽</span>
                  <span className="text-muted-foreground">/месяц</span>
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

              <CardFooter>
                <Button 
                  className="w-full gap-2" 
                  variant={tariff.popular ? "default" : "outline"}
                  size="lg"
                >
                  <Icon name="ShoppingCart" size={20} />
                  Купить тариф
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Icon name="HelpCircle" size={24} />
                Нужна помощь с выбором?
              </CardTitle>
              <CardDescription>
                Наша команда поможет подобрать оптимальный тариф для вас
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <Button variant="outline" className="gap-2">
                <Icon name="MessageCircle" size={20} />
                Связаться с поддержкой
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Shop;