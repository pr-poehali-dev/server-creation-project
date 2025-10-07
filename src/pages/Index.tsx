import { useState } from "react";
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

  const [selectedServer, setSelectedServer] = useState<any>(null);
  const [uploadedPlugins, setUploadedPlugins] = useState<File[]>([]);
  const [newServerName, setNewServerName] = useState("");
  const [newServerCustomId, setNewServerCustomId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const MAX_SERVERS = 20;

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
      id: Math.max(...servers.map(s => s.id), 0) + 1,
      name: newServerName,
      customId: newServerCustomId,
      avatar: "",
      players: 0,
      status: "online" as const,
      plugins: []
    };

    setServers([...servers, newServer]);
    setNewServerName("");
    setNewServerCustomId("");
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
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
              <Badge variant="outline" className="text-sm">
                {servers.length} / {MAX_SERVERS} серверов
              </Badge>
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
            <Card key={server.id} className="hover:shadow-lg transition-shadow">
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

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full gap-2" 
                      variant="outline"
                      onClick={() => setSelectedServer(server)}
                    >
                      <Icon name="Settings" size={16} />
                      Управление сервером
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh]">
                    <DialogHeader>
                      <DialogTitle>Управление сервером: {server.name}</DialogTitle>
                      <DialogDescription>Настройки, файлы и плагины</DialogDescription>
                    </DialogHeader>
                    
                    <Tabs defaultValue="settings" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="settings">
                          <Icon name="Settings" size={16} className="mr-2" />
                          Настройки
                        </TabsTrigger>
                        <TabsTrigger value="plugins">
                          <Icon name="Puzzle" size={16} className="mr-2" />
                          Плагины
                        </TabsTrigger>
                        <TabsTrigger value="files">
                          <Icon name="FolderOpen" size={16} className="mr-2" />
                          Файлы
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="settings" className="space-y-6 pt-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Аватарка сервера</Label>
                            <div className="flex items-center gap-4">
                              <Avatar className="w-20 h-20">
                                <AvatarImage src={server.avatar} />
                                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                                  {server.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <Input 
                                  type="file" 
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        handleServerUpdate(server.id, { avatar: event.target?.result });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                  Рекомендуемый размер: 256x256px
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Название сервера</Label>
                            <Input 
                              defaultValue={server.name}
                              onChange={(e) => handleServerUpdate(server.id, { name: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Кастомный ID</Label>
                            <Input 
                              defaultValue={server.customId}
                              onChange={(e) => handleServerUpdate(server.id, { customId: e.target.value })}
                              className="font-mono"
                            />
                            <p className="text-xs text-muted-foreground">
                              Используется для подключения: {server.customId}.myserver.net
                            </p>
                          </div>

                          <div className="flex gap-2 pt-4">
                            <Button className="flex-1">
                              <Icon name="Save" size={16} className="mr-2" />
                              Сохранить изменения
                            </Button>
                            <Button variant="outline">
                              <Icon name="RotateCw" size={16} className="mr-2" />
                              Перезагрузить
                            </Button>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="plugins" className="pt-4">
                        <div className="space-y-4">
                          <div className="border-2 border-dashed rounded-lg p-8 text-center">
                            <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
                            <h3 className="font-semibold mb-2">Загрузить плагины</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Перетащите .jar файлы сюда или выберите их
                            </p>
                            <Input 
                              type="file" 
                              accept=".jar"
                              multiple
                              onChange={handleFileUpload}
                              className="max-w-xs mx-auto"
                            />
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Установленные плагины ({server.plugins.length})</h4>
                            <ScrollArea className="h-[300px] rounded-lg border">
                              <div className="p-4 space-y-2">
                                {server.plugins.map((plugin, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg border bg-white hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Icon name="Puzzle" size={20} className="text-primary" />
                                      </div>
                                      <div>
                                        <div className="font-medium">{plugin}</div>
                                        <div className="text-xs text-muted-foreground">v1.0.0</div>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button variant="ghost" size="sm">
                                        <Icon name="Settings" size={16} />
                                      </Button>
                                      <Button variant="ghost" size="sm">
                                        <Icon name="Trash2" size={16} />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                                
                                {uploadedPlugins.map((file, idx) => (
                                  <div key={`new-${idx}`} className="flex items-center justify-between p-3 rounded-lg border bg-green-50 border-green-200">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                        <Icon name="Upload" size={20} className="text-green-600" />
                                      </div>
                                      <div>
                                        <div className="font-medium">{file.name}</div>
                                        <div className="text-xs text-green-600">Готов к установке</div>
                                      </div>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => setUploadedPlugins(uploadedPlugins.filter((_, i) => i !== idx))}>
                                      <Icon name="X" size={16} />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                            
                            {uploadedPlugins.length > 0 && (
                              <Button className="w-full mt-4">
                                <Icon name="Download" size={16} className="mr-2" />
                                Установить {uploadedPlugins.length} плагинов
                              </Button>
                            )}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="files" className="pt-4">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Icon name="FolderPlus" size={16} className="mr-2" />
                              Создать папку
                            </Button>
                            <Button variant="outline" size="sm">
                              <Icon name="Upload" size={16} className="mr-2" />
                              Загрузить файл
                            </Button>
                          </div>

                          <ScrollArea className="h-[400px] rounded-lg border bg-white">
                            <div className="p-4">
                              <div className="space-y-1">
                                {[
                                  { name: "plugins", type: "folder", size: "24 файла" },
                                  { name: "world", type: "folder", size: "156 МБ" },
                                  { name: "config", type: "folder", size: "12 файлов" },
                                  { name: "server.properties", type: "file", size: "2.4 КБ" },
                                  { name: "spigot.yml", type: "file", size: "1.8 КБ" },
                                  { name: "bukkit.yml", type: "file", size: "1.2 КБ" },
                                ].map((item, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                                    <div className="flex items-center gap-3">
                                      <Icon 
                                        name={item.type === "folder" ? "Folder" : "File"} 
                                        size={20} 
                                        className={item.type === "folder" ? "text-blue-500" : "text-slate-400"}
                                      />
                                      <div>
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-xs text-muted-foreground">{item.size}</div>
                                      </div>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Button variant="ghost" size="sm">
                                        <Icon name="Download" size={16} />
                                      </Button>
                                      <Button variant="ghost" size="sm">
                                        <Icon name="Edit" size={16} />
                                      </Button>
                                      <Button variant="ghost" size="sm">
                                        <Icon name="Trash2" size={16} />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </ScrollArea>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
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