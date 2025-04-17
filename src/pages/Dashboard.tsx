import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertTriangle, 
  Building, 
  Calendar, 
  FileCheck, 
  FileText, 
  Gavel, 
  MessageSquare, 
  Scale 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const dashboardData = [
  { 
    id: "authorization-requests", 
    title: "Yetki Tespiti İstenecek İşyerleri", 
    value: 12, 
    icon: <Building className="h-5 w-5" /> 
  },
  { 
    id: "authorization-notices", 
    title: "Yetki Belgesi Tebliğ Yapılan İşyerleri", 
    value: 8, 
    icon: <FileCheck className="h-5 w-5" /> 
  },
  { 
    id: "call-required", 
    title: "Çağrı Yapılacak İşyerleri", 
    value: 15, 
    icon: <MessageSquare className="h-5 w-5" /> 
  },
  { 
    id: "first-session", 
    title: "İlk Oturum Tutulması Gereken İşyerleri", 
    value: 10, 
    icon: <Calendar className="h-5 w-5" /> 
  },
  { 
    id: "dispute-notices", 
    title: "Uyuşmazlık Bildirimi Yapılması Gereken İşyerleri", 
    value: 5, 
    icon: <AlertTriangle className="h-5 w-5" /> 
  },
  { 
    id: "strike-decisions", 
    title: "Grev Kararı Alınması Gereken İşyerleri", 
    value: 3, 
    icon: <Gavel className="h-5 w-5" /> 
  },
  { 
    id: "yhk-submissions", 
    title: "YHK'ya Gönderilmesi Gereken İşyerleri", 
    value: 2, 
    icon: <Scale className="h-5 w-5" /> 
  }
];

const recentActivities = [
  { 
    id: 1, 
    title: "ABC İşyerinde yetki tespiti istenmiştir", 
    time: "Bugün, 10:24", 
    date: "17.04.2025",
    icon: <Building className="h-4 w-4 text-primary-500" /> 
  },
  { 
    id: 2, 
    title: "XYZ İşyerinde ilk oturum tutulmuştur", 
    time: "Dün, 14:30",
    date: "16.04.2025", 
    icon: <Calendar className="h-4 w-4 text-primary-500" /> 
  },
  { 
    id: 3, 
    title: "DEF İşyerinde çağrı yapılmıştır", 
    time: "2 gün önce, 11:15",
    date: "15.04.2025",
    icon: <MessageSquare className="h-4 w-4 text-primary-500" /> 
  }
];

const upcomingMeetings = [
  { 
    id: 1, 
    title: "MNO İşyeri İlk Oturum", 
    date: "18", 
    month: "Nis", 
    time: "15:00 - 16:30" 
  },
  { 
    id: 2, 
    title: "PQR İşyeri Çağrı", 
    date: "20", 
    month: "Nis", 
    time: "11:00 - 12:00" 
  },
  { 
    id: 3, 
    title: "STU İşyeri Toplantı", 
    date: "22", 
    month: "Nis", 
    time: "13:30 - 14:30" 
  }
];

const DashboardCard = ({ title, value, icon, onClick }) => {
  return (
    <Card 
      onClick={onClick} 
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary-300"
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          <span className="bg-[#ea384c] text-white px-2 py-1 rounded inline-block">{title}</span>
        </CardTitle>
        <div className="rounded-md bg-primary-50 p-2 text-primary-700">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">İşyeri</p>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (categoryId) => {
    navigate(`/details/${categoryId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gösterge Paneli</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dashboardData.map((item) => (
          <DashboardCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Son İşlemler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                <div className="rounded-full bg-primary-50 p-2">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    İşlem Tarihi: {activity.date} ({activity.time})
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Yaklaşan Toplantılar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                <div className="text-center min-w-[50px]">
                  <p className="text-sm font-medium bg-primary-50 rounded-t-md text-primary-700 py-1">{meeting.month}</p>
                  <p className="text-xl font-bold bg-white border rounded-b-md py-1">{meeting.date}</p>
                </div>
                <div>
                  <p className="font-medium">{meeting.title}</p>
                  <p className="text-sm text-muted-foreground">{meeting.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
