import { useState, useEffect, useCallback } from "react";
import { Equipment } from "@/app/dashboard/equipment/types/equipment.types";

const MOCK_EQUIPMENT: Equipment[] = [
  {
    id: "1",
    name: "Industrial HVAC Unit",
    categoryId: "1",
    categoryName: "HVAC",
    locationId: "1",
    locationName: "Main Building - Roof",
    serialNumber: "HVAC-2023-001",
    status: "operational",
    healthScore: 92,
    lastMaintenanceDate: "2024-03-15T10:00:00Z",
    createdAt: "2023-01-01T00:00:00Z",
    model: "CoolMaster 3000",
    manufacturer: "ClimateCorp",
  },
  {
    id: "2",
    name: "Conveyor Belt Motor",
    categoryId: "4",
    categoryName: "Production",
    locationId: "2",
    locationName: "Warehouse A - Line 1",
    serialNumber: "MTR-500-X",
    status: "maintenance",
    healthScore: 65,
    lastMaintenanceDate: "2024-04-01T08:30:00Z",
    createdAt: "2023-02-15T00:00:00Z",
    model: "SpeedDrive 500",
    manufacturer: "MotoTech",
  },
  {
    id: "3",
    name: "Main Switchboard",
    categoryId: "2",
    categoryName: "Electrical",
    locationId: "1",
    locationName: "Main Building - Basement",
    serialNumber: "ELEC-MAIN-01",
    status: "operational",
    healthScore: 88,
    lastMaintenanceDate: "2024-01-20T14:45:00Z",
    createdAt: "2022-11-10T00:00:00Z",
    model: "PowerGrade 12kV",
    manufacturer: "ElectroSystems",
  },
  {
    id: "4",
    name: "Delivery Truck",
    categoryId: "5",
    categoryName: "Fleet",
    locationId: "4",
    locationName: "Parking Lot",
    serialNumber: "VIN-987654321",
    status: "down",
    healthScore: 32,
    lastMaintenanceDate: "2024-02-28T09:15:00Z",
    createdAt: "2023-05-20T00:00:00Z",
    model: "Hauler XL",
    manufacturer: "TruckCo",
  },
];

export function useEquipment(id?: string) {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEquipmentList = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setEquipment(MOCK_EQUIPMENT);
    } catch (err) {
      setError("Failed to fetch equipment list");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchEquipmentById = useCallback(async (equipmentId: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const found = MOCK_EQUIPMENT.find((e) => e.id === equipmentId);
      if (found) {
        setSelectedEquipment(found);
      } else {
        setError("Equipment not found");
      }
    } catch (err) {
      setError("Failed to fetch equipment details");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchEquipmentById(id);
    } else {
      fetchEquipmentList();
    }
  }, [id, fetchEquipmentList, fetchEquipmentById]);

  const createEquipment = async (data: Omit<Equipment, "id" | "createdAt">) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In a real app, backend would assign ID
      const newEquipment: Equipment = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      };
      setEquipment((prev) => [...prev, newEquipment]);
      return newEquipment;
    } catch (err) {
      setError("Failed to create equipment");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateEquipment = async (
    equipmentId: string,
    data: Partial<Equipment>
  ) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEquipment((prev) =>
        prev.map((item) =>
          item.id === equipmentId ? { ...item, ...data } : item
        )
      );
      if (selectedEquipment?.id === equipmentId) {
        setSelectedEquipment((prev) => (prev ? { ...prev, ...data } : null));
      }
    } catch (err) {
      setError("Failed to update equipment");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEquipment = async (equipmentId: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEquipment((prev) => prev.filter((item) => item.id !== equipmentId));
    } catch (err) {
      setError("Failed to delete equipment");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    equipment,
    selectedEquipment,
    isLoading,
    error,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    refresh: fetchEquipmentList,
  };
}
