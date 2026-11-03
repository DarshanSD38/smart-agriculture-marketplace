import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ value, onChange, placeholder = "Search fresh products, crops, or farmers...", onClear }) => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Search 
        size={18} 
        style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} 
      />
      <input
        type="text"
        className="form-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ paddingLeft: '42px', paddingRight: value ? '38px' : '14px' }}
      />
      {value && onClear && (
        <button
          onClick={onClear}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--slate-400)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export const FilterBar = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
      {categories.map((cat) => {
        const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            style={{
              padding: '7px 16px',
              borderRadius: 'var(--radius-full)',
              border: isSelected ? '1px solid var(--primary-600)' : '1px solid var(--slate-300)',
              backgroundColor: isSelected ? 'var(--primary-600)' : '#ffffff',
              color: isSelected ? '#ffffff' : 'var(--slate-700)',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default SearchBar;

