import { useState, useEffect } from "react";

function FilterBar({ original, setFiltered }) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Debounce timer reference
  useEffect(() => {
    if (!original || original.length === 0) return;
  
    const timeout = setTimeout(() => {
      applyFilters();
    }, 300);
  
    return () => clearTimeout(timeout);
  }, [search, type, bedrooms, location, maxPrice, original]);
  

  const applyFilters = () => {
    if (!original || original.length === 0) return;
  
    let filtered = original;
  
    if (search) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase())
      );
    }
  
    if (type) filtered = filtered.filter(p => p.type === type);
    if (bedrooms) filtered = filtered.filter(p => p.bedrooms >= parseInt(bedrooms));
    if (location) filtered = filtered.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
    if (maxPrice) filtered = filtered.filter(p => p.price <= parseInt(maxPrice));
  
    setFiltered(filtered);
  };
  

  const clearFilters = () => {
    setSearch('');
    setType('');
    setBedrooms('');
    setLocation('');
    setMaxPrice('');
    setFiltered(original);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by title/location"
        className="border p-2 rounded-full px-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded-full px-6">
      <option value="">All Types</option>
        <option value="Villa">Villa</option>
        <option value="Flat">Flat</option>
        <option value="Plot">Plot</option>
      </select>
      <input
        type="number"
        placeholder="Min Bedrooms"
        className="border p-2 rounded-full px-6"
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        className="border p-2 rounded-full px-6"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        className="border p-2 rounded-full px-6"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

<button
        onClick={clearFilters}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full"
      >
        Clear
      </button>
    </div>
  );
}

export default FilterBar;
