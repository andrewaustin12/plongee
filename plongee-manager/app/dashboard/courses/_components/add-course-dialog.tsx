'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DatePicker from 'react-datepicker'
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

interface AddCourseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddCourseDialog({ open, onOpenChange }: AddCourseDialogProps) {
  const [newCourseStart, setNewCourseStart] = useState(new Date())
  const [newCourseEnd, setNewCourseEnd] = useState(new Date())
  const createCourseMutation = useMutation(api.courses.createCourse)

  const handleCreateCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    await createCourseMutation({
      title: formData.get('title') as string,
      start: newCourseStart.getTime(),
      end: newCourseEnd.getTime(),
      instructor: '',
      participants: [],
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreateCourse}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Course Title</Label>
              <Input id="title" name="title" required className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start" className="text-right">Start Time</Label>
              <div className="col-span-3">
                <DatePicker
                  selected={newCourseStart}
                  onChange={(date) => setNewCourseStart(date as Date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end" className="text-right">End Time</Label>
              <div className="col-span-3">
                <DatePicker
                  selected={newCourseEnd}
                  onChange={(date) => setNewCourseEnd(date as Date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Create Course</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 