"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from 'sonner';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { staffFormSchema, StaffFormValues } from './staffFormSchema';
import { CertificationSelect } from "@/components/certification-select";

interface NewStaffDialogProps {
  open: boolean;
  onClose: () => void;
}

export function NewStaffDialog({ open, onClose }: NewStaffDialogProps) {
  const addStaffMember = useMutation(api.staff.add);

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      position: "",
      email: "",
      phone: "",
      certLevel: "",
      staffType: "permanent" as const
    },
  });

  const onSubmit = async (values: StaffFormValues) => {
    try {
      await addStaffMember({
        ...values,
        staffType: values.staffType as "permanent" | "freelance"
      });
      toast.success('New staff member added successfully!');
      onClose();
      form.reset();
    } catch (error) {
      console.error('Error adding new staff member:', error);
      toast.error('Failed to add new staff member. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="certLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certification Level</FormLabel>
                  <FormControl>
                    <CertificationSelect 
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="staffType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Staff Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value: "permanent" | "freelance") => field.onChange(value)}
                      defaultValue={field.value}
                      className="flex flex-row space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="permanent" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Permanent
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="freelance" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Freelance
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add Staff Member</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
