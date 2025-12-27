import { useState, useEffect, useCallback } from 'react';
import { Part, CreatePartDTO, UpdatePartDTO } from '../types/part.types';

const MOCK_PARTS: Part[] = [
    {
        id: '1',
        name: 'Compressor Valve',
        partNumber: 'CV-2024-X',
        description: 'High pressure relief valve for HVAC',
        category: 'Valves',
        manufacturer: 'Industrial Valves Co.',
        modelNumber: 'IVC-500',
        locationId: '1',
        locationName: 'Main Warehouse',
        quantityOnHand: 25,
        minimumStockLevel: 10,
        reorderPoint: 15,
        unitCost: 45.99,
        totalValue: 1149.75,
        status: 'active',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z'
    },
    {
        id: '2',
        name: 'Conveyor Belt Segment',
        partNumber: 'CBS-300',
        description: 'Rubber belt connection segment',
        category: 'Belts',
        manufacturer: 'FlexBelt',
        locationId: '2',
        locationName: 'Warehouse A',
        quantityOnHand: 5,
        minimumStockLevel: 8,
        reorderPoint: 10,
        unitCost: 120.50,
        totalValue: 602.50,
        status: 'active',
        createdAt: '2023-02-15T00:00:00Z',
        updatedAt: '2023-02-15T00:00:00Z'
    },
    {
        id: '3',
        name: 'Hydraulic Filter',
        partNumber: 'HF-101',
        description: 'Standard hydraulic oil filter',
        category: 'Filters',
        manufacturer: 'FiltrationSys',
        locationId: '1',
        locationName: 'Main Warehouse',
        quantityOnHand: 50,
        minimumStockLevel: 20,
        reorderPoint: 30,
        unitCost: 12.00,
        totalValue: 600.00,
        status: 'active',
        createdAt: '2023-03-10T00:00:00Z',
        updatedAt: '2023-03-10T00:00:00Z'
    }
];

export function useParts(id?: string) {
    const [parts, setParts] = useState<Part[]>([]);
    const [selectedPart, setSelectedPart] = useState<Part | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchParts = useCallback(async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            setParts(MOCK_PARTS);
        } catch (err) {
            setError('Failed to fetch parts');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchPartById = useCallback(async (partId: string) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 600));
            const found = MOCK_PARTS.find(p => p.id === partId);
            if (found) {
                setSelectedPart(found);
            } else {
                setError('Part not found');
            }
        } catch (err) {
            setError('Failed to fetch part details');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (id) {
            fetchPartById(id);
        } else {
            fetchParts();
        }
    }, [id, fetchParts, fetchPartById]);

    const createPart = async (data: CreatePartDTO) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const newPart: Part = {
                ...data,
                id: Math.random().toString(36).substr(2, 9),
                status: 'active',
                totalValue: data.quantityOnHand * data.unitCost,
                locationName: 'Main Warehouse', // Mock resolved name
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            setParts(prev => [...prev, newPart]);
            return newPart;
        } catch (err) {
            setError('Failed to create part');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const updatePart = async (partId: string, data: UpdatePartDTO) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setParts(prev => prev.map(item =>
                item.id === partId ? {
                    ...item,
                    ...data,
                    totalValue: (data.quantityOnHand ?? item.quantityOnHand) * (data.unitCost ?? item.unitCost),
                    updatedAt: new Date().toISOString()
                } : item
            ));
            if (selectedPart?.id === partId) {
                setSelectedPart(prev => prev ? { ...prev, ...data, updatedAt: new Date().toISOString() } : null);
            }
        } catch (err) {
            setError('Failed to update part');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const deletePart = async (partId: string) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setParts(prev => prev.filter(item => item.id !== partId));
        } catch (err) {
            setError('Failed to delete part');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        parts,
        selectedPart,
        isLoading,
        error,
        createPart,
        updatePart,
        deletePart,
        refresh: fetchParts
    };
}
