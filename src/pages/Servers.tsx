import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Servers = () => {
  const servers = [
    {
      name: "Survival",
      description: "Классическое выживание с экономикой и приватами",
      players: 456,
      maxPlayers: 1000,
      status: "online",
      ip: "survival.myserver.net",
      version: "1.19.4",
      icon: "Pickaxe"
    },
    {
      name: "Creative",
      description: "Творческий режим для строительства",
      players: 234,
      maxPlayers: 500,
      status: "online",
      ip: "creative.myserver.net",
      version: "1.19.4",
      icon: "Paintbrush"
    },
    {
      name: "SkyBlock",
      description: "Развивай свой остров в небе",
      players: 312,
      maxPlayers: 800,
      status: "online",
      ip: "skyblock.myserver.net",
      version: "1.19.4",
      icon: "Cloud"
    },
    {
      name: "BedWars",
      description: "Командная PvP битва за кровати",
      players: 128,
      maxPlayers: 200,
      status: "online",
      ip: "bedwars.myserver.net",
      version: "1.19.4",
      icon: "Sword"
    },
    {
      name: "HiTech",
      description: "Индустриальное выживание с модами",
      players: 87,
      maxPlayers: 300,
      status: "online",
      ip: "hitech.myserver.net",
      version: "1.19.4",
      icon: "Cpu"
    },
    {
      name: "Prison",
      description: "Побег из тюрьмы и прокачка рангов",
      players: 0,
      maxPlayers: 500,
      status: "maintenance",
      ip: "prison.myserver.net",
      version: "1.19.4",
      icon: "Lock"
    }
  ];

  const getStatusColor = (status: string) => {
    return status === "online" ? "bg-green-500" : "bg-yellow-500";
  };

  const getStatusText = (status: string) => {
    return status === "online" ? "Онлайн" : "Техработы";
  };

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
            <a href="/servers" className="text-sm font-medium text-primary">Серверы</a>
            <a href="/admin">
              <Button variant="outline" className="gap-2" size="sm">
                <Icon name="Settings" size={16} />
                Панель управления
              </Button>
            </a>
            <Button>Подключиться</Button>
          </nav>
        </div>
      </header>

      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Наши серверы</h1>
            <p className="text-xl text-muted-foreground">
              Выбери игровой режим по душе и начни играть прямо сейчас
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {servers.map((server) => (
              <Card key={server.name} className="hover:shadow-xl transition-all hover:scale-[1.02] duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon name={server.icon as any} size={28} className="text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-1">{server.name}</CardTitle>
                        <CardDescription className="text-base">{server.description}</CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant={server.status === "online" ? "default" : "secondary"}
                      className="gap-1.5"
                    >
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(server.status)} animate-pulse`}></div>
                      {getStatusText(server.status)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Игроки онлайн</span>
                      <span className="font-semibold">{server.players} / {server.maxPlayers}</span>
                    </div>
                    <Progress value={(server.players / server.maxPlayers) * 100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Gamepad2" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Версия:</span>
                      <span className="font-medium">{server.version}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Globe" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Регион:</span>
                      <span className="font-medium">RU</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="Terminal" size={16} className="text-primary" />
                      <span className="font-mono text-sm font-semibold">{server.ip}</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={() => navigator.clipboard.writeText(server.ip)}
                      >
                        <Icon name="Copy" size={14} />
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        disabled={server.status !== "online"}
                      >
                        <Icon name="Play" size={16} className="mr-2" />
                        Играть
                      </Button>
                      <Button variant="outline">
                        <Icon name="Info" size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Общая статистика</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Users" size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-3xl">1,217</CardTitle>
                  <CardDescription>Всего игроков</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Server" size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-3xl">6</CardTitle>
                  <CardDescription>Серверов</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Zap" size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-3xl">20 TPS</CardTitle>
                  <CardDescription>Производительность</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Clock" size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-3xl">99.9%</CardTitle>
                  <CardDescription>Аптайм</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Не нашёл нужный режим?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Мы регулярно добавляем новые серверы. Предложи свой вариант!
          </p>
          <Button size="lg" className="gap-2">
            <Icon name="MessageSquare" size={18} />
            Предложить режим
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

export default Servers;
