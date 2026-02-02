import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import "./radio.css";

const RadioGroup = React.forwardRef(({ className = "", ...props }, ref) => (
  <RadioGroupPrimitive.Root className={`radio-group ${className}`} {...props} ref={ref} />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef(({ className = "", ...props }, ref) => (
  <RadioGroupPrimitive.Item className={`radio-item ${className}`} ref={ref} {...props}>
    <RadioGroupPrimitive.Indicator className="radio-indicator">
      <Circle className="radio-icon" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
