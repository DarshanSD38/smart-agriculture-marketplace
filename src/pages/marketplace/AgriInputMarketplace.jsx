import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { inputMarketService } from '../../services/inputMarketService';
import { useCart } from '../../context/CartContext';
import Rating from '../../components/Rating';
import Modal from '../../components/Modal';
import { 
  Wrench, 
  Search, 
  ShoppingCart, 
  CheckCircle2, 
  Info, 
  Sprout, 
  Droplet, 
  ShieldCheck, 
  Check 
} from 'lucide-react';

const AgriInputMarketplace = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';

  const [inputs, setInputs] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedInput, setSelectedInput] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const { addToCart } = useCart();

  const categories = [
    'All',
    'Fertilizers',
    'Seeds',
    'Irrigation Supplies',
    'Equipment',
    'Tools',
    'Farm Supplies'
  ];

  useEffect(() => {
    inputMarketService.search({ query: search, category: selectedCategory }).then(data => {
      setInputs(data);
    });
  }, [search, selectedCategory]);

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      unit: 'unit',
      farmerName: item.brand,
      image: item.image
    }, 1);

    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleViewDetails = (item) => {
    setSelectedInput(item);
    setModalOpen(true);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-700)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
          <Wrench size={18} />
          <span>Agricultural Inputs & Farm Equipment</span>
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Agri-Input Marketplace
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Certified hybrid seeds, organic bio-fertilizers, fungicides, and precision drip irrigation gear.
        </p>
      </div>

      {/* SEARCH AND CATEGORIES */}
      <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ marginBottom: '16px', maxWidth: '500px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '42px' }}
              placeholder="Search bio-fertilizers, seeds, drip kits or fungicides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '7px 16px',
                borderRadius: 'var(--radius-full)',
                border: selectedCategory === cat ? '1px solid var(--primary-600)' : '1px solid var(--slate-300)',
                background: selectedCategory === cat ? 'var(--primary-600)' : '#ffffff',
                color: selectedCategory === cat ? '#ffffff' : 'var(--slate-700)',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* INPUTS GRID */}
      <div className="grid-3" style={{ gap: '24px' }}>
        {inputs.map(item => (
          <div key={item.id} className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '170px', position: 'relative' }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span className="badge badge-green" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                {item.category}
              </span>
            </div>

            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--slate-400)', fontWeight: 700, textTransform: 'uppercase' }}>
                Brand: {item.brand}
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '2px', lineHeight: 1.3 }}>
                {item.name}
              </h3>

              <div style={{ marginTop: '6px', marginBottom: '8px' }}>
                <Rating value={item.rating} count={item.reviews} size={13} />
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--slate-600)', lineHeight: 1.45, flex: 1, marginBottom: '14px' }}>
                {item.description}
              </p>

              {/* Recommended badges */}
              {item.recommendedFor && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
                  {item.recommendedFor.map((rec, idx) => (
                    <span key={idx} style={{ fontSize: '0.7rem', background: 'var(--slate-100)', color: 'var(--slate-600)', padding: '2px 6px', borderRadius: '4px' }}>
                      {rec}
                    </span>
                  ))}
                </div>
              )}

              {/* Price & Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--slate-100)', paddingTop: '14px', marginTop: 'auto' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                  ₹{item.price}
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => handleViewDetails(item)}
                    className="btn btn-secondary btn-sm"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`btn btn-sm ${addedId === item.id ? 'btn-secondary' : 'btn-primary'}`}
                  >
                    {addedId === item.id ? (
                      <>
                        <Check size={14} color="#16a34a" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={14} />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DETAILS MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedInput?.name || 'Input Details'}
      >
        {selectedInput && (
          <div>
            <div style={{ height: '180px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '16px' }}>
              <img
                src={selectedInput.image}
                alt={selectedInput.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <span className="badge badge-green">{selectedInput.category}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--slate-500)', marginLeft: '8px' }}>Brand: {selectedInput.brand}</span>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                ₹{selectedInput.price}
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--slate-700)', lineHeight: 1.5, marginBottom: '14px' }}>
              {selectedInput.description}
            </p>

            <div style={{ background: 'var(--slate-50)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '0.82rem' }}>
              <div>Recommended Dosage / Application: <strong>{selectedInput.dosage}</strong></div>
              <div style={{ marginTop: '4px' }}>Warehouse Availability: <strong>{selectedInput.stock} Units in Stock</strong></div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => { handleAddToCart(selectedInput); setModalOpen(false); }}
                className="btn btn-primary"
                style={{ flex: 1, padding: '10px' }}
              >
                Add to Cart (₹{selectedInput.price})
              </button>
              <button onClick={() => setModalOpen(false)} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AgriInputMarketplace;

