import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const ServerSettings = () => {
  const [uploadedBuild, setUploadedBuild] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.zip')) {
        toast({
          title: "Ошибка",
          description: "Пожалуйста, загрузите ZIP файл",
          variant: "destructive"
        });
        return;
      }
      setUploadedBuild(file);
      toast({
        title: "Файл выбран",
        description: `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} МБ)`
      });
    }
  };

  const handleInstallBuild = () => {
    if (!uploadedBuild) {
      toast({
        title: "Ошибка",
        description: "Сначала выберите ZIP файл сборки",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Успешно!",
            description: "Сборка установлена на сервер"
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleRemoveBuild = () => {
    setUploadedBuild(null);
    setUploadProgress(0);
    toast({
      title: "Файл удален",
      description: "Выберите новую сборку для загрузки"
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Settings" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold">Настройки сервера</h1>
          </div>
          <Button variant="ghost" onClick={() => window.history.back()}>
            <Icon name="ArrowLeft" size={20} />
            Назад
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-primary/20 hover:border-primary/50 bg-card/50 backdrop-blur transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Package" size={24} className="text-primary" />
                Установка сборки сервера
              </CardTitle>
              <CardDescription>
                Загрузите ZIP архив с готовой сборкой сервера для быстрой установки
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="build-upload" className="text-base">
                  ZIP файл сборки
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="build-upload"
                    type="file"
                    accept=".zip"
                    onChange={handleFileUpload}
                    className="flex-1"
                    disabled={isUploading}
                  />
                  {uploadedBuild && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleRemoveBuild}
                      disabled={isUploading}
                    >
                      <Icon name="X" size={20} />
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Поддерживаются только ZIP архивы. Максимальный размер: 500 МБ
                </p>
              </div>

              {uploadedBuild && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <Icon name="FileArchive" size={32} className="text-primary" />
                    <div className="flex-1">
                      <p className="font-semibold">{uploadedBuild.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Размер: {(uploadedBuild.size / 1024 / 1024).toFixed(2)} МБ
                      </p>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <Icon name="Check" size={14} />
                      Готов
                    </Badge>
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Установка...</span>
                        <span className="font-semibold">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}

                  <Button
                    size="lg"
                    className="w-full gap-2"
                    onClick={handleInstallBuild}
                    disabled={isUploading}
                  >
                    <Icon name="Download" size={20} />
                    {isUploading ? "Установка..." : "Установить сборку"}
                  </Button>
                </div>
              )}

              <div className="border-t border-border pt-6 space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icon name="Info" size={18} className="text-primary" />
                  Требования к сборке
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>Архив должен содержать папки: plugins, worlds, config</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>Формат архива: ZIP (не RAR или 7z)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>Все файлы должны быть в корне архива</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>Максимальный размер файла: 500 МБ</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/50 bg-card/50 backdrop-blur transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Wrench" size={24} className="text-primary" />
                Дополнительные настройки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="gap-2 justify-start h-auto py-4">
                  <Icon name="RefreshCw" size={20} />
                  <div className="text-left">
                    <p className="font-semibold">Перезапустить сервер</p>
                    <p className="text-xs text-muted-foreground">Применить изменения</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="gap-2 justify-start h-auto py-4">
                  <Icon name="Trash2" size={20} />
                  <div className="text-left">
                    <p className="font-semibold">Очистить кэш</p>
                    <p className="text-xs text-muted-foreground">Удалить временные файлы</p>
                  </div>
                </Button>

                <Button variant="outline" className="gap-2 justify-start h-auto py-4">
                  <Icon name="Database" size={20} />
                  <div className="text-left">
                    <p className="font-semibold">Резервная копия</p>
                    <p className="text-xs text-muted-foreground">Создать бэкап мира</p>
                  </div>
                </Button>

                <Button variant="outline" className="gap-2 justify-start h-auto py-4">
                  <Icon name="Terminal" size={20} />
                  <div className="text-left">
                    <p className="font-semibold">Консоль сервера</p>
                    <p className="text-xs text-muted-foreground">Выполнить команды</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ServerSettings;
