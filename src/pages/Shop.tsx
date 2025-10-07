import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Shop = () => {
  const [selectedTariff, setSelectedTariff] = useState<any>(null);
  const [giftDialogOpen, setGiftDialogOpen] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");
  const [referralDialogOpen, setReferralDialogOpen] = useState(false);
  const [adminGrantDialogOpen, setAdminGrantDialogOpen] = useState(false);
  const [grantUserId, setGrantUserId] = useState("");
  const { toast } = useToast();

  const isDeveloper = true;

  const handleGiftTariff = () => {
    if (!friendEmail.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите email друга",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Подарок отправлен! 🎁",
      description: `Тариф ${selectedTariff?.name} отправлен на ${friendEmail}`
    });
    setGiftDialogOpen(false);
    setFriendEmail("");
  };

  const handleGrantTariff = () => {
    if (!grantUserId.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите ID или email пользователя",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Тариф выдан! 🔑",
      description: `Тариф ${selectedTariff?.name} выдан пользователю ${grantUserId}`,
    });
    setAdminGrantDialogOpen(false);
    setGrantUserId("");
  };

  const handleCopyReferralLink = () => {
    const refLink = `${window.location.origin}/shop?ref=friend123`;
    navigator.clipboard.writeText(refLink);
    toast({
      title: "Ссылка скопирована!",
      description: "Отправьте реферальную ссылку другу"
    });
  };

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
              className={`relative overflow-hidden transition-all hover:scale-105 bg-card/50 backdrop-blur ${
                (tariff as any).isNew 
                  ? 'ring-4 ring-yellow-500 border-yellow-500/50 shadow-[0_0_40px_rgba(234,179,8,0.6)] hover:shadow-[0_0_60px_rgba(234,179,8,0.8)] animate-pulse' 
                  : tariff.popular 
                    ? 'ring-2 ring-primary shadow-2xl shadow-primary/30 animate-pulse border-primary/20 hover:border-primary/50' 
                    : 'border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20'
              }`}
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

              <CardFooter className="flex-col gap-2">
                <Button 
                  className="w-full gap-2" 
                  variant={tariff.popular || (tariff as any).isNew ? "default" : "outline"}
                  size="lg"
                >
                  <Icon name="ShoppingCart" size={20} />
                  Купить тариф
                </Button>
                <Button 
                  className="w-full gap-2" 
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    setSelectedTariff(tariff);
                    setGiftDialogOpen(true);
                  }}
                >
                  <Icon name="Gift" size={20} />
                  Подарить другу
                </Button>
                {isDeveloper && (
                  <Button 
                    className="w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" 
                    size="lg"
                    onClick={() => {
                      setSelectedTariff(tariff);
                      setAdminGrantDialogOpen(true);
                    }}
                  >
                    <Icon name="Key" size={20} />
                    Выдать тариф (DEV)
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 space-y-6">
          <Card className="max-w-4xl mx-auto border-primary/20 hover:border-primary/50 bg-card/50 backdrop-blur transition-all">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Icon name="Users" size={28} className="text-primary" />
                Реферальная программа
              </CardTitle>
              <CardDescription className="text-center text-base">
                Приглашайте друзей и получайте бонусы за каждую покупку!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <Icon name="Gift" size={40} className="text-primary" />
                  <div className="text-center">
                    <p className="font-bold text-lg">10% кэшбэк</p>
                    <p className="text-sm text-muted-foreground">От покупки друга</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <Icon name="Percent" size={40} className="text-primary" />
                  <div className="text-center">
                    <p className="font-bold text-lg">15% скидка</p>
                    <p className="text-sm text-muted-foreground">Другу на первую покупку</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <Icon name="Infinity" size={40} className="text-primary" />
                  <div className="text-center">
                    <p className="font-bold text-lg">Безлимит</p>
                    <p className="text-sm text-muted-foreground">Приглашений друзей</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  size="lg" 
                  className="flex-1 gap-2"
                  onClick={() => setReferralDialogOpen(true)}
                >
                  <Icon name="Link" size={20} />
                  Получить реферальную ссылку
                </Button>
              </div>
            </CardContent>
          </Card>

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

      <Dialog open={giftDialogOpen} onOpenChange={setGiftDialogOpen}>
        <DialogContent className="sm:max-w-md border-primary/20 bg-card/95 backdrop-blur">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Icon name="Gift" size={28} className="text-primary" />
              Подарить тариф другу
            </DialogTitle>
            <DialogDescription>
              {selectedTariff && `Вы дарите тариф "${selectedTariff.name}" (${selectedTariff.price}₽)`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="friend-email">Email друга</Label>
              <Input
                id="friend-email"
                type="email"
                placeholder="friend@example.com"
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
              />
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={24} className="text-primary shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold mb-1">Как это работает?</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Друг получит письмо с подарком</li>
                    <li>• Тариф активируется автоматически</li>
                    <li>• Вы получите 5% кэшбэк на счёт</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full gap-2"
              onClick={handleGiftTariff}
            >
              <Icon name="Send" size={20} />
              Отправить подарок
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={referralDialogOpen} onOpenChange={setReferralDialogOpen}>
        <DialogContent className="sm:max-w-md border-primary/20 bg-card/95 backdrop-blur">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Icon name="Users" size={28} className="text-primary" />
              Ваша реферальная ссылка
            </DialogTitle>
            <DialogDescription>
              Делитесь ссылкой и зарабатывайте на покупках друзей!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Реферальная ссылка</Label>
              <div className="flex gap-2">
                <Input
                  value={`${window.location.origin}/shop?ref=friend123`}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button onClick={handleCopyReferralLink}>
                  <Icon name="Copy" size={18} />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Приглашено друзей</p>
                    <p className="text-2xl font-bold text-primary">0</p>
                  </div>
                  <Icon name="Users" size={40} className="text-primary" />
                </div>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Заработано бонусов</p>
                    <p className="text-2xl font-bold text-primary">0₽</p>
                  </div>
                  <Icon name="Wallet" size={40} className="text-primary" />
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full gap-2"
              onClick={handleCopyReferralLink}
            >
              <Icon name="Share2" size={20} />
              Поделиться ссылкой
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={adminGrantDialogOpen} onOpenChange={setAdminGrantDialogOpen}>
        <DialogContent className="sm:max-w-md border-purple-500/50 bg-gradient-to-br from-card/95 to-purple-950/20 backdrop-blur">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Icon name="ShieldCheck" size={28} className="text-purple-400" />
              Выдать тариф (Разработчик)
            </DialogTitle>
            <DialogDescription>
              {selectedTariff && `Выдача тарифа "${selectedTariff.name}" пользователю`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-500/30 flex items-center gap-2">
              <Icon name="AlertTriangle" size={20} className="text-purple-400" />
              <p className="text-sm text-purple-200">Админ-панель для разработчиков</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="grant-user-id">ID или Email пользователя</Label>
              <Input
                id="grant-user-id"
                type="text"
                placeholder="user@example.com или user_id_123"
                value={grantUserId}
                onChange={(e) => setGrantUserId(e.target.value)}
                className="border-purple-500/30"
              />
            </div>

            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-purple-300">Что произойдёт:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>✓ Тариф активируется мгновенно</li>
                  <li>✓ Пользователь получит уведомление</li>
                  <li>✓ Действие будет записано в лог</li>
                  <li>✓ Без списания средств</li>
                </ul>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={handleGrantTariff}
            >
              <Icon name="Key" size={20} />
              Выдать тариф бесплатно
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Shop;