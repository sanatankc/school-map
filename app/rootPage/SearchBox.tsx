import React, { useState, FC } from 'react'
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"


interface Props {
  value: string;
  setValue: (val: string) => void;
  options: { label: string, value: number }[];
  placeholder: string;
  label: string;
  onSubmit: (val: string) => void;
}

const SearchBox: FC<Props> = ({
  value,
  setValue,
  options,
  placeholder,
  label,
  onSubmit
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={cn('relative w-64', isOpen && 'z-[9999]')}>
        <Label htmlFor={'search' + label} className="text-slate-500 text-sm font-medium mb-2 block">{label}</Label>
        <Command 
          shouldFilter={false}
          className='border rounded'
          loop
        >
          
          <CommandInput 
            placeholder={placeholder}
            value={value}
            onValueChange={(val) => {
              setIsOpen(true)
              setValue(val)
            }}
            id={'search' + label} 
          />
          {value.length > 0 && isOpen && (
            <CommandList className='absolute w-full bg-white border top-[75px] z-50'>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map(({ label, value }) => (
                  <CommandItem onSelect={() => {
                    setValue(label)
                    onSubmit(value)
                    setIsOpen(false)
                  }}>
                    {label}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
          )}
        </Command>
      </div>
      {isOpen && (
        <div className='w-screen h-screen fixed z-[999] top-0 left-0'
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default SearchBox;