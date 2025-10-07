import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Index = () => {
  const [servers, setServers] = useState<any[]>([]);
  const [isLoadingServers, setIsLoadingServers] = useState(true);
  const [showTelegramDialog, setShowTelegramDialog] = useState(true);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showEmailSelectDialog, setShowEmailSelectDialog] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [selectedEmail, setSelectedEmail] = useState(() => {
    return localStorage.getItem('selectedEmail') || '';
  });
  const [customEmail, setCustomEmail] = useState('');

  const googleAccounts = [
    { email: 'user@gmail.com', name: 'Основной аккаунт', avatar: '👤' },
    { email: 'work@gmail.com', name: 'Рабочий аккаунт', avatar: '💼' },
    { email: 'gaming@gmail.com', name: 'Игровой аккаунт', avatar: '🎮' },
  ];

  const [selectedServer, setSelectedServer] = useState<any>(null);
  const [uploadedPlugins, setUploadedPlugins] = useState<File[]>([]);
  const [newServerName, setNewServerName] = useState("");
  const [newServerCustomId, setNewServerCustomId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const MAX_SERVERS = 20;

  useEffect(() => {
    localStorage.setItem('isAuthenticated', String(isAuthenticated));
    localStorage.setItem('selectedEmail', selectedEmail);
  }, [isAuthenticated, selectedEmail]);

  const BACKEND_URL = 'https://functions.poehali.dev/d7adc20e-e211-4e7b-b230-aa3ffe6cd82c';

  const syncServersToCloud = useCallback(async (serversToSync: any[]) => {
    if (!isAuthenticated || !selectedEmail) return;
    
    try {
      await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': selectedEmail
        },
        body: JSON.stringify({ servers: serversToSync })
      });
    } catch (error) {
      console.error('Failed to sync servers to cloud:', error);
    }
  }, [isAuthenticated, selectedEmail]);

  const loadServersFromCloud = useCallback(async () => {
    if (!isAuthenticated || !selectedEmail) {
      const savedServers = localStorage.getItem('servers');
      setServers(savedServers ? JSON.parse(savedServers) : []);
      setIsLoadingServers(false);
      return;
    }

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'GET',
        headers: {
          'X-User-Email': selectedEmail
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const cloudServers = data.servers || [];
        
        const formattedServers = cloudServers.map((s: any) => ({
          id: s.server_id,
          name: s.server_name,
          version: s.version,
          customId: s.custom_id,
          players: s.players,
          maxPlayers: s.max_players,
          status: s.status
        }));
        
        setServers(formattedServers);
        localStorage.setItem('servers', JSON.stringify(formattedServers));
      } else {
        const savedServers = localStorage.getItem('servers');
        setServers(savedServers ? JSON.parse(savedServers) : []);
      }
    } catch (error) {
      console.error('Failed to load servers from cloud:', error);
      const savedServers = localStorage.getItem('servers');
      setServers(savedServers ? JSON.parse(savedServers) : []);
    }
    
    setIsLoadingServers(false);
  }, [isAuthenticated, selectedEmail]);

  useEffect(() => {
    loadServersFromCloud();
  }, [loadServersFromCloud]);

  useEffect(() => {
    if (servers.length > 0 && !isLoadingServers) {
      localStorage.setItem('servers', JSON.stringify(servers));
      syncServersToCloud(servers);
    }
  }, [servers, isLoadingServers, syncServersToCloud]);

  const handleCopyInviteLink = () => {
    const inviteLink = `${window.location.origin}?ref=invite`;
    navigator.clipboard.writeText(inviteLink);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedPlugins([...uploadedPlugins, ...Array.from(files)]);
    }
  };

  const handleServerUpdate = (serverId: number, updates: any) => {
    setServers(servers.map(s => s.id === serverId ? { ...s, ...updates } : s));
  };

  const handleAddServer = () => {
    if (!newServerName.trim() || !newServerCustomId.trim()) {
      return;
    }

    if (servers.length >= MAX_SERVERS) {
      alert(`Достигнут максимальный лимит: ${MAX_SERVERS} серверов`);
      return;
    }

    const newServer = {
      id: `srv-${Date.now()}`,
      name: newServerName,
      customId: newServerCustomId,
      avatar: "",
      players: 0,
      maxPlayers: 20,
      version: "1.20.1",
      status: "online" as const,
      plugins: []
    };

    setServers([...servers, newServer]);
    setNewServerName("");
    setNewServerCustomId("");
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <Dialog open={showTelegramDialog} onOpenChange={setShowTelegramDialog}>
        <DialogContent className="sm:max-w-md border-primary/20 bg-card/95 backdrop-blur">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Icon name="Send" size={28} className="text-primary" />
              Подпишитесь на наш Telegram!
            </DialogTitle>
            <DialogDescription className="text-base">
              Получайте эксклюзивные новости, обновления сервера и специальные предложения первыми!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <Icon name="Gift" size={32} className="text-primary" />
              <div>
                <p className="font-semibold">Бонус за подписку!</p>
                <p className="text-sm text-muted-foreground">Промокод на скидку 10% в магазине</p>
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full gap-2 text-lg font-bold"
              onClick={() => {
                window.open('https://t.me/av7272g', '_blank');
                setShowTelegramDialog(false);
              }}
            >
              <Icon name="Send" size={24} />
              Подписаться на Telegram
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setShowTelegramDialog(false)}
              className="w-full"
            >
              Возможно, позже
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="sm:max-w-md border-primary/20 bg-card/95 backdrop-blur">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Icon name="UserPlus" size={28} className="text-primary" />
              Пригласить друзей
            </DialogTitle>
            <DialogDescription className="text-base">
              Получайте бонусы за каждого приглашённого друга!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <Icon name="Gift" size={32} className="text-primary" />
                <div>
                  <p className="font-semibold">Ваши бонусы</p>
                  <p className="text-sm text-muted-foreground">+1 слот сервера за каждого друга</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <Icon name="Zap" size={32} className="text-primary" />
                <div>
                  <p className="font-semibold">Бонус другу</p>
                  <p className="text-sm text-muted-foreground">Скидка 15% на первую покупку</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Ваша реферальная ссылка</Label>
              <div className="flex gap-2">
                <Input 
                  value={`${window.location.origin}?ref=invite`} 
                  readOnly 
                  className="font-mono text-sm"
                />
                <Button onClick={handleCopyInviteLink}>
                  <Icon name="Copy" size={18} />
                </Button>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full gap-2 text-lg font-bold"
              onClick={() => {
                handleCopyInviteLink();
                setShowInviteDialog(false);
              }}
            >
              <Icon name="Copy" size={24} />
              Скопировать ссылку
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md border-primary/20 bg-card/95 backdrop-blur">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Icon name="Shield" size={28} className="text-primary" />
              Вход в систему
            </DialogTitle>
            <DialogDescription className="text-base">
              Войдите через Google, чтобы начать работу с панелью управления
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <Icon name="Zap" size={32} className="text-primary" />
              <div>
                <p className="font-semibold">Быстрый и безопасный вход</p>
                <p className="text-sm text-muted-foreground">Используйте ваш Google аккаунт</p>
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full gap-2 text-lg font-bold bg-white text-black hover:bg-gray-100 border border-gray-300"
              onClick={() => {
                setShowAuthDialog(false);
                setShowEmailSelectDialog(true);
              }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Войти через Google
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с условиями использования
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEmailSelectDialog} onOpenChange={setShowEmailSelectDialog}>
        <DialogContent className="sm:max-w-md border-primary/20 bg-card/95 backdrop-blur">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Icon name="Mail" size={28} className="text-primary" />
              Выберите аккаунт
            </DialogTitle>
            <DialogDescription className="text-base">
              Выберите Google аккаунт для входа в систему
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4">
            {googleAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => {
                  setSelectedEmail(account.email);
                  setIsAuthenticated(true);
                  setShowEmailSelectDialog(false);
                }}
                className="flex items-center gap-4 p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group"
              >
                <div className="text-4xl">{account.avatar}</div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-lg group-hover:text-primary transition-colors">{account.name}</p>
                  <p className="text-sm text-muted-foreground">{account.email}</p>
                </div>
                <Icon name="ChevronRight" size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">или введите свою почту</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="customEmail" className="text-sm font-medium">
                Ваша почта Google
              </Label>
              <div className="flex gap-2">
                <Input
                  id="customEmail"
                  type="email"
                  placeholder="example@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={() => {
                    if (customEmail.trim()) {
                      setSelectedEmail(customEmail);
                      setIsAuthenticated(true);
                      setShowEmailSelectDialog(false);
                      setCustomEmail('');
                    }
                  }}
                  disabled={!customEmail.trim()}
                  className="gap-2"
                >
                  <Icon name="LogIn" size={20} />
                  Войти
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="Server" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Панель управления серверами</h1>
                <p className="text-sm text-muted-foreground">Minecraft Server Manager</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!isAuthenticated ? (
                <Button onClick={() => setShowAuthDialog(true)} className="gap-2">
                  <Icon name="LogIn" size={20} />
                  Войти
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setShowInviteDialog(true)} className="gap-2">
                    <Icon name="UserPlus" size={20} />
                    Пригласить
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/server-settings'} className="gap-2">
                    <Icon name="Settings" size={20} />
                    Настройки
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/shop'} className="gap-2">
                    <Icon name="Store" size={20} />
                    Магазин
                  </Button>
                  <Badge variant="outline" className="text-sm">
                    {servers.length} / {MAX_SERVERS} серверов
                  </Badge>
                </>
              )}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="gap-2"
                    disabled={servers.length >= MAX_SERVERS}
                  >
                    <Icon name="Plus" size={18} />
                    Добавить сервер
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Создать новый сервер</DialogTitle>
                    <DialogDescription>
                      Добавьте новый Minecraft сервер в панель ({servers.length}/{MAX_SERVERS})
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Название сервера</Label>
                      <Input 
                        placeholder="Мой сервер"
                        value={newServerName}
                        onChange={(e) => setNewServerName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Кастомный ID</Label>
                      <Input 
                        placeholder="my-server-01"
                        value={newServerCustomId}
                        onChange={(e) => setNewServerCustomId(e.target.value)}
                        className="font-mono"
                      />
                      <p className="text-xs text-muted-foreground">
                        Только латиница, цифры и дефис
                      </p>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={handleAddServer}
                      disabled={!newServerName.trim() || !newServerCustomId.trim()}
                    >
                      <Icon name="Plus" size={16} className="mr-2" />
                      Создать сервер
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {servers.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
              <Icon name="Server" size={48} className="text-slate-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Нет серверов</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Создайте первый сервер, чтобы начать работу
            </p>
            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => setIsDialogOpen(true)}
            >
              <Icon name="Plus" size={20} />
              Создать первый сервер
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {servers.map((server) => (
            <Card key={server.id} className="hover:shadow-lg hover:shadow-primary/20 transition-all hover:scale-105 border-primary/20 hover:border-primary/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={server.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {server.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{server.name}</CardTitle>
                        <CardDescription className="font-mono text-xs mt-1">
                          ID: {server.customId}
                        </CardDescription>
                      </div>
                      <Badge variant={server.status === "online" ? "default" : "secondary"} className="gap-1">
                        <div className={`w-2 h-2 rounded-full ${server.status === "online" ? "bg-green-500" : "bg-yellow-500"} animate-pulse`}></div>
                        {server.status === "online" ? "Онлайн" : "Техработы"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Users" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Игроки:</span>
                  <span className="font-semibold">{server.players}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Icon name="Puzzle" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Плагины: {server.plugins.length}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {server.plugins.slice(0, 3).map((plugin, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{plugin}</Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full gap-2" 
                  variant="outline"
                  onClick={() => window.location.href = `/server-management?id=${server.id}`}
                >
                  <Icon name="Settings" size={16} />
                  Управление сервером
                </Button>
              </CardContent>
            </Card>
          ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;