import { useState } from 'react';
import { BOOTS_CATALOG, Brand } from '../data/bootsData';

export const useCatalog = () => {
  const [openBrandId, setOpenBrandId] = useState<string | null>(BOOTS_CATALOG[0]?.id || null);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  
  // Diccionario para almacenar el color seleccionado por ID de diseño: { [designId]: colorId }
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});

  const toggleBrand = (brandId: string) => {
    setOpenBrandId((prev) => (prev === brandId ? null : brandId));
  };

  const selectModel = (modelId: string) => {
    setSelectedModelId((prev) => (prev === modelId ? null : modelId));
  };

  const handleColorChange = (designId: string, colorId: string) => {
    setSelectedColors((prev) => ({
      ...prev,
      [designId]: colorId
    }));
  };

  return {
    catalog: BOOTS_CATALOG as Brand[],
    openBrandId,
    selectedModelId,
    selectedColors,
    toggleBrand,
    selectModel,
    handleColorChange
  };
};