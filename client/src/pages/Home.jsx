import { useEffect, useState } from "react";
import axios from "../api";
import PropertyCard from "../components/PropertyCard";
import FilterBar from "../components/FilterBar";

function Home() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("/properties");
      setProperties(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Failed to fetch properties", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div>
      <FilterBar original={properties} setFiltered={setFiltered} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map(p => (
          <PropertyCard key={p._id} property={p} />
        ))}
      </div>
    </div>
  );
}

export default Home;
