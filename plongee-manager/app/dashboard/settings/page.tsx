'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const settingsSchema = z.object({
  shopName: z.string().min(2, 'Shop name must be at least 2 characters'),
  defaultCurrency: z.string().min(3, 'Currency code must be 3 characters').max(3),
  allowOnlineBooking: z.boolean(),
  maxDiversPerGroup: z.number().int().positive(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      shopName: '',
      defaultCurrency: 'USD',
      allowOnlineBooking: true,
      maxDiversPerGroup: 8,
    },
  });

  async function onSubmit(data: SettingsFormValues) {
    setIsLoading(true);
    try {
      // TODO: Implement API call to update settings
      console.log('Settings updated:', data);
      toast.success('Settings updated', {
        description: 'Your dive shop settings have been successfully updated.',
      });
    } catch (error) {
      console.error('Failed to update settings:', error);
      toast.error('Error', {
        description: 'Failed to update settings. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Dive Shop Settings</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="shopName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shop Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="defaultCurrency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Currency</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allowOnlineBooking"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Allow Online Booking</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxDiversPerGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Divers Per Group</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Settings'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
