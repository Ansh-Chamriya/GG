export type LocationStatus = 'active' | 'inactive' | 'maintenance';
export type LocationType = 'warehouse' | 'office' | 'job_site' | 'vehicle';

export interface Location {
    id: string;
    name: string;
    type: LocationType | string;
    status: LocationStatus | string;
    city: string;
    state: string;
    address?: string;
    zipCode?: string;
    equipmentCount: number;
    manager?: string;
    contactPhone?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateLocationDTO {
    name: string;
    type: LocationType;
    status: LocationStatus;
    city: string;
    state: string;
    address?: string;
    zipCode?: string;
    manager?: string;
    contactPhone?: string;
}

export interface UpdateLocationDTO extends Partial<CreateLocationDTO> { }
