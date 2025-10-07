import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ServerManagement = () => {
  const [server, setServer] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([
    { id: 1, name: 'Steve', status: 'online', joinedAt: '10:30', ping: 45 },
    { id: 2, name: 'Alex', status: 'online', joinedAt: '11:15', ping: 62 },
    { id: 3, name: 'Herobrine', status: 'offline', joinedAt: '09:00', ping: 0 },
  ]);
  const [plugins, setPlugins] = useState<any[]>([
    { id: 1, name: 'EssentialsX', version: '2.19.0', status: 'active', size: '2.4 MB' },
    { id: 2, name: 'WorldEdit', version: '7.2.5', status: 'active', size: '5.1 MB' },
    { id: 3, name: 'Vault', version: '1.7.3', status: 'inactive', size: '1.2 MB' },
  ]);
  const [files, setFiles] = useState<any[]>([
    { id: 1, name: 'server.properties', type: 'file', size: '1.2 KB', modified: '2025-10-06' },
    { id: 2, name: 'plugins', type: 'folder', size: '15.8 MB', modified: '2025-10-07' },
    { id: 3, name: 'world', type: 'folder', size: '245 MB', modified: '2025-10-07' },
    { id: 4, name: 'logs', type: 'folder', size: '8.3 MB', modified: '2025-10-05' },
  ]);
  const [serverVersion, setServerVersion] = useState('1.20.1');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const minecraftVersions = [
    '1.25', '1.24', '1.23', '1.22', '1.21', '1.20.4', '1.20.1', '1.19.4', '1.19.2', 
    '1.18.2', '1.17.1', '1.16.5'
  ];

  useEffect(() => {
    const serverId = new URLSearchParams(window.location.search).get('id');
    const savedServers = localStorage.getItem('servers');
    if (savedServers && serverId) {
      const servers = JSON.parse(savedServers);
      const foundServer = servers.find((s: any) => s.id === parseInt(serverId));
      if (foundServer) {
        setServer(foundServer);
        setServerVersion(foundServer.version || '1.20.1');
      }
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFile(file);
    }
  };

  const handlePluginUpload = () => {
    if (uploadFile) {
      const newPlugin = {
        id: plugins.length + 1,
        name: uploadFile.name.replace('.jar', ''),
        version: '1.0.0',
        status: 'active',
        size: `${(uploadFile.size / 1024 / 1024).toFixed(1)} MB`
      };
      setPlugins([...plugins, newPlugin]);
      setUploadFile(null);
      setShowUploadDialog(false);
    }
  };

  const togglePluginStatus = (pluginId: number) => {
    setPlugins(plugins.map(p => 
      p.id === pluginId 
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    ));
  };

  const kickPlayer = (playerId: number) => {
    setPlayers(players.map(p => 
      p.id === playerId ? { ...p, status: 'offline' } : p
    ));
  };

  if (!server) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="AlertCircle" size={24} className="text-destructive" />
              Сервер не найден
            </CardTitle>
            <CardDescription>
              Вернитесь на главную страницу и выберите сервер
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              На главную
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => window.location.href = '/'}>
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="Server" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{server.name}</h1>
                <p className="text-sm text-muted-foreground">Управление сервером</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={server.status === 'online' ? 'default' : 'secondary'} className="gap-2">
                <div className={`w-2 h-2 rounded-full ${server.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                {server.status === 'online' ? 'Онлайн' : 'Оффлайн'}
              </Badge>
              <Button 
                variant={server.status === 'online' ? 'destructive' : 'default'}
                className="gap-2"
              >
                <Icon name={server.status === 'online' ? 'Power' : 'Play'} size={20} />
                {server.status === 'online' ? 'Остановить' : 'Запустить'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="gap-2">
              <Icon name="LayoutDashboard" size={18} />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="players" className="gap-2">
              <Icon name="Users" size={18} />
              Игроки
            </TabsTrigger>
            <TabsTrigger value="plugins" className="gap-2">
              <Icon name="Package" size={18} />
              Плагины
            </TabsTrigger>
            <TabsTrigger value="files" className="gap-2">
              <Icon name="FolderOpen" size={18} />
              Файлы
            </TabsTrigger>
            <TabsTrigger value="ip" className="gap-2">
              <Icon name="Globe" size={18} />
              IP Адрес
            </TabsTrigger>
            <TabsTrigger value="version" className="gap-2">
              <Icon name="Download" size={18} />
              Версия
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Users" size={18} className="text-primary" />
                    Игроки онлайн
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{players.filter(p => p.status === 'online').length}</div>
                  <p className="text-xs text-muted-foreground">из 20 максимум</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="HardDrive" size={18} className="text-primary" />
                    Использование RAM
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2.4 GB</div>
                  <p className="text-xs text-muted-foreground">из 4 GB</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Cpu" size={18} className="text-primary" />
                    CPU нагрузка
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">45%</div>
                  <p className="text-xs text-muted-foreground">средняя нагрузка</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Информация о сервере</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Версия Minecraft</span>
                  <Badge variant="outline">{serverVersion}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Время работы</span>
                  <span className="text-sm">5 часов 23 минуты</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Активных плагинов</span>
                  <span className="text-sm">{plugins.filter(p => p.status === 'active').length} из {plugins.length}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="players">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Список игроков</span>
                  <Badge variant="outline">{players.filter(p => p.status === 'online').length} онлайн</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Игрок</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Время входа</TableHead>
                      <TableHead>Пинг</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {players.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell className="font-medium">{player.name}</TableCell>
                        <TableCell>
                          <Badge variant={player.status === 'online' ? 'default' : 'secondary'}>
                            {player.status === 'online' ? 'Онлайн' : 'Оффлайн'}
                          </Badge>
                        </TableCell>
                        <TableCell>{player.joinedAt}</TableCell>
                        <TableCell>{player.ping > 0 ? `${player.ping} ms` : '-'}</TableCell>
                        <TableCell className="text-right">
                          {player.status === 'online' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => kickPlayer(player.id)}
                            >
                              <Icon name="UserX" size={16} className="mr-1" />
                              Кикнуть
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plugins">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Установленные плагины</span>
                  <Button onClick={() => setShowUploadDialog(true)}>
                    <Icon name="Upload" size={16} className="mr-2" />
                    Загрузить плагин
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Версия</TableHead>
                      <TableHead>Размер</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plugins.map((plugin) => (
                      <TableRow key={plugin.id}>
                        <TableCell className="font-medium">{plugin.name}</TableCell>
                        <TableCell>{plugin.version}</TableCell>
                        <TableCell>{plugin.size}</TableCell>
                        <TableCell>
                          <Badge variant={plugin.status === 'active' ? 'default' : 'secondary'}>
                            {plugin.status === 'active' ? 'Активен' : 'Выключен'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => togglePluginStatus(plugin.id)}
                          >
                            <Icon name={plugin.status === 'active' ? 'Power' : 'Play'} size={16} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="Trash2" size={16} className="text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Файловый менеджер</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="FolderPlus" size={16} className="mr-2" />
                      Создать папку
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Upload" size={16} className="mr-2" />
                      Загрузить файл
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {files.map((file) => (
                      <div 
                        key={file.id}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Icon 
                            name={file.type === 'folder' ? 'Folder' : 'File'} 
                            size={24} 
                            className={file.type === 'folder' ? 'text-primary' : 'text-muted-foreground'}
                          />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {file.size} • Изменён {file.modified}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Icon name="Download" size={16} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="Trash2" size={16} className="text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ip">
            <Card>
              <CardHeader>
                <CardTitle>IP Адрес сервера</CardTitle>
                <CardDescription>
                  Используйте этот адрес для подключения к серверу
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium mb-2 block">Основной IP адрес</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      value={`play.${server.customId}.minecraft.com`} 
                      readOnly 
                      className="font-mono text-lg"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(`play.${server.customId}.minecraft.com`);
                      }}
                    >
                      <Icon name="Copy" size={20} />
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium mb-2 block">Числовой IP адрес</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      value="185.248.140.52:25565" 
                      readOnly 
                      className="font-mono text-lg"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText('185.248.140.52:25565');
                      }}
                    >
                      <Icon name="Copy" size={20} />
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <Icon name="Info" size={24} className="text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Как подключиться?</p>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Откройте Minecraft</li>
                      <li>Нажмите "Сетевая игра"</li>
                      <li>Нажмите "Добавить сервер"</li>
                      <li>Вставьте скопированный IP адрес</li>
                      <li>Нажмите "Готово" и подключитесь!</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="version">
            <Card>
              <CardHeader>
                <CardTitle>Версия Minecraft сервера</CardTitle>
                <CardDescription>
                  Выберите версию Minecraft для вашего сервера
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Текущая версия</Label>
                  <Select value={serverVersion} onValueChange={setServerVersion}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {minecraftVersions.map((version) => (
                        <SelectItem key={version} value={version}>
                          Minecraft {version}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-start gap-3 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <Icon name="AlertTriangle" size={24} className="text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1 text-yellow-600 dark:text-yellow-500">Внимание!</p>
                    <p className="text-sm text-muted-foreground">
                      Изменение версии сервера требует перезагрузки и может привести к несовместимости плагинов. 
                      Создайте резервную копию перед обновлением.
                    </p>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <Icon name="Download" size={20} className="mr-2" />
                  Применить версию {serverVersion}
                </Button>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Популярные версии</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['1.20.1', '1.19.4', '1.18.2', '1.16.5'].map((version) => (
                      <Button
                        key={version}
                        variant={serverVersion === version ? 'default' : 'outline'}
                        onClick={() => setServerVersion(version)}
                        className="w-full"
                      >
                        {version}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Загрузить плагин</DialogTitle>
            <DialogDescription>
              Выберите .jar файл плагина для загрузки на сервер
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="plugin-upload">Файл плагина (.jar)</Label>
              <Input
                id="plugin-upload"
                type="file"
                accept=".jar"
                onChange={handleFileUpload}
              />
            </div>
            {uploadFile && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">{uploadFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(uploadFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Отмена
            </Button>
            <Button onClick={handlePluginUpload} disabled={!uploadFile}>
              <Icon name="Upload" size={16} className="mr-2" />
              Загрузить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServerManagement;
