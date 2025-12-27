import { useState, useEffect } from "react";
import { Location } from "@/app/dashboard/equipment/types/location.types";

const MOCK_LOCATIONS: Location[] = [
  {
    id: "1",
    name: "Main Building",
    description: "Primary office and production facility",
  },
  { id: "2", name: "Warehouse A", description: "Storage and logistics" },
  { id: "3", name: "Warehouse B", description: "Overflow storage" },
  { id: "4", name: "Parking Lot", description: "External areas" },
  { id: "5", name: "Remote Site", description: "Secondary facility" },
];

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setLocations(MOCK_LOCATIONS);
      } catch (err) {
        setError("Failed to fetch locations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return { locations, isLoading, error };
}
