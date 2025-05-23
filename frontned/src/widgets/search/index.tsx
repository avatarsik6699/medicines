import { Command } from "@shared/ui/command";
import { ScrollArea } from "@shared/ui/scroll-area";
import { cn } from "@shared/utils";
import { Pill } from "lucide-react";
import type { FC } from "react";
import Badge from "./components/badge";
import { useClickOutside } from "./hooks/use-click-outside";
import { usePages } from "./hooks/use-pages";

type BaseItem = {
  id: number;
  name: string;
};

type Props = {
  status: "error" | "success" | "pending";
  items: BaseItem[];
  onSelect: (id: number) => void;
  search: {
    value: string;
    onChange: (value: string) => void;
  };
};

const Search: FC<Props> = ({ items, status, search, onSelect }) => {
  const pages = usePages();
  const { isOpen, setIsOpen, containerRef } = useClickOutside();

  return (
    <div ref={containerRef} className="relative">
      <Command.Root
        shouldFilter={false}
        className="
          border rounded-lg
          [&_[data-slot='command-input-wrapper']]:border-b-0
        "
      >
        <div className="flex gap-2">
          {pages.value.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
        <Command.Input
          value={search.value}
          onValueChange={search.onChange}
          placeholder="Введите название препарата"
          onFocus={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-controls="search-dropdown"
          tabIndex={0}
        />
        {isOpen && (
          <Command.List
            id="search-dropdown"
            className={cn(
              "max-h-56 min-h-8 h-fit mt-1 border rounded-lg absolute z-10 bg-background w-full top-full shadow-2xs overflow-visible",
            )}
            tabIndex={-1}
          >
            {status === "pending" && <Command.Empty>Loading...</Command.Empty>}
            {status === "error" && <Command.Empty>Error</Command.Empty>}
            {status === "success" && items.length === 0 && (
              <Command.Empty>
                {search.value.length > 0
                  ? "No results found"
                  : "Start typing to search"}
              </Command.Empty>
            )}
            {status === "success" && items.length > 0 && (
              <ScrollArea className="h-56">
                {items.map((item) => (
                  <Command.Item
                    key={item.id}
                    onSelect={() => {
                      search.onChange(item.name);
                      onSelect(item.id);
                    }}
                  >
                    <Pill className="w-4 h-4" />
                    {item.name}
                  </Command.Item>
                ))}
              </ScrollArea>
            )}
          </Command.List>
        )}
      </Command.Root>
    </div>
  );
};

export default Search;
