export interface Part {
    id: string;
    name: string;
    partNumber: string;
    description: string;
    category: string;
    manufacturer: string;
    modelNumber?: string;
    qrCode?: string;
    locationId: string;
    locationName?: string;
    quantityOnHand: number;
    minimumStockLevel: number;
    reorderPoint: number;
    unitCost: number;
    totalValue: number;
    status: 'active' | 'obsolete' | 'discontinued';
    createdAt: string;
    updatedAt: string;
}

export interface CreatePartDTO {
    name: string;
    partNumber: string;
    description: string;
    category: string;
    manufacturer: string;
    modelNumber?: string;
    locationId: string;
    quantityOnHand: number;
    minimumStockLevel: number;
    reorderPoint: number;
    unitCost: number;
}

export type UpdatePartDTO = Partial<CreatePartDTO> & {
    status?: Part['status']; // Optional status update
};
