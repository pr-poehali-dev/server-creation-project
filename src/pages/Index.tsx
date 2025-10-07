import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Server" size={28} className="text-primary" />
            <span className="text-xl font-bold">MineCraft Server</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:text-primary transition-colors">Главная</a>
            <a href="/servers" className="text-sm font-medium hover:text-primary transition-colors">Серверы</a>
            <a href="/admin">
              <Button variant="outline" className="gap-2" size="sm">
                <Icon name="Settings" size={16} />
                Панель
              </Button>
            </a>
            <Button>Подключиться</Button>
          </nav>
        </div>
      </header>

      <section id="home" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              <Icon name="Zap" size={14} className="mr-1 inline" />
              Сервер онлайн
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Лучший Minecraft
              <span className="block text-primary mt-2">Сервер</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Присоединяйся к тысячам игроков в самом стабильном и дружелюбном сообществе. 
              Уникальные режимы, регулярные ивенты и профессиональная администрация.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="text-lg px-8 py-6 hover:scale-105 transition-transform">
                <Icon name="Play" size={20} className="mr-2" />
                Начать играть
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Icon name="Info" size={20} className="mr-2" />
                Узнать больше
              </Button>
            </div>
            <div className="pt-8 flex justify-center">
              <Card className="bg-white/50 backdrop-blur border-2 inline-block animate-scale-in">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-lg font-mono">
                    <Icon name="Terminal" size={24} className="text-primary" />
                    <span className="font-semibold">play.myserver.net</span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => navigator.clipboard.writeText('play.myserver.net')}
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary transition-all hover:scale-105 duration-300">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Users" size={32} className="text-primary" />
                </div>
                <CardTitle className="text-4xl font-bold">1,250</CardTitle>
                <CardDescription className="text-base">Онлайн игроков</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:scale-105 duration-300">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Gamepad2" size={32} className="text-primary" />
                </div>
                <CardTitle className="text-4xl font-bold">1.20.4</CardTitle>
                <CardDescription className="text-base">Версия сервера</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:scale-105 duration-300">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Trophy" size={32} className="text-primary" />
                </div>
                <CardTitle className="text-4xl font-bold">24/7</CardTitle>
                <CardDescription className="text-base">Аптайм сервера</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Мы создали идеальное место для игры в Minecraft
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
                <CardTitle>Защита от гриферов</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Продвинутая система защиты территорий и античит для честной игры
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Rocket" size={24} className="text-primary" />
                </div>
                <CardTitle>Высокая производительность</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Мощное оборудование обеспечивает стабильный FPS без лагов
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Heart" size={24} className="text-primary" />
                </div>
                <CardTitle>Дружное сообщество</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Активное комьюнити с еженедельными ивентами и конкурсами
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Sparkles" size={24} className="text-primary" />
                </div>
                <CardTitle>Уникальные режимы</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Survival, Creative, SkyBlock, BedWars и другие популярные режимы
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Headphones" size={24} className="text-primary" />
                </div>
                <CardTitle>Поддержка 24/7</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Опытная команда администраторов всегда готова помочь
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Gift" size={24} className="text-primary" />
                </div>
                <CardTitle>Бонусы для новичков</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Приветственный набор и ежедневные награды для всех игроков
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Готов начать играть?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Присоединяйся к нам прямо сейчас и получи приветственный бонус!
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6 hover:scale-105 transition-transform">
            <Icon name="Rocket" size={20} className="mr-2" />
            Подключиться к серверу
          </Button>
        </div>
      </section>

      <footer className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Server" size={24} className="text-primary" />
              <span className="font-bold">MineCraft Server</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 MineCraft Server. Все права защищены.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="MessageCircle" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Youtube" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;