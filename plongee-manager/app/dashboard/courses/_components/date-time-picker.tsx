import * as React from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

interface DateTimePickerProps {
  value: Date
  onChange: (date: Date) => void
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP HH:mm") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date: Date | undefined) => {
            if (date) {
              const newDateTime = new Date(date)
              newDateTime.setHours(value.getHours())
              newDateTime.setMinutes(value.getMinutes())
              onChange(newDateTime)
            }
          }}
        />
        <div className="p-3 border-t">
          <Input
            type="time"
            value={format(value, "HH:mm")}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(":")
              const newDateTime = new Date(value)
              newDateTime.setHours(parseInt(hours))
              newDateTime.setMinutes(parseInt(minutes))
              onChange(newDateTime)
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
} 