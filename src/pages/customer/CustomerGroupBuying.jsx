import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { INITIAL_GROUP_BUYS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import Modal from '../../components/Modal';
import { Users2, Clock, CheckCircle2, ShoppingBag, Sparkles, ArrowRight, Percent } from 'lucide-react';

const CustomerGroupBuying = () => {
  const [groupDeals, setGroupDeals] = useState(INITIAL_GROUP_BUYS);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [pledgeQty, setPledgeQty] = useState('5');
  const [modalOpen, setModalOpen] = useState(false);
  const [joinedSuccess, setJoinedSuccess] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/group-buys')
      .then(res => {
        if (res.success && res.groupBuys && res.groupBuys.length > 0) {
          setGroupDeals(res.groupBuys);
        }
      })
      .catch(() => {});
  }, []);

  const handleOpenJoin = (deal) => {
    setSelectedDeal(deal);
    setPledgeQty('5');
    setJoinedSuccess(false);
    setModalOpen(true);
  };

  const handleConfirmPledge = (e) => {
    e.preventDefault();
    const qty = Number(pledgeQty);

    // Call backend API in background
    if (selectedDeal && selectedDeal.id) {
      api.post(`/group-buys/${selectedDeal.id}/join`, { quantity: qty }).catch(() => {});
    }

    // Update state
    setGroupDeals(prev => prev.map(d => {
      if (d.id === selectedDeal.id) {
        const newPledged = d.currentDemandPledged + qty;
        const remaining = Math.max(0, d.groupQuantityRequired - newPledged);
        return {
          ...d,
          currentDemandPledged: newPledged,
          remainingQuantity: remaining,
          participantsCount: d.participantsCount + 1
        };
      }
      return d;
    }));

    // Add to cart with group price!
    addToCart({
      id: `gb-${selectedDeal.id}`,
      name: `${selectedDeal.productName} (Group Buying Pool)`,
      price: selectedDeal.groupPrice,
      unit: selectedDeal.unit,
      farmerName: selectedDeal.farmerName,
      image: selectedDeal.image
    }, qty);

    setJoinedSuccess(true);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-700)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
          <Users2 size={18} />
          <span>Community Collective Purchasing</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Community Group Buying Deals
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Pool wholesale farm demand with neighbors in your area to unlock wholesale prices up to 30% lower than retail.
        </p>
      </div>

      <div className="grid-3" style={{ gap: '24px' }}>
        {groupDeals.map(deal => {
          const progressPct = Math.min(100, Math.round((deal.currentDemandPledged / deal.groupQuantityRequired) * 100));

          return (
            <div key={deal.id} className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '170px' }}>
                <img
                  src={deal.image}
                  alt={deal.productName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '3px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.74rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> Ends in {deal.endsInHours}h
                </div>
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#dc2626', color: 'white', padding: '3px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.74rem', fontWeight: 800 }}>
                  Save {Math.round(((deal.regularPrice - deal.groupPrice) / deal.regularPrice) * 100)}%
                </div>
              </div>

              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--slate-900)', lineHeight: 1.3 }}>
                  {deal.productName}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                  Supplied by {deal.farmerName}
                </div>

                {/* Price block */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '12px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                    ₹{deal.groupPrice}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--slate-400)', textDecoration: 'line-through' }}>
                    ₹{deal.regularPrice}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>/ {deal.unit}</span>
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px', fontWeight: 600 }}>
                    <span style={{ color: 'var(--slate-700)' }}>Pledged: <strong>{deal.currentDemandPledged} {deal.unit}</strong></span>
                    <span style={{ color: 'var(--primary-700)' }}>Target: {deal.groupQuantityRequired} {deal.unit}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--slate-100)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${progressPct}%`, height: '100%', background: '#16a34a', borderRadius: '999px' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '4px' }}>
                    <span>{deal.participantsCount} Neighbors Joined</span>
                    <strong style={{ color: '#ea580c' }}>Only {deal.remainingQuantity} {deal.unit} Remaining</strong>
                  </div>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--slate-600)', marginBottom: '16px', flex: 1, lineHeight: 1.45 }}>
                  {deal.description}
                </p>

                <button
                  onClick={() => handleOpenJoin(deal)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '10px' }}
                >
                  <Users2 size={16} />
                  <span>Join Group (Unlock ₹{deal.groupPrice}/{deal.unit})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* JOIN GROUP MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Join Community Group Buying Pool"
      >
        {selectedDeal && (
          <div>
            {joinedSuccess ? (
              <div style={{ textAlign: 'center', padding: '24px 10px' }}>
                <CheckCircle2 size={54} color="#16a34a" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  You have joined the {selectedDeal.productName} pool!
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--slate-600)', margin: '8px auto 20px', maxWidth: '380px' }}>
                  {pledgeQty} {selectedDeal.unit} has been added to your Smart Basket at the discounted rate of ₹{selectedDeal.groupPrice}/{selectedDeal.unit}.
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button onClick={() => setModalOpen(false)} className="btn btn-secondary">
                    Continue Browsing
                  </button>
                  <button onClick={() => { setModalOpen(false); window.location.href = '/customer/basket'; }} className="btn btn-primary">
                    View in Smart Basket →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmPledge}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px', background: 'var(--slate-50)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                  <img
                    src={selectedDeal.image}
                    alt={selectedDeal.productName}
                    style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ fontWeight: 800, color: 'var(--slate-900)' }}>{selectedDeal.productName}</h4>
                    <div style={{ fontSize: '0.82rem', color: 'var(--primary-700)', fontWeight: 700 }}>
                      Group Price: ₹{selectedDeal.groupPrice} / {selectedDeal.unit}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">How many {selectedDeal.unit} would you like to pledge?</label>
                  <input
                    type="number"
                    min="1"
                    max={selectedDeal.remainingQuantity || 20}
                    className="form-input"
                    value={pledgeQty}
                    onChange={(e) => setPledgeQty(e.target.value)}
                    required
                  />
                  <span style={{ fontSize: '0.76rem', color: 'var(--slate-500)', marginTop: '4px', display: 'block' }}>
                    Available remaining quota in this pool: {selectedDeal.remainingQuantity} {selectedDeal.unit}
                  </span>
                </div>

                <div style={{ padding: '12px', background: 'var(--primary-50)', borderRadius: 'var(--radius-md)', marginBottom: '20px', fontSize: '0.85rem' }}>
                  Your Total Cost: <strong style={{ color: 'var(--primary-800)' }}>₹{Number(pledgeQty) * selectedDeal.groupPrice}</strong>{' '}
                  <span style={{ color: '#16a34a', fontWeight: 600 }}>
                    (You save ₹{Number(pledgeQty) * (selectedDeal.regularPrice - selectedDeal.groupPrice)})
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>
                    Confirm & Add to Basket
                  </button>
                  <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CustomerGroupBuying;

