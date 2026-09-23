"use client";

import * as React from "react";
import { useEffect } from "react";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive, useCommandState } from "cmdk";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface Option {
  value: string;
  label: string;
  disable?: boolean;

  /** Fixed option that can't be removed. */
  fixed?: boolean;

  /** Group options by providing a key. */
  [key: string]: string | boolean | React.CSSProperties | undefined;

  className?: string;
  style?: React.CSSProperties;
}

interface GroupOption {
  [key: string]: Option[];
}

interface MultipleSelectorProps {
  value?: Option[];
  defaultOptions?: Option[];

  /** Manually controlled options. */
  options?: Option[];

  placeholder?: string;

  /** Loading component. */
  loadingIndicator?: React.ReactNode;

  /** Empty component. */
  emptyIndicator?: React.ReactNode;

  /** Debounce time for async search. */
  delay?: number;

  /**
   * Trigger search when input gets focus.
   * Only works with `onSearch`.
   */
  triggerSearchOnFocus?: boolean;

  /** Async search. */
  onSearch?: (value: string) => Promise<Option[]>;

  /** Sync search. */
  onSearchSync?: (value: string) => Option[];

  onChange?: (options: Option[]) => void;

  /** Maximum number of selected options. */
  maxSelected?: number;

  /** Called when maximum selection is reached. */
  onMaxSelected?: (maxLimit: number) => void;

  /** Hide placeholder when options are selected. */
  hidePlaceholderWhenSelected?: boolean;

  disabled?: boolean;

  /** Group options by this property. */
  groupBy?: string;

  className?: string;
  badgeClassName?: string;

  /**
   * cmdk selects the first item by default.
   * This allows disabling that behavior.
   */
  selectFirstItem?: boolean;

  /** Allow creating a new option. */
  creatable?: boolean;

  /** Props passed to Command. */
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>;

  /** Props passed to CommandInput. */
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    "value" | "placeholder" | "disabled"
  >;

  /** Hide clear-all button. */
  hideClearAllButton?: boolean;
}

export interface MultipleSelectorRef {
  selectedValue: Option[];
  input: HTMLInputElement;
  focus: () => void;
  reset: () => void;
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

function transToGroupOption(options: Option[], groupBy?: string): GroupOption {
  if (options.length === 0) {
    return {};
  }

  if (!groupBy) {
    return {
      "": options,
    };
  }

  const groupOption: GroupOption = {};

  options.forEach((option) => {
    const key = (option[groupBy] as string) || "";

    if (!groupOption[key]) {
      groupOption[key] = [];
    }

    groupOption[key].push(option);
  });

  return groupOption;
}

function removePickedOption(
  groupOption: GroupOption,
  picked: Option[],
): GroupOption {
  const cloneOption = structuredClone(groupOption);

  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter(
      (option) =>
        !picked.some((pickedOption) => pickedOption.value === option.value),
    );
  }

  return cloneOption;
}

function isOptionsExist(groupOption: GroupOption, targetOption: Option[]) {
  for (const value of Object.values(groupOption)) {
    if (
      value.some((option) =>
        targetOption.some((target) => target.value === option.value),
      )
    ) {
      return true;
    }
  }

  return false;
}

const CommandEmpty = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) => {
  const render = useCommandState((state) => state.filtered.count === 0);

  if (!render) {
    return null;
  }

  return (
    <div
      className={cn("px-2 py-4 text-center text-sm", className)}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  );
};

CommandEmpty.displayName = "CommandEmpty";

