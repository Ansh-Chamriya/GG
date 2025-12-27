export type EquipmentStatus = 'operational' | 'maintenance' | 'down' | 'scrapped';

export interface Equipment {
    id: string;
    name: string;
    categoryId: string;
    categoryName?: string;
    locationId: string;
    locationName?: string;
    serialNumber?: string;
    status: EquipmentStatus;
    lastMaintenanceDate?: string;
    createdAt: string;
    description?: string;
    model?: string;
    manufacturer?: string;
    purchaseDate?: string;
    warrantyExpiration?: string;
}
