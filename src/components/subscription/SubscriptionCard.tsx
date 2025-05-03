
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureProps {
  children: React.ReactNode;
}

const Feature = ({ children }: FeatureProps) => {
  return (
    <div className="flex items-center gap-2">
      <Check className="h-4 w-4 text-primary" />
      <span className="text-sm">{children}</span>
    </div>
  );
};

interface SubscriptionCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isActive: boolean;
  buttonText: string;
  onSelect: () => void;
  disabled?: boolean;
}

const SubscriptionCard = ({
  title,
  price,
  description,
  features,
  isActive,
  buttonText,
  onSelect,
  disabled = false,
}: SubscriptionCardProps) => {
  return (
    <Card 
      className={cn(
        "flex flex-col",
        "transition-all duration-300",
        isActive && "border-primary/70 shadow-lg shadow-primary/20"
      )}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          {isActive && (
            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">
              Aktif Plan
            </span>
          )}
        </div>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="mb-6">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-sm text-muted-foreground">/ay</span>
        </div>
        
        <div className="space-y-2">
          {features.map((feature, index) => (
            <Feature key={index}>{feature}</Feature>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full" 
          variant={isActive ? "outline" : "default"}
          disabled={disabled}
          onClick={onSelect}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
