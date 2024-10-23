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

export function NewCustomerDialog() {
  const [open, setOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    certLevel: "",
    totalDives: 0,
    lastDiveDate: "",
    emergencyContact: {
      name: "",
      phone: "",
    },
    diveInsurance: {
      provider: "",
      policyNumber: "",
    },
  });
  const [hasDiveInsurance, setHasDiveInsurance] = useState(false);

  const addCustomer = useMutation(api.customers.add);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({
      ...prev,
      [name]: name === 'totalDives' ? parseInt(value) || 0 : value
    }));
  };

  const handleEmergencyContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [name]: value
      }
    }));
  };

  const handleDiveInsuranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({
      ...prev,
      diveInsurance: {
        ...prev.diveInsurance,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const customerData = {
        ...newCustomer,
        diveInsurance: hasDiveInsurance ? newCustomer.diveInsurance : undefined
      };
      await addCustomer(customerData);
      toast.success('New customer added successfully!');
      setOpen(false);
      setNewCustomer({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        certLevel: "",
        totalDives: 0,
        lastDiveDate: "",
        emergencyContact: {
          name: "",
          phone: "",
        },
        diveInsurance: {
          provider: "",
          policyNumber: "",
        },
      });
      setHasDiveInsurance(false);
    } catch (error) {
      console.error('Error adding new customer:', error);
      toast.error('Failed to add new customer. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Customer</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-[90vw] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" value={newCustomer.firstName} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={newCustomer.lastName} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={newCustomer.email} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={newCustomer.phone} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="certLevel">Certification Level</Label>
                <Input id="certLevel" name="certLevel" value={newCustomer.certLevel} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="totalDives">Total Number of Dives</Label>
                <Input id="totalDives" name="totalDives" type="number" value={newCustomer.totalDives} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="lastDiveDate">Last Dive Date</Label>
                <Input id="lastDiveDate" name="lastDiveDate" type="date" value={newCustomer.lastDiveDate} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                <Input id="emergencyContactName" name="name" value={newCustomer.emergencyContact.name} onChange={handleEmergencyContactChange} required />
              </div>
              <div>
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                <Input id="emergencyContactPhone" name="phone" value={newCustomer.emergencyContact.phone} onChange={handleEmergencyContactChange} required />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hasDiveInsurance" checked={hasDiveInsurance} onCheckedChange={(checked) => setHasDiveInsurance(checked as boolean)} />
              <Label htmlFor="hasDiveInsurance">Has Dive Insurance</Label>
            </div>
            {hasDiveInsurance && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="diveInsuranceProvider">Insurance Provider</Label>
                  <Input id="diveInsuranceProvider" name="provider" value={newCustomer.diveInsurance.provider} onChange={handleDiveInsuranceChange} required />
                </div>
                <div>
                  <Label htmlFor="diveInsurancePolicyNumber">Policy Number</Label>
                  <Input id="diveInsurancePolicyNumber" name="policyNumber" value={newCustomer.diveInsurance.policyNumber} onChange={handleDiveInsuranceChange} required />
                </div>
              </div>
            )}
            <Button type="submit">Add Customer</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
