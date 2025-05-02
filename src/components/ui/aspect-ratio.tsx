
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

// Create a component that combines AspectRatio with proper image handling
const AspectRatioImage = ({ 
  src, 
  alt, 
  ratio = 1, 
  className = "", 
  ...props 
}: { 
  src: string, 
  alt: string, 
  ratio?: number, 
  className?: string, 
  [key: string]: any 
}) => {
  return (
    <AspectRatio ratio={ratio} className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        {...props}
      />
    </AspectRatio>
  )
}

export { AspectRatio, AspectRatioImage }
