"use client";

import React, { useState, useMemo } from 'react';
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
import { Input } from "@/components/ui/input";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { NewCustomerDialog } from "@/app/dashboard/customers/_components/NewCustomerDialog";
import { CustomerDetailsDialog } from "@/app/dashboard/customers/_components/CustomerDetailsDialog";
import { EmptyState } from "@/components/EmptyState";
import { toast } from 'sonner';
import { Id } from "@/convex/_generated/dataModel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function CustomerManagement() {
  const customers = useQuery(api.customers.getAll);
  const deleteCustomer = useMutation(api.customers.remove);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerToDelete, setCustomerToDelete] = useState<Id<"customers"> | null>(null);

  const handleDeleteConfirm = async () => {
    if (customerToDelete) {
      try {
        await deleteCustomer({ id: customerToDelete });
        toast.success('Customer deleted successfully!');
      } catch (error) {
        console.error('Error deleting customer:', error);
        toast.error('Failed to delete customer. Please try again.');
      } finally {
        setCustomerToDelete(null);
      }
    }
  };

  const filteredCustomers = useMemo(() => {
    if (!customers) return [];
    return customers.filter(customer => 
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.certLevel.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Customer Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input 
              className="max-w-sm" 
              placeholder="Search customers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <NewCustomerDialog />
          </div>
          {customers === undefined ? (
            <EmptyState message="Loading customers..." />
          ) : customers.length === 0 ? (
            <EmptyState message="No customers found. Add a new customer to get started." />
          ) : filteredCustomers.length === 0 ? (
            <EmptyState message="No customers match your search." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Certification Level</TableHead>
                  <TableHead>Total Dives</TableHead>
                  <TableHead>Last Dive Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
                    <TableCell>{customer.certLevel}</TableCell>
                    <TableCell>{customer.totalDives}</TableCell>
                    <TableCell>{customer.lastDiveDate || 'N/A'}</TableCell>
                    <TableCell>
                      <CustomerDetailsDialog customer={customer} />
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => setCustomerToDelete(customer._id)}
                        className="ml-2"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!customerToDelete} onOpenChange={() => setCustomerToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this customer?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the customer&apos;s data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
