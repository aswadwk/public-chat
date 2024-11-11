import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  BookUser,
  FolderDown,
  FolderUp,
  Home,
  Package2,
  PanelLeft,
  ScanLine,
  UserPlus,
} from "lucide-react";
import { useForm, Link } from "@inertiajs/react";
import { ModeToggle } from "../ModeToggle";
import { BreadcrumbWithCustomSeparator } from "../Breadcrumb/BreadcrumbLink";

const Header = () => {
  const { post } = useForm({});

  const signOut = () => {
    post(route("web.auth.logout"));
  };

  return (
    // <header className="sticky top-0 z-30 flex items-center gap-4 px-4 border-b h-14 bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
    <header className="sticky top-0 z-30 flex items-center w-full gap-4 px-4 py-3 border-b bg-background h-14 drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="lg:hidden xl:hidden">
            <PanelLeft className="w-5 h-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center justify-center w-10 h-10 gap-2 text-lg font-semibold rounded-full group shrink-0 bg-primary text-primary-foreground md:text-base"
            >
              <Package2 className="w-5 h-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Ximply</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home size={22} />
              Beranda
            </Link>
            <Link
              href="/smartscans"
              className="flex items-center gap-4 px-2.5 text-foreground"
            >
              <ScanLine size={22} />
              Smartscan
            </Link>
            <Link
              href="/family-cards"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <BookUser size={22} />
              Kartu Keluarga
            </Link>
            <Link
              href="/uploaded"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <FolderUp size={22} />
              Berkas Upload
            </Link>
            <Link
              href="/exported"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <FolderDown size={22} />
              Ekspor File
            </Link>
            <Link
              href="/manage-users"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <UserPlus size={22} />
              Anggota
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div>
        <BreadcrumbWithCustomSeparator />
      </div>
      <div className="relative flex-1 ml-auto md:grow-0">
        <ModeToggle />
      </div>
      <div className="flex flex-col">
        <div className="text-sm capitalize">Aswad</div>
        <p className="text-xs capitalize text-muted-foreground">Super Admin</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <img
              src="/logomark.min.svg"
              width={36}
              height={36}
              alt="Avatar"
              className="p-2 overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/profile">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut()}
            className="cursor-pointer"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
