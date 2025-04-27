
import React from 'react';
import { MainForm } from "@/components/forms/MainForm";

const NewData = () => {
  return (
    <div className="space-y-6">
      <h1 className="heading-1">Yeni Veri Girişi</h1>
      <p className="text-secondary-600">
        İşyerine ait temel bilgileri girin. Tüm alanların doldurulması zorunludur.
      </p>
      <MainForm />
    </div>
  );
};

export default NewData;
