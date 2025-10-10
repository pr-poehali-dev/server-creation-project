import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Shop = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"servers" | "websites" | "vds">("servers");

  const accountInfo = {
    id: "377489",
    firstName: "Nddnd",
    lastName: "Djdjd",
    email: "nikitasavin172@gmail.com",
    balance: "0.00"
  };

  const tabs = [
    { id: "servers", label: "Мои серверы", icon: "Server" },
    { id: "websites", label: "Мои сайты", icon: "Globe" },
    { id: "vds", label: "Мои VDS", icon: "HardDrive" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="User" size={32} className="text-primary" />
            <div>
              <h1 className="text-xl font-bold">{accountInfo.firstName} {accountInfo.lastName}</h1>
              <p className="text-sm text-muted-foreground">{accountInfo.balance} ₽</p>
            </div>
          </div>
          <Button variant="ghost" className="gap-2" onClick={() => navigate("/")}>
            <Icon name="Home" size={20} />
            На главную
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Icon name="UserCircle" size={28} className="text-primary" />
              Информация об аккаунте
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Icon name="Hash" size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">ID аккаунта</p>
                  <p className="font-semibold">{accountInfo.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Icon name="User" size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Имя</p>
                  <p className="font-semibold">{accountInfo.firstName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Icon name="UserCircle" size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Фамилия</p>
                  <p className="font-semibold">{accountInfo.lastName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Icon name="Mail" size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">E-Mail</p>
                  <p className="font-semibold">{accountInfo.email}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg md:col-span-2">
                <div className="flex items-center gap-3">
                  <Icon name="Wallet" size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Баланс</p>
                    <p className="font-bold text-lg">{accountInfo.balance} ₽</p>
                  </div>
                </div>
                <Button variant="default" className="gap-2">
                  <Icon name="Plus" size={18} />
                  Пополнить баланс
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 mb-6 flex-wrap">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              className="gap-2"
              onClick={() => setActiveTab(tab.id as any)}
            >
              <Icon name={tab.icon as any} size={20} />
              {tab.label}
            </Button>
          ))}
        </div>

        {activeTab === "servers" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Server" size={24} className="text-primary" />
                Мои серверы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Тариф</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      На данный момент у вас нет серверов.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === "websites" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Globe" size={24} className="text-primary" />
                Мои сайты
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Тариф</TableHead>
                    <TableHead>Домен</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      На данный момент у вас нет сайтов.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === "vds" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="HardDrive" size={24} className="text-primary" />
                Мои VDS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Тариф</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      На данный момент у вас нет VDS.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Shop;
