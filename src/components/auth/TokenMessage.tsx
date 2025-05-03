
import React from "react";

interface TokenMessageProps {
  message: string;
}

export const TokenMessage = ({ message }: TokenMessageProps) => {
  if (!message) return null;

  const isSuccess = message.includes("başarı");
  const bgClass = isSuccess ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700";
  
  return (
    <div 
      id="textMesaj" 
      className={`p-3 rounded-md text-center ${bgClass}`}
    >
      {message}
    </div>
  );
};
