import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SetStateAction } from "react";

type SheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  width?: string;
};

export default function SheetDemo({
  isOpen,
  onClose,
  children,
  title = "Edit profile",
  description = "Make changes to your profile here. Click save when you're done.",
  width = "max-w-[900px] sm:max-w-[600px] mb-8 overflow-y-auto pb-8",
}: Readonly<SheetProps>) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className={width}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}

export function sheetOnClose(value: SetStateAction<any>) {
  value(false);
}
