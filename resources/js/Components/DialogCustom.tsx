import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { cn } from "@/Lib/utils";

export default function DialogCustom({
    title,
    description,
    children,
    onClose,
    isOpen,
    width,
}: Readonly<{
    children: React.ReactNode;
    title: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    width?: string;
}>) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={cn("w-full", width && width)}>
                <DialogHeader>
                    <DialogTitle>{title || "Edit profile"}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}
