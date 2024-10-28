'use client'

import React, { useState } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Id, Doc } from "@/convex/_generated/dataModel";
import { Pagination } from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AddEquipmentDialog } from './_components/AddEquipmentDialog';
import { EmptyState } from '@/components/EmptyState';
import { EditEquipmentDialog } from './_components/EditEquipmentDialog';

const ITEMS_PER_PAGE = 10;

export default function EquipmentManagement() {
  const equipment = useQuery(api.equipment.getAll);
  const deleteEquipment = useMutation(api.equipment.remove);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState<Id<"equipment"> | null>(null);
  const [editingEquipment, setEditingEquipment] = useState<Doc<"equipment"> | null>(null);

  const filteredEquipment = equipment?.filter(item => 
    (
      item.serialNumber.toLowerCase().includes(search.toLowerCase())) &&
    (typeFilter === 'all' || item.type === typeFilter) &&
    (statusFilter === 'all' || item.status === statusFilter)
  ) || [];

  const totalPages = Math.ceil(filteredEquipment.length / ITEMS_PER_PAGE);
  const paginatedEquipment = filteredEquipment.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDeleteClick = (equipmentId: Id<"equipment">) => {
    setEquipmentToDelete(equipmentId);
  };

  const handleDeleteConfirm = async () => {
    if (equipmentToDelete) {
      try {
        await deleteEquipment({ id: equipmentToDelete });
        toast.success('Equipment deleted successfully!');
      } catch (error) {
        console.error('Error deleting equipment:', error);
        toast.error('Failed to delete equipment. Please try again.');
      } finally {
        setEquipmentToDelete(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Equipment Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Equipment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Equipment Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Search by name or serial number"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="fins">Fins</SelectItem>
                <SelectItem value="mask">Mask</SelectItem>
                <SelectItem value="snorkel">Snorkel</SelectItem>
                <SelectItem value="wetsuit">Wetsuit</SelectItem>
                <SelectItem value="weight">Weight</SelectItem>
                <SelectItem value="lanyard">Lanyard</SelectItem>
                <SelectItem value="buoy">Buoy</SelectItem>
                <SelectItem value="rope">Rope</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="in-use">In Use</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Last Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEquipment.length > 0 ? (
                paginatedEquipment.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.serialNumber}</TableCell>
                    <TableCell>{item.size || '-'}</TableCell>
                    <TableCell>{new Date(item.lastMaintenance).toLocaleDateString()}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                        onClick={() => setEditingEquipment(item)}
                      >
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteClick(item._id)}
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the equipment
                              and remove it from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteConfirm}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <EmptyState message="No equipment found." />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {paginatedEquipment.length > 0 && (
            <div className="mt-4 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <AddEquipmentDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)} 
      />

      {editingEquipment && (
        <EditEquipmentDialog
          isOpen={!!editingEquipment}
          onClose={() => setEditingEquipment(null)}
          equipment={{
            ...editingEquipment,
            lastMaintenance: new Date(editingEquipment.lastMaintenance).getTime()
          }}
        />
      )}
    </div>
  );
}
