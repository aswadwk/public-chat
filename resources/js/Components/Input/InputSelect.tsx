"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../ui/label";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

type SelectInput = {
  value: string;
  label: string;
};

type SelectInputProps = {
  items: SelectInput[];
  label?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  withSearch?: boolean;
  error?: string;
  value: string;
};

export default function InputSelect({
  items,
  label = "Select",
  placeholder = "Search...",
  onChange,
  withSearch = false,
  error,
  value,
}: Readonly<SelectInputProps>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Label htmlFor="status">{label}</Label>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {value
            ? items.find((data: SelectInput) => data.value === value)?.label
            : label}
          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 popover-content-width-full">
        <Command className="w-full">
          {withSearch && (
            <CommandInput
              placeholder={placeholder}
              className="w-full h-9"
              onValueChange={(value) => onChange(value)}
            />
          )}
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup className="w-full">
              {items.map((item) => (
                <CommandItem
                  className="w-full"
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </Popover>
  );
}
