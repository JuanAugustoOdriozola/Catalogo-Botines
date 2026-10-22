// src/App.tsx
import React from 'react';
import { useCatalog } from './hooks/useCatalog';
import { DesignCard } from './components/product/DesignCard';

export default function App() {
  const {
    catalog,
    openBrandId,
    selectedModelId,
    selectedColors,
    toggleBrand,
    selectModel,
    handleColorChange
  } = useCatalog();

  return (
    <main className="catalog-container">
      <header className="catalog-header">
        <h1>Catálogo de Botines</h1>
        <p>Selecciona tu marca, explora el modelo y descubre las diferentes combinaciones de color.</p>
      </header>

      <section className="brand-accordion">
        {catalog.map((brand) => {
          const isOpen = openBrandId === brand.id;

          return (
            <article key={brand.id} className="brand-item">
              <button 
                className="brand-header" 
                onClick={() => toggleBrand(brand.id)}
              >
                <span>{brand.name}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
              </button>

              {isOpen && (
                <div className="brand-content">
                  <div className="model-selector">
                    {brand.models.map((model) => (
                      <button
                        key={model.id}
                        className={`model-btn ${selectedModelId === model.id ? 'model-btn--active' : ''}`}
                        onClick={() => selectModel(model.id)}
                      >
                        {model.name}
                      </button>
                    ))}
                  </div>

                  {selectedModelId && (
                    <div className="designs-grid">
                      {brand.models
                        .find((m) => m.id === selectedModelId)
                        ?.designs.map((design) => (
                          <DesignCard
                            key={design.id}
                            design={design}
                            selectedColorId={selectedColors[design.id]}
                            onSelectColor={handleColorChange}
                          />
                        ))}
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}