"use client"

import { useState } from "react"
import { CalendarIcon, Clock, Users, UtensilsCrossed } from 'lucide-react'
import { addDays, format, isSameDay, setHours, setMinutes } from "date-fns"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TimeSlot {
  time: string
  available: boolean
}

export default function BookingCard() {
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const [partySize, setPartySize] = useState("2")
  const [specialRequests, setSpecialRequests] = useState("")

  // Generate time slots based on the selected date
  const getTimeSlots = (selectedDate: Date | undefined): TimeSlot[] => {
    const slots: TimeSlot[] = []
    const now = new Date()
    const isToday = selectedDate && isSameDay(selectedDate, now)

    for (let hour = 17; hour <= 21; hour++) {
      for (const minute of [0, 30]) {
        const slotTime = setMinutes(setHours(new Date(), hour), minute)
        const timeString = format(slotTime, "HH:mm")
        
        // If it's today, disable past times
        const isPastTime = isToday && slotTime <= now
        
        // Simulate some slots being unavailable
        const randomAvailability = Math.random() > 0.3

        slots.push({
          time: timeString,
          available: !isPastTime && randomAvailability,
        })
      }
    }
    return slots
  }

  const timeSlots = getTimeSlots(date)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Show loading toast
    const loadingToast = toast.loading('Processing your reservation...')

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast)
      toast.success('Reservation Confirmed! 🎉', {
        description: `Your table for ${partySize} has been reserved for ${date?.toLocaleDateString()} at ${time}.`,
        duration: 5000,
      })

      // Reset form
      setDate(undefined)
      setTime(undefined)
      setPartySize("2")
      setSpecialRequests("")
    } catch (error) {
      // Dismiss loading toast and show error
      toast.dismiss(loadingToast)
      toast.error(`Booking Failed: ${error}`, {
        description: 'Something went wrong. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TooltipProvider>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-6 w-6" />
            <CardTitle className="text-2xl">Reserve a Table</CardTitle>
          </div>
          <CardDescription>
            Book your perfect dining experience in just a few clicks
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                    aria-label="Select date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "EEEE, MMMM d, yyyy") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => 
                      date < new Date() || date > addDays(new Date(), 30)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <Select 
                value={time} 
                onValueChange={setTime}
                disabled={!date}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a time">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {time || "Select a time"}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(({ time, available }) => (
                    <Tooltip key={time}>
                      <TooltipTrigger asChild>
                        <div>
                          <SelectItem
                            value={time}
                            disabled={!available}
                            className={cn(
                              "cursor-pointer",
                              !available && "opacity-50"
                            )}
                          >
                            {time}
                          </SelectItem>
                        </div>
                      </TooltipTrigger>
                      {!available && (
                        <TooltipContent>
                          This time slot is not available
                        </TooltipContent>
                      )}
                    </Tooltip>
                  ))}
                </SelectContent>
              </Select>
              {!date && (
                <p className="text-sm text-muted-foreground">
                  Please select a date first
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="party-size">Party Size</Label>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="party-size"
                  type="number"
                  value={partySize}
                  onChange={(e) => {
                    const value = parseInt(e.target.value)
                    if (value >= 1 && value <= 12) {
                      setPartySize(e.target.value)
                    }
                  }}
                  min="1"
                  max="12"
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">guests</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Maximum 12 guests per booking
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="special-requests">Special Requests</Label>
              <textarea
                id="special-requests"
                className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Any dietary requirements or special occasions?"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={!date || !time || !partySize || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </div>
              ) : (
                "Reserve Now"
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              By clicking Reserve Now, you agree to our reservation policy
            </p>
          </CardFooter>
        </form>
      </Card>
    </TooltipProvider>
  )
}

