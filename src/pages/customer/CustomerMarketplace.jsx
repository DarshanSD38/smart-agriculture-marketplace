import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../../services/productService';
import ProductCard from '../../components/ProductCard';
import { SearchBar, FilterBar } from '../../components/SearchBar';
import { Filter, SlidersHorizontal, ArrowUpDown, MapPin, Store } from 'lucide-react';

const CustomerMarketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialFarmer = searchParams.get('farmer') || '';

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(initialFarmer);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(350);
  const [sortBy, setSortBy] = useState('default');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Milk/Farm Products'];

  useEffect(() => {
    loadProducts();
  }, [search, selectedCategory, maxPrice, sortBy, organicOnly]);

  const loadProducts = async () => {
    setLoading(true);
    const data = await productService.searchAndFilter({
      query: search,
      category: selectedCategory,
      maxPrice: Number(maxPrice),
      sortBy,
      organicOnly
    });
    setProducts(data);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
      {/* Title */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-700)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
          <Store size={18} />
          <span>Direct Farmer Marketplace</span>
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Farm-Fresh Direct Marketplace
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Purchase directly from certified organic growers and local family farms with guaranteed fair prices
        </p>
      </div>

      {/* SEARCH AND MAIN CATEGORIES */}
      <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <SearchBar
              value={search}
              onChange={setSearch}
              onClear={() => setSearch('')}
              placeholder="Search by vegetable, fruit, grain or farmer name..."
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--slate-500)', fontWeight: 600 }}>Sort By:</span>
            <select
              className="form-select"
              style={{ width: 'auto', padding: '8px 12px', fontSize: '0.85rem' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Featured / Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rating (★)</option>
              <option value="freshness">Fresh Harvest (Date)</option>
            </select>
          </div>
        </div>

        {/* Filter Bar & Quick Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Price slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--slate-600)', whiteSpace: 'nowrap' }}>
                Max: <strong>₹{maxPrice}</strong>
              </span>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{ accentColor: 'var(--primary-600)', cursor: 'pointer' }}
              />
            </div>

            {/* Organic filter toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', fontWeight: 600, color: 'var(--slate-700)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={organicOnly}
                onChange={(e) => setOrganicOnly(e.target.checked)}
                style={{ accentColor: 'var(--primary-600)', width: '15px', height: '15px' }}
              />
              <span>Organic Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      {loading ? (
        <div className="card" style={{ padding: '60px', textAlign: 'center', color: 'var(--slate-400)' }}>
          Loading farm-fresh products...
        </div>
      ) : products.length === 0 ? (
        <div className="card" style={{ padding: '60px', textAlign: 'center', color: 'var(--slate-400)' }}>
          <Store size={44} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
          <h3>No products match your current filters</h3>
          <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>
            Try increasing your price limit or clearing the search query.
          </p>
          <button
            onClick={() => { setSearch(''); setSelectedCategory('All'); setMaxPrice(350); setOrganicOnly(false); }}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '14px' }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: '0.84rem', color: 'var(--slate-500)', marginBottom: '14px', fontWeight: 600 }}>
            Showing {products.length} farm products directly available
          </div>
          <div className="grid-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerMarketplace;