const MultipleSelector = ({
  value,
  onChange,
  placeholder,
  defaultOptions: arrayDefaultOptions = [],
  options: arrayOptions,
  delay,
  onSearch,
  onSearchSync,
  loadingIndicator,
  emptyIndicator,
  maxSelected = Number.MAX_SAFE_INTEGER,
  onMaxSelected,
  hidePlaceholderWhenSelected,
  disabled,
  groupBy,
  className,
  badgeClassName,
  selectFirstItem = true,
  creatable = false,
  triggerSearchOnFocus = false,
  commandProps,
  inputProps,
  hideClearAllButton = false,
}: MultipleSelectorProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);
  const [onScrollbar, setOnScrollbar] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [selected, setSelected] = React.useState<Option[]>(value ?? []);

  const [options, setOptions] = React.useState<GroupOption>(
    transToGroupOption(arrayDefaultOptions, groupBy),
  );

  const [inputValue, setInputValue] = React.useState("");

  const debouncedSearchTerm = useDebounce(inputValue, delay ?? 500);

  const handleClickOutside = React.useCallback(
    (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        inputRef.current &&
        !inputRef.current.contains(target)
      ) {
        setOpen(false);
        inputRef.current.blur();
      }
    },
    [],
  );

  const handleUnselect = React.useCallback(
    (option: Option) => {
      if (option.fixed) {
        return;
      }

      const newOptions = selected.filter((item) => item.value !== option.value);

      setSelected(newOptions);
      onChange?.(newOptions);
    },
    [onChange, selected],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;

      if (!input) {
        return;
      }

      if (
        (event.key === "Delete" || event.key === "Backspace") &&
        input.value === "" &&
        selected.length > 0
      ) {
        handleUnselect(selected[selected.length - 1]);
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [handleUnselect, selected],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    document.addEventListener("mousedown", handleClickOutside);

    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [open, handleClickOutside]);

  useEffect(() => {
    if (value === undefined) return;

    setSelected((prev) => {
      if (
        prev.length === value.length &&
        prev.every((item, index) => item.value === value[index]?.value)
      ) {
        return prev;
      }

      return value;
    });
  }, [value]);

  useEffect(() => {
    if (!arrayOptions || onSearch) {
      return;
    }

    const newOptions = transToGroupOption(arrayOptions, groupBy);

    if (JSON.stringify(newOptions) !== JSON.stringify(options)) {
      setOptions(newOptions);
    }
  }, [arrayOptions, arrayDefaultOptions, groupBy, onSearch, options]);

  useEffect(() => {
    if (!onSearchSync || !open) {
      return;
    }

    const doSearch = () => {
      const result = onSearchSync(debouncedSearchTerm);

      setOptions(transToGroupOption(result, groupBy));
    };

    if (triggerSearchOnFocus || debouncedSearchTerm) {
      doSearch();
    }
  }, [debouncedSearchTerm, groupBy, onSearchSync, open, triggerSearchOnFocus]);

  useEffect(() => {
    if (!onSearch || !open) {
      return;
    }

    const doSearch = async () => {
      setIsLoading(true);

      try {
        const result = await onSearch(debouncedSearchTerm);

        setOptions(transToGroupOption(result, groupBy));
      } finally {
        setIsLoading(false);
      }
    };

    if (triggerSearchOnFocus || debouncedSearchTerm) {
      void doSearch();
    }
  }, [debouncedSearchTerm, groupBy, onSearch, open, triggerSearchOnFocus]);

  const CreatableItem = () => {
    if (!creatable || !inputValue) {
      return null;
    }

    const alreadyExists =
      isOptionsExist(options, [
        {
          value: inputValue,
          label: inputValue,
        },
      ]) || selected.some((option) => option.value === inputValue);

    if (alreadyExists) {
      return null;
    }

    const item = (
      <CommandItem
        value={inputValue}
        className="cursor-pointer"
        onMouseDown={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onSelect={(value) => {
          if (selected.length >= maxSelected) {
            onMaxSelected?.(selected.length);
            return;
          }

          setInputValue("");

          const newOptions = [
            ...selected,
            {
              value,
              label: value,
            },
          ];

          setSelected(newOptions);
          onChange?.(newOptions);
        }}
      >
        Create "{inputValue}"
      </CommandItem>
    );

    if (!onSearch) {
      return item;
    }

    if (onSearch! && debouncedSearchTerm && !isLoading) {
      return item;
    }

    return null;
  };

  const EmptyItem = React.useCallback(() => {
    if (!emptyIndicator) {
      return null;
    }

    if (onSearch && !creatable && Object.keys(options).length === 0) {
      return (
        <CommandItem value="-" disabled>
          {emptyIndicator}
        </CommandItem>
      );
    }

    return <CommandEmpty>{emptyIndicator}</CommandEmpty>;
  }, [creatable, emptyIndicator, onSearch, options]);

  const selectables = React.useMemo(
    () => removePickedOption(options, selected),
    [options, selected],
  );

  const commandFilter = React.useCallback(() => {
    if (commandProps?.filter) {
      return commandProps.filter;
    }

    if (creatable) {
      return (value: string, search: string) =>
        value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
    }

    return undefined;
  }, [commandProps?.filter, creatable]);

  return (
    <Command
      ref={dropdownRef}
      {...commandProps}
      onKeyDown={(event) => {
        handleKeyDown(event);
        commandProps?.onKeyDown?.(event);
      }}
      className={cn(
        "h-auto overflow-visible bg-transparent",
        commandProps?.className,
      )}
      shouldFilter={
        commandProps?.shouldFilter !== undefined
          ? commandProps.shouldFilter
          : !onSearch
      }
      filter={commandFilter()}
    >
      <div
        className={cn(
          "flex items-center border-input focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive relative min-h-14 rounded-md border text-sm transition-[color,box-shadow] outline-none focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50",
          selected.length !== 0 && "p-1",
          !disabled && selected.length !== 0 && "cursor-text",
          !hideClearAllButton && "pr-9",
          className,
        )}
        onClick={() => {
          if (!disabled) {
            inputRef.current?.focus();
          }
        }}
      >
        <div className="flex flex-wrap gap-1">
          {selected.map((option) => (
            <div
              key={option.value}
              className={cn(
                "animate-fade-in bg-secondary text-secondary-foreground hover:bg-muted relative inline-flex h-7 cursor-default items-center rounded-md border pr-7 pl-2 text-xs font-medium transition-all",
                "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                option.fixed && "pr-2",
                badgeClassName,
                option.className,
              )}
              data-fixed={option.fixed}
              data-disabled={disabled || undefined}
              style={option.style}
            >
              {option.label}

              {!option.fixed && (
                <button
                  type="button"
                  className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute -inset-y-px -right-px flex size-7 items-center justify-center rounded-r-md border border-transparent p-0 outline-hidden transition-[color,box-shadow] focus-visible:ring-[3px]"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                  aria-label={`Remove ${option.label}`}
                >
                  <XIcon size={14} aria-hidden="true" />
                </button>
              )}
            </div>
          ))}

          <CommandPrimitive.Input
            {...inputProps}
            ref={inputRef}
            value={inputValue}
            disabled={disabled}
            onValueChange={(value) => {
              setInputValue(value);
              inputProps?.onValueChange?.(value);
            }}
            onBlur={(event) => {
              if (!onScrollbar) {
                setOpen(false);
              }

              inputProps?.onBlur?.(event);
            }}
            onFocus={(event) => {
              setOpen(true);

              if (triggerSearchOnFocus) {
                void onSearch?.(debouncedSearchTerm);
              }

              inputProps?.onFocus?.(event);
            }}
            placeholder={
              hidePlaceholderWhenSelected && selected.length !== 0
                ? ""
                : placeholder
            }
            className={cn(
              "placeholder:text-muted-foreground/70 flex-1 bg-transparent outline-hidden disabled:cursor-not-allowed",
              hidePlaceholderWhenSelected && "w-full",
              selected.length === 0 && "px-3 py-2",
              selected.length !== 0 && "ml-1",
              inputProps?.className,
            )}
          />

          <button
            type="button"
            onClick={() => {
              const fixed = selected.filter((option) => option.fixed);

              setSelected(fixed);
              onChange?.(fixed);
            }}
            className={cn(
              "text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute top-0 right-0 flex size-9 items-center justify-center rounded-md border border-transparent transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
              (hideClearAllButton ||
                disabled ||
                selected.length < 1 ||
                selected.filter((option) => option.fixed).length ===
                  selected.length) &&
                "hidden",
            )}
            aria-label="Clear all"
          >
            <XIcon size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          className={cn(
            "border-input absolute top-2 z-10 w-full overflow-hidden rounded-md border",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            !open && "hidden",
          )}
          data-state={open ? "open" : "closed"}
        >
          {open && (
            <CommandList
              className="bg-popover text-popover-foreground shadow-lg outline-hidden"
              onMouseLeave={() => setOnScrollbar(false)}
              onMouseEnter={() => setOnScrollbar(true)}
              onMouseUp={() => inputRef.current?.focus()}
            >
              {isLoading ? (
                loadingIndicator
              ) : (
                <>
                  {EmptyItem()}
                  {CreatableItem()}

                  {!selectFirstItem && (
                    <CommandItem value="-" className="hidden" />
                  )}

                  {Object.entries(selectables).map(([key, dropdowns]) => (
                    <CommandGroup
                      key={key}
                      heading={key}
                      className="h-full overflow-auto"
                    >
                      {dropdowns.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          disabled={option.disable}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                          onSelect={() => {
                            if (selected.length >= maxSelected) {
                              onMaxSelected?.(selected.length);
                              return;
                            }

                            setInputValue("");

                            const newOptions = [...selected, option];

                            setSelected(newOptions);
                            onChange?.(newOptions);
                          }}
                          className={cn(
                            "cursor-pointer",
                            option.disable &&
                              "pointer-events-none cursor-not-allowed opacity-50",
                          )}
                        >
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </>
              )}
            </CommandList>
          )}
        </div>
      </div>
    </Command>
  );
};

MultipleSelector.displayName = "MultipleSelector";

export default MultipleSelector;
