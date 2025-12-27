import { useState, useEffect } from 'react';
import { Category } from '@/app/(dashboard)/equipment/types/category.types';

const MOCK_CATEGORIES: Category[] = [
    { id: '1', name: 'HVAC', description: 'Heating, Ventilation, and Air Conditioning' },
    { id: '2', name: 'Electrical', description: 'Electrical systems and components' },
    { id: '3', name: 'Plumbing', description: 'Water processing and distribution' },
    { id: '4', name: 'Production', description: 'Manufacturing line equipment' },
    { id: '5', name: 'Fleet', description: 'Company vehicles' },
];

export function useEquipmentCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 500));
                setCategories(MOCK_CATEGORIES);
            } catch (err) {
                setError('Failed to fetch categories');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, isLoading, error };
}
