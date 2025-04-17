
export const generateActivityMessage = (companyName: string, categoryType: string) => {
  const categoryMap = {
    "authorization-requests": "yetki tespiti istenmiştir",
    "authorization-notices": "yetki belgesi tebliğ edilmiştir",
    "call-required": "çağrı yapılmıştır",
    "first-session": "ilk oturum tutulmuştur",
    "dispute-notices": "uyuşmazlık bildirimi yapılmıştır",
    "strike-decisions": "grev kararı alınmıştır",
    "yhk-submissions": "YHK'ya gönderilmiştir",
  };
  
  return `${companyName} işyerinde ${categoryMap[categoryType as keyof typeof categoryMap] || "işlem yapılmıştır"}`;
};
