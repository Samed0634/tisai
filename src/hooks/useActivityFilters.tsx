
import { useState, useEffect } from "react";
import { ActionHistory } from "@/types/actionHistory";

export const useActivityFilters = (activities: ActionHistory[]) => {
  const [filteredActivities, setFilteredActivities] = useState<ActionHistory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Apply filters whenever dependencies change
  useEffect(() => {
    filterActivities();
  }, [searchTerm, timeFilter, activities]);

  const filterActivities = () => {
    let filtered = [...activities];

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (activity) => 
          activity["İşlem Adı"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity["İşlem Yapan Kullanıcı"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (activity["İşyeri ADI"] && activity["İşyeri ADI"]?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (timeFilter === "daily") {
      filtered = filtered.filter(activity => {
        const activityDate = new Date(activity["Tarih"]);
        return activityDate >= today;
      });
    } else if (timeFilter === "weekly") {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = filtered.filter(activity => {
        const activityDate = new Date(activity["Tarih"]);
        return activityDate >= weekAgo;
      });
    } else if (timeFilter === "monthly") {
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      filtered = filtered.filter(activity => {
        const activityDate = new Date(activity["Tarih"]);
        return activityDate >= monthAgo;
      });
    } else if (timeFilter === "yearly") {
      const yearAgo = new Date(today);
      yearAgo.setFullYear(yearAgo.getFullYear() - 1);
      filtered = filtered.filter(activity => {
        const activityDate = new Date(activity["Tarih"]);
        return activityDate >= yearAgo;
      });
    }

    setFilteredActivities(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (value: string) => {
    setTimeFilter(value);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredActivities.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedActivities = filteredActivities.slice(startIndex, startIndex + pageSize);

  return {
    filteredActivities,
    paginatedActivities,
    searchTerm,
    timeFilter,
    pageSize,
    currentPage,
    totalPages,
    startIndex,
    handleSearchChange,
    handleFilterChange,
    handlePageSizeChange,
    setCurrentPage
  };
};
