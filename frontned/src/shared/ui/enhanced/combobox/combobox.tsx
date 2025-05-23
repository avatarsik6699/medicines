import type { JSX } from "react";
import { useState } from "react";
import { Popover } from "@shared/ui/popover";
import { Button } from "@shared/ui/button";
import { Command } from "@shared/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@shared/utils";

type BaseListItem = {
  id: string;
  label: string;
  value: string | undefined;
};

type Props<ListItem extends BaseListItem> = {
  items: ListItem[];
  placeholder?: string;
  initialValue?: ListItem["value"];
  onSelect: (value: ListItem["value"]) => void;
  value: ListItem["value"] | undefined;
  setValue: (value: ListItem["value"]) => void;
};

const Combobox = <ListItem extends BaseListItem>(
  props: Props<ListItem>,
): JSX.Element => {
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState<ListItem["value"] | null>(
  //   props.initialValue ?? null,
  // );

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {props.value
            ? props.items.find((item) => item.value === props.value)?.label
            : props.placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </Popover.Trigger>

      <Popover.Content className="p-0">
        <Command.Root>
          <Command.Input placeholder={props.placeholder} />
          <Command.List>
            <Command.Empty>No items found.</Command.Empty>

            <Command.Group>
              {props.items.map((item) => (
                <Command.Item
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    const valueToSet =
                      currentValue === props.value ? undefined : currentValue;

                    props.setValue(valueToSet);
                    props.onSelect(valueToSet);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      props.value === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
  );
};

export type { Props as ComboboxProps };
export default Combobox;
