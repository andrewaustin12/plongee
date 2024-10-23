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

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

export default function BookingsManagement() {
  // Sample events data
  const [events, setEvents] = useState([
    {
      title: 'Open Water Course',
      start: new Date(2023, 5, 1, 9, 0),
      end: new Date(2023, 5, 1, 17, 0),
    },
    {
      title: 'Advanced Open Water Dive',
      start: new Date(2023, 5, 3, 10, 0),
      end: new Date(2023, 5, 3, 16, 0),
    },
    // Add more sample events as needed
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Bookings Management</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Booking Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              localizer={localizer}
              events={events}
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
            {selectedEvent ? (
              <div>
                <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
                <p>Start: {moment(selectedEvent.start).format('MMMM D, YYYY h:mm A')}</p>
                <p>End: {moment(selectedEvent.end).format('MMMM D, YYYY h:mm A')}</p>
                <Button className="mt-4">Edit Booking</Button>
              </div>
            ) : (
              <p>Select an event to view details</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{moment(event.start).format('MMMM D, YYYY')}</TableCell>
                  <TableCell>{`${moment(event.start).format('h:mm A')} - ${moment(event.end).format('h:mm A')}`}</TableCell>
                  <TableCell>4</TableCell> {/* This is a placeholder, you'd want to add this data to your events */}
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                    <Button variant="destructive" size="sm">Cancel</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
