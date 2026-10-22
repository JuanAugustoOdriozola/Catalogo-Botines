// src/components/product/DesignCard.tsx
import React, { useState } from 'react';
import { Design } from '../../data/bootsData';

interface DesignCardProps {
  design: Design;
  selectedColorId?: string;
  onSelectColor: (designId: string, colorId: string) => void;
}

export const DesignCard: React.FC<DesignCardProps> = ({ design, selectedColorId, onSelectColor }) => {
  const activeColorId = selectedColorId || design.defaultColorId;
  const activeVariant = design.variants.find((v) => v.colorId === activeColorId) || design.variants[0];

  // Estado para controlar qué ángulo/foto de la variante actual se está viendo
  const [selectedImage, setSelectedImage] = useState<string>(activeVariant.mainImage);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

  // Galería de ángulos: si hay imágenes extras en `images`, las combinamos con la principal
  const currentGalleryImages = [activeVariant.mainImage, ...(activeVariant.images || [])];

  // Al cambiar de color, resetear la foto seleccionada a la foto principal del nuevo color
  const handleColorChange = (colorId: string) => {
    onSelectColor(design.id, colorId);
    const newVariant = design.variants.find((v) => v.colorId === colorId);
    if (newVariant) {
      setSelectedImage(newVariant.mainImage);
    }
  };

  // Determinar la foto a renderizar (mantenemos sincronizado el cambio de color)
  const displayedImage = currentGalleryImages.includes(selectedImage) 
    ? selectedImage 
    : activeVariant.mainImage;

  return (
    <div className="product-card-ecommerce">
      {/* Columna Izquierda: Imagen Principal + Galería de ángulos/vistas del botín */}
      <div className="product-gallery">
        <div className="product-main-image-container">
          <img 
            src={displayedImage} 
            alt={`${design.title} - ${activeVariant.colorName}`} 
            className="product-main-image"
          />
        </div>

        {/* Miniaturas de ángulos/lados del botín activo */}
        {currentGalleryImages.length > 1 && (
          <div className="product-thumbnails-row">
            {currentGalleryImages.map((imgUrl, index) => {
              const isActive = imgUrl === displayedImage;
              return (
                <button
                  key={index}
                  className={`product-thumb-btn ${isActive ? 'product-thumb-btn--active' : ''}`}
                  onClick={() => setSelectedImage(imgUrl)}
                  title={`Vista ${index + 1}`}
                >
                  <img src={imgUrl} alt={`Vista ${index + 1}`} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Columna Derecha: Información, Selector de Colores y Talles */}
      <div className="product-details">
        <div className="product-rating">
          <span className="rating-score">4.8</span>
          <span className="rating-stars">★★★★★</span>
          <span className="rating-count">[58]</span>
        </div>

        <h3 className="product-title">{design.title}</h3>
        <p className="product-description">{design.description}</p>
        <div className="product-price">$ 189.999</div>

        {/* Selector de Colores ubicado justo debajo de la etiqueta COLOR */}
        <div className="product-color-section">
          <div className="product-color-info">
            <span className="label-title">COLOR:</span> <strong>{activeVariant.colorName}</strong>
          </div>

          <div className="product-color-variants-row">
            {design.variants.map((variant) => {
              const isActive = variant.colorId === activeColorId;
              return (
                <button
                  key={variant.colorId}
                  className={`color-variant-btn ${isActive ? 'color-variant-btn--active' : ''}`}
                  onClick={() => handleColorChange(variant.colorId)}
                  title={variant.colorName}
                >
                  <img src={variant.mainImage} alt={variant.colorName} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Sección de Talles */}
        <div className="product-sizes-section">
          <div className="sizes-header">
            <span className="label-title">TALLES (EU)</span>
            <span className="size-guide">Guía de talles</span>
          </div>
          <div className="product-sizes-grid">
            {sizes.map((size) => (
              <button
                key={size}
                className={`product-size-btn ${selectedSize === size ? 'product-size-btn--active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};