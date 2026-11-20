import { useEffect, useMemo, useRef, useState } from "react";
import { CATALOG } from "../data/catalogData";
import { loadVariants } from "../data/loadVariants";
import { loadFolderVariants } from "../data/loadFolders";

const WHATSAPP = "542314548984"; // 👈 poné tu número
const money = (n) => "$ " + n.toLocaleString("es-AR");

export default function Catalog() {
  const [brandId, setBrandId] = useState(CATALOG[0].id);
  const brand = CATALOG.find((b) => b.id === brandId);

  const [modelId, setModelId] = useState(brand.models[0]?.id);
  const model = brand.models.find((m) => m.id === modelId) ?? brand.models[0];

  const [designId, setDesignId] = useState(model?.designs[0]?.id);
  const design =
    model?.designs.find((d) => d.id === designId) ?? model?.designs[0];

  const variants = useMemo(() => {
    if (!design) return [];
    return design.layout === "folders"
      ? loadFolderVariants(design.folder)
      : loadVariants(
          design.folder,
          design.prefix,
          design.colorNames,
          design.merge,
        );
  }, [design]);

  const [variantId, setVariantId] = useState(null);
  const variant = variants.find((v) => v.id === variantId) ?? variants[0];

  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState(null);
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 });
  const touchX = useRef(null);

  const reset = () => {
    setVariantId(null);
    setImgIdx(0);
    setSize(null);
  };

  const pickBrand = (id) => {
    const b = CATALOG.find((x) => x.id === id);
    setBrandId(id);
    setModelId(b.models[0]?.id);
    setDesignId(b.models[0]?.designs[0]?.id);
    reset();
  };
  const pickModel = (id) => {
    const m = brand.models.find((x) => x.id === id);
    setModelId(id);
    setDesignId(m.designs[0]?.id);
    reset();
  };
  const pickDesign = (id) => {
    setDesignId(id);
    reset();
  };
  const pickVariant = (id) => {
    setVariantId(id);
    setImgIdx(0);
  };

  // Navegación con flechas del teclado
  useEffect(() => {
    if (!variant) return;
    const onKey = (e) => {
      const n = variant.images.length;
      if (e.key === "ArrowRight") setImgIdx((i) => (i + 1) % n);
      if (e.key === "ArrowLeft") setImgIdx((i) => (i - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variant]);

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return; // en celular no hay zoom por hover
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({
      on: true,
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null || !variant) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    const n = variant.images.length;
    if (Math.abs(dx) > 40)
      setImgIdx((i) => (dx < 0 ? (i + 1) % n : (i - 1 + n) % n));
  };

  const waLink =
    design && variant
      ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
          `Me interesan los ${brand.name} ${design.title} (${variant.label})${size ? ` en el talle ${size}` : ""}`,
        )}`
      : "#";

  return (
    <div className="app">
      <header className="top">
        <h1>
          Catálogo de <span>Botines</span>
        </h1>
        <nav className="brands">
          {CATALOG.map((b) => (
            <button
              key={b.id}
              className={b.id === brandId ? "active" : ""}
              onClick={() => pickBrand(b.id)}
            >
              {b.name}
            </button>
          ))}
        </nav>
      </header>

      {brand.models.length === 0 && (
        <p className="empty">Próximamente: {brand.name}.</p>
      )}

      {brand.models.length > 0 && (
        <>
          <div className="tabs">
            {brand.models.map((m) => (
              <button
                key={m.id}
                className={m.id === model?.id ? "active" : ""}
                onClick={() => pickModel(m.id)}
              >
                {m.name}
                <small>{m.tagline}</small>
              </button>
            ))}
          </div>

          {model?.designs.length > 1 && (
            <div className="chips">
              {model.designs.map((d) => (
                <button
                  key={d.id}
                  className={d.id === design?.id ? "active" : ""}
                  onClick={() => pickDesign(d.id)}
                >
                  {d.title} <em>{d.badge}</em>
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {design && variants.length === 0 && (
        <p className="empty">Todavía no hay fotos en esta categoría.</p>
      )}
      {model && !design && <p className="empty">Próximamente: {model.name}.</p>}

      {design && variant && (
        <main className="product">
          <section className="gallery">
            <div
              className="stage"
              onPointerMove={onMove}
              onPointerLeave={() => setZoom((z) => ({ ...z, on: false }))}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <img
                key={variant.images[imgIdx]}
                src={variant.images[imgIdx]}
                alt={`${design.title} ${variant.label}`}
                style={
                  zoom.on
                    ? {
                        transform: "scale(2)",
                        transformOrigin: `${zoom.x}% ${zoom.y}%`,
                      }
                    : undefined
                }
              />
              {variant.images.length > 1 && (
                <>
                  <button
                    className="nav prev"
                    onClick={() =>
                      setImgIdx(
                        (imgIdx - 1 + variant.images.length) %
                          variant.images.length,
                      )
                    }
                  >
                    ‹
                  </button>
                  <button
                    className="nav next"
                    onClick={() =>
                      setImgIdx((imgIdx + 1) % variant.images.length)
                    }
                  >
                    ›
                  </button>
                </>
              )}
              <span className="counter">
                {imgIdx + 1} / {variant.images.length}
              </span>
            </div>
            <div className="thumbs">
              {variant.images.map((src, i) => (
                <button
                  key={src}
                  className={i === imgIdx ? "active" : ""}
                  onClick={() => setImgIdx(i)}
                >
                  <img src={src} alt={`Vista ${i + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
          </section>

          <section className="info">
            <span className="badge">{design.badge}</span>
            <h2>{design.title}</h2>
            <p className="desc">{design.description}</p>
            <p className="price">{money(design.price)}</p>

            <h3>
              Color · <b>{variant.label}</b>{" "}
              <small>({variants.length} disponibles)</small>
            </h3>
            <div className="swatches">
              {variants.map((v) => (
                <button
                  key={v.id}
                  title={v.label}
                  className={v.id === variant.id ? "active" : ""}
                  onClick={() => pickVariant(v.id)}
                >
                  <img src={v.images[0]} alt={v.label} loading="lazy" />
                </button>
              ))}
            </div>

            <h3>Talle (AR/EU)</h3>
            <div className="sizes">
              {design.sizes.map((s) => (
                <button
                  key={s}
                  className={s === size ? "active" : ""}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <a className="cta" href={waLink} target="_blank" rel="noreferrer">
              Consultar por WhatsApp
            </a>
          </section>
        </main>
      )}
    </div>
  );
}
