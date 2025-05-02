
"use client"

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

// Create a new component for images that automatically fill their container
const AspectRatioImage = React.forwardRef<
  React.ElementRef<"img">,
  React.ComponentPropsWithoutRef<"img"> & { ratio?: number }
>(({ className, ratio = 16 / 9, alt, ...props }, ref) => (
  <AspectRatio ratio={ratio} className={className}>
    <img
      ref={ref}
      alt={alt}
      className="h-full w-full object-cover"
      {...props}
    />
  </AspectRatio>
))
AspectRatioImage.displayName = "AspectRatioImage"

export { AspectRatio, AspectRatioImage }
