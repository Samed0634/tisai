
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, FileText, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Örnek veri - Gerçek uygulamada API'den gelecek
const dashboardData = {
  weeklyCallRequiredCompanies: 12,
  weeklyFirstSessionCompanies: 8,
  dailyCompanies: 5,
};

const DashboardCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  onClick?: () => void;
}> = ({ title, value, icon, onClick }) => {
  return (
    <Card onClick={onClick} className="card-dashboard cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="rounded-md bg-primary-50 p-2 text-primary-700">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="stats-value">{value}</div>
        <p className="stats-label">İşyeri</p>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  // Detay sayfasına yönlendirme fonksiyonları
  const goToCallDetails = () => navigate("/details/calls");
  const goToSessionDetails = () => navigate("/details/sessions");
  const goToDailyDetails = () => navigate("/details/daily");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="heading-1">Gösterge Paneli</h1>
        <Button onClick={() => navigate("/actions")}>İşlem Seç</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <DashboardCard
          title="Haftalık Çağrı Yapılacak İşyerleri"
          value={dashboardData.weeklyCallRequiredCompanies}
          icon={<Clock className="h-5 w-5" />}
          onClick={goToCallDetails}
        />
        <DashboardCard
          title="Haftalık İlk Oturum İşyerleri"
          value={dashboardData.weeklyFirstSessionCompanies}
          icon={<CalendarDays className="h-5 w-5" />}
          onClick={goToSessionDetails}
        />
        <DashboardCard
          title="Günlük İşyerleri"
          value={dashboardData.dailyCompanies}
          icon={<FileText className="h-5 w-5" />}
          onClick={goToDailyDetails}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 border-b pb-4">
              <div className="rounded-full bg-primary-50 p-2">
                <UserPlus className="h-4 w-4 text-primary-500" />
              </div>
              <div>
                <p className="font-medium">ABC İşyeri verileri güncellendi</p>
                <p className="text-sm text-muted-foreground">Bugün, 10:24</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-b pb-4">
              <div className="rounded-full bg-primary-50 p-2">
                <CalendarDays className="h-4 w-4 text-primary-500" />
              </div>
              <div>
                <p className="font-medium">XYZ İşyeri için oturum ayarlandı</p>
                <p className="text-sm text-muted-foreground">Dün, 14:30</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary-50 p-2">
                <Clock className="h-4 w-4 text-primary-500" />
              </div>
              <div>
                <p className="font-medium">DEF İşyeri çağrısı yapıldı</p>
                <p className="text-sm text-muted-foreground">2 gün önce, 11:15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Yaklaşan Etkinlikler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 border-b pb-4">
              <div className="text-center min-w-[50px]">
                <p className="text-sm font-medium bg-primary-50 rounded-t-md text-primary-700 py-1">Nis</p>
                <p className="text-xl font-bold bg-white border rounded-b-md py-1">18</p>
              </div>
              <div>
                <p className="font-medium">MNO İşyeri İlk Oturum</p>
                <p className="text-sm text-muted-foreground">15:00 - 16:30</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-b pb-4">
              <div className="text-center min-w-[50px]">
                <p className="text-sm font-medium bg-primary-50 rounded-t-md text-primary-700 py-1">Nis</p>
                <p className="text-xl font-bold bg-white border rounded-b-md py-1">20</p>
              </div>
              <div>
                <p className="font-medium">PQR İşyeri Çağrı</p>
                <p className="text-sm text-muted-foreground">11:00 - 12:00</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center min-w-[50px]">
                <p className="text-sm font-medium bg-primary-50 rounded-t-md text-primary-700 py-1">Nis</p>
                <p className="text-xl font-bold bg-white border rounded-b-md py-1">22</p>
              </div>
              <div>
                <p className="font-medium">STU İşyeri Toplantı</p>
                <p className="text-sm text-muted-foreground">13:30 - 14:30</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
