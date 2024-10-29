'use client'

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { AddCourseDialog } from './_components/add-course-dialog'

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

export default function CoursesManagement() {
  // Replace the static courses state with the query
  const courses = useQuery(api.courses.getCourses);
  
  // Transform Convex data for the calendar
  const calendarEvents = courses?.map(course => ({
    id: course._id,
    title: course.title,
    start: new Date(course.start),
    end: new Date(course.end),
    instructor: course.instructor,
    participants: course.participants,
  })) ?? [];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewCourseDialogOpen, setIsNewCourseDialogOpen] = useState(false);

  const handleSelectEvent = (event) => {
    setSelectedCourse(event);
  };

  const handleEditEvent = (event) => {
    setSelectedCourse(event);
    setIsEditDialogOpen(true);
  };

  const handleUpdateCourse = (updatedCourse) => {
    setCourses(courses.map(course => course.id === updatedCourse.id ? updatedCourse : course));
    setIsEditDialogOpen(false);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-semibold">Courses Management</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Booking Calendar</CardTitle>
              <Button onClick={() => setIsNewCourseDialogOpen(true)}>Add Course</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectEvent={handleSelectEvent}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedCourse ? (
              <div>
                <h3 className="text-lg font-semibold">{selectedCourse.title}</h3>
                <p>Start: {moment(selectedCourse.start).format('MMMM D, YYYY h:mm A')}</p>
                <p>End: {moment(selectedCourse.end).format('MMMM D, YYYY h:mm A')}</p>
                <p>Instructor: {selectedCourse.instructor}</p>
                <p>Participants: {selectedCourse.participants.length}</p>
                <Button className="mt-4" onClick={() => handleEditEvent(selectedCourse)}>Edit Booking</Button>
              </div>
            ) : (
              <p>Select an event to view details</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calendarEvents.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{moment(course.start).format('MMMM D, YYYY')}</TableCell>
                  <TableCell>{`${moment(course.start).format('h:mm A')} - ${moment(course.end).format('h:mm A')}`}</TableCell>
                  <TableCell>{course.instructor || 'Not assigned'}</TableCell>
                  <TableCell>{course.participants.length}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleEditEvent(course)}>Assign</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Instructor and Participants</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const updatedCourse = {
                ...selectedCourse,
                instructor: formData.get('instructor'),
                participants: formData.get('participants').split(',').map(p => p.trim()).filter(Boolean),
              };
              handleUpdateCourse(updatedCourse);
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="instructor" className="text-right">Instructor</Label>
                  <Select name="instructor" defaultValue={selectedCourse.instructor}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select instructor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="John Doe">John Doe</SelectItem>
                      <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="participants" className="text-right">Participants</Label>
                  <Input id="participants" name="participants" defaultValue={selectedCourse.participants.join(', ')} className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <AddCourseDialog 
        open={isNewCourseDialogOpen} 
        onOpenChange={setIsNewCourseDialogOpen}
      />
    </div>
  );
}
