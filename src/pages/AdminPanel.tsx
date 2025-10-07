import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const AdminPanel = () => {
  const [consoleInput, setConsoleInput] = useState("");
  const [consoleLog, setConsoleLog] = useState([
    { time: "12:45:32", type: "info", message: "[Server] Starting Minecraft server version 1.19.4" },
    { time: "12:45:33", type: "info", message: "[Spigot] Loading Spigot 1.19.4" },
    { time: "12:45:34", type: "success", message: "[FantTime] FantTime build loaded successfully" },
    { time: "12:45:35", type: "info", message: "[Server] Preparing level \"world\"" },
    { time: "12:45:36", type: "success", message: "[Server] Done! Server started in 4.2s" },
    { time: "12:45:37", type: "info", message: "[Player] Steve joined the game" },
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;
    
    const newLog = {
      time: new Date().toLocaleTimeString('ru-RU'),
      type: "command",
      message: `> ${consoleInput}`
    };
    
    setConsoleLog([...consoleLog, newLog]);
    setConsoleInput("");
  };

  const getLogColor = (type: string) => {
    switch(type) {
      case "success": return "text-green-400";
      case "error": return "text-red-400";
      case "warning": return "text-yellow-400";
      case "command": return "text-blue-400";
      default: return "text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Icon name="ArrowLeft" size={20} />
                <span className="text-sm">На главную</span>
              </a>
              <div className="h-6 w-px bg-border"></div>
              <div className="flex items-center gap-2">
                <Icon name="Server" size={24} className="text-primary" />
                <span className="text-xl font-bold">Панель управления</span>
              </div>
            </div>
            <Badge variant="default" className="gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Сервер онлайн
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Версия сервера</CardDescription>
              <CardTitle className="text-2xl">Spigot 1.19.4</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Сборка</CardDescription>
              <CardTitle className="text-2xl">FantTime</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Игроки онлайн</CardDescription>
              <CardTitle className="text-2xl">1,250 / 2,000</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="console" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="console">
              <Icon name="Terminal" size={16} className="mr-2" />
              Консоль
            </TabsTrigger>
            <TabsTrigger value="stats">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Статистика
            </TabsTrigger>
            <TabsTrigger value="players">
              <Icon name="Users" size={16} className="mr-2" />
              Игроки
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="console" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Консоль сервера</CardTitle>
                    <CardDescription className="text-gray-400">
                      Управление сервером через командную строку
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                      <Icon name="Download" size={16} className="mr-2" />
                      Экспорт логов
                    </Button>
                    <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                      <Icon name="Trash2" size={16} className="mr-2" />
                      Очистить
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full rounded-md bg-black p-4 font-mono text-sm">
                  {consoleLog.map((log, index) => (
                    <div key={index} className="mb-1 flex gap-3">
                      <span className="text-gray-500">[{log.time}]</span>
                      <span className={getLogColor(log.type)}>{log.message}</span>
                    </div>
                  ))}
                </ScrollArea>
                
                <form onSubmit={handleCommand} className="mt-4 flex gap-2">
                  <div className="relative flex-1">
                    <Icon name="ChevronRight" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      value={consoleInput}
                      onChange={(e) => setConsoleInput(e.target.value)}
                      placeholder="Введите команду сервера..."
                      className="bg-gray-800 border-gray-700 text-white pl-10 font-mono"
                    />
                  </div>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Производительность</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">CPU</span>
                      <span className="text-sm font-semibold">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">RAM</span>
                      <span className="text-sm font-semibold">6.2 / 16 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{width: '38.75%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">TPS</span>
                      <span className="text-sm font-semibold text-green-600">20.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Информация о сервере</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Версия:</span>
                    <span className="font-semibold">Spigot 1.19.4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Сборка:</span>
                    <span className="font-semibold">FantTime</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Аптайм:</span>
                    <span className="font-semibold">5д 12ч 34м</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Миры:</span>
                    <span className="font-semibold">3 активных</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Плагины:</span>
                    <span className="font-semibold">24 загружено</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="players" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Игроки онлайн (6)</CardTitle>
                <CardDescription>Список игроков на сервере</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Steve', 'Alex', 'Notch', 'Herobrine', 'Creeper', 'Enderman'].map((player) => (
                    <div key={player} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon name="User" size={20} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">{player}</div>
                          <div className="text-sm text-muted-foreground">world (overworld)</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Icon name="MessageSquare" size={16} />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Ban" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Управление сервером</CardTitle>
                  <CardDescription>Основные действия</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <Button variant="default">
                    <Icon name="RotateCw" size={16} className="mr-2" />
                    Перезагрузить
                  </Button>
                  <Button variant="outline">
                    <Icon name="Power" size={16} className="mr-2" />
                    Остановить
                  </Button>
                  <Button variant="outline">
                    <Icon name="Save" size={16} className="mr-2" />
                    Сохранить миры
                  </Button>
                  <Button variant="outline">
                    <Icon name="Download" size={16} className="mr-2" />
                    Бэкап
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Конфигурация FantTime</CardTitle>
                  <CardDescription>Настройки сборки</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Оптимизация производительности</div>
                      <div className="text-sm text-muted-foreground">Улучшает TPS на больших серверах</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Icon name="Settings" size={16} />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Анти-чит система</div>
                      <div className="text-sm text-muted-foreground">Защита от читеров</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Icon name="Settings" size={16} />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Кастомные механики</div>
                      <div className="text-sm text-muted-foreground">Уникальные фичи FantTime</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Icon name="Settings" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
