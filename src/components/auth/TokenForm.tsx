
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowLeft } from "lucide-react";
import { useTokenActivation } from "@/hooks/useTokenActivation";
import { TokenMessage } from "./TokenMessage";
import { useNavigate } from "react-router-dom";

// Remove the props interface since we no longer need it
export const TokenForm = () => {
  const [token, setToken] = useState("");
  const { isLoading, message, activateWithToken } = useTokenActivation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await activateWithToken(token);
  };

  const handleBackToSignup = () => {
    navigate("/signup");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-4 text-muted-foreground" id="textDescrption">
        Hesabınızı aktifleştirmek ve kurumunuza bağlanmak için size verilen Kurum Tokenını girin.
      </div>
      
      <div className="space-y-2">
        <label htmlFor="inputKurumToken" className="text-sm font-medium">
          Kurum Tokenı
        </label>
        <Input
          id="inputKurumToken"
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Token giriniz"
          required
          disabled={isLoading}
        />
      </div>
      
      <TokenMessage message={message} />
      
      <Button 
        id="buttonBaglan" 
        type="submit" 
        className="w-full" 
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            İşleniyor...
          </>
        ) : (
          "Hesabımı Aktive Et / Bağlan"
        )}
      </Button>
      
      <Button 
        type="button" 
        variant="outline" 
        className="w-full" 
        onClick={handleBackToSignup}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Kayıt Ekranına Dön
      </Button>
    </form>
  );
};
