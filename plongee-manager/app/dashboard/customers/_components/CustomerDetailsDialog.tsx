"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from 'sonner';
import { Id } from "@/convex/_generated/dataModel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CustomerDetailsDialogProps {
  customer: {
    _id: Id<"customers">;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    certLevel: string;
    totalDives: number;
    lastDiveDate?: string;
    emergencyContact: {
      name: string;
      phone: string;
    };
    diveInsurance?: {
      provider: string;
      policyNumber: string;
    };
  };
}

export function CustomerDetailsDialog({ customer: initialCustomer }: CustomerDetailsDialogProps) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customer, setCustomer] = useState(initialCustomer);
  const [hasDiveInsurance, setHasDiveInsurance] = useState(!!initialCustomer.diveInsurance);

  const updateCustomer = useMutation(api.customers.update);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({
      ...prev,
      [name]: name === 'totalDives' ? parseInt(value) || 0 : value
    }));
  };

  const handleEmergencyContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [name]: value
      }
    }));
  };

  const handleDiveInsuranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({
      ...prev,
      diveInsurance: {
        ...(prev.diveInsurance || { provider: '', policyNumber: '' }),
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCustomer({
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        certLevel: customer.certLevel,
        totalDives: customer.totalDives,
        lastDiveDate: customer.lastDiveDate,
        emergencyContact: customer.emergencyContact,
        diveInsurance: hasDiveInsurance ? customer.diveInsurance : undefined
      });
      toast.success('Customer updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error('Failed to update customer. Please try again.');
    }
  };

  const renderContent = () => {
    if (isEditing) {
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" value={customer.firstName} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" value={customer.lastName} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={customer.email} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={customer.phone} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="certLevel">Certification Level</Label>
              <Input id="certLevel" name="certLevel" value={customer.certLevel} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="totalDives">Total Number of Dives</Label>
              <Input id="totalDives" name="totalDives" type="number" value={customer.totalDives} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="lastDiveDate">Last Dive Date</Label>
              <Input id="lastDiveDate" name="lastDiveDate" type="date" value={customer.lastDiveDate} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
              <Input id="emergencyContactName" name="name" value={customer.emergencyContact.name} onChange={handleEmergencyContactChange} required />
            </div>
            <div>
              <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
              <Input id="emergencyContactPhone" name="phone" value={customer.emergencyContact.phone} onChange={handleEmergencyContactChange} required />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="hasDiveInsurance" checked={hasDiveInsurance} onCheckedChange={(checked) => setHasDiveInsurance(checked as boolean)} />
            <Label htmlFor="hasDiveInsurance">Has Dive Insurance</Label>
          </div>
          {hasDiveInsurance && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="diveInsuranceProvider">Insurance Provider</Label>
                <Input id="diveInsuranceProvider" name="provider" value={customer.diveInsurance?.provider || ''} onChange={handleDiveInsuranceChange} required />
              </div>
              <div>
                <Label htmlFor="diveInsurancePolicyNumber">Policy Number</Label>
                <Input id="diveInsurancePolicyNumber" name="policyNumber" value={customer.diveInsurance?.policyNumber || ''} onChange={handleDiveInsuranceChange} required />
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Name:</span>
              <span>{customer.firstName} {customer.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Email:</span>
              <span>{customer.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Phone:</span>
              <span>{customer.phone}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Diving Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Certification Level:</span>
              <span>{customer.certLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Total Dives:</span>
              <span>{customer.totalDives}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Last Dive Date:</span>
              <span>{customer.lastDiveDate || 'N/A'}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Name:</span>
              <span>{customer.emergencyContact.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Phone:</span>
              <span>{customer.emergencyContact.phone}</span>
            </div>
          </CardContent>
        </Card>
        {customer.diveInsurance && (
          <Card>
            <CardHeader>
              <CardTitle>Dive Insurance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Provider:</span>
                <span>{customer.diveInsurance.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Policy Number:</span>
                <span>{customer.diveInsurance.policyNumber}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">View Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-[90vw] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto p-6">
          {renderContent()}
        </div>
        {!isEditing && (
          <div className="flex justify-end p-6 pt-0">
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
