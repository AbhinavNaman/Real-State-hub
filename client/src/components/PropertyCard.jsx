import { useState } from "react";
import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  const [wishlisted, setWishlisted] = useState(false);

  const fallBackImage = "https://imgs.search.brave.com/GCG5UShGUhGWvJEKtalGiY_8V8E4585PQvMwZ87vkhI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vWVNweG9h/VURGUWVmNmJ1RVJD/V2xhUzlNZ3ZDaF9W/RkhUN3VIeERsTFFH/dy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlw/YldjdS9abkpsWlhC/cGF5NWpiMjB2L1pu/SmxaUzEyWldOMGIz/SXYvZEdsdWVTMW9i/M1Z6WlMxai9iMjVq/WlhCMExXbHNiSFZ6/L2RISmhkR2x2Ymw4/eE1UUXovTmpBdE9U/QTROeTVxY0djXy9j/MlZ0ZEQxaGFYTmZh/SGxpL2NtbGtKbmM5/TnpRdw"
  if (!property?._id) return null;
  return (
    <Link to={`/property/${property?._id}`}>
    <div className="border border-gray-300 shadow-xl rounded hover:bg-sky-100 p-4">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-48 object-cover cursor-pointer"
        onError={(e) => {
            e.target.onerror = null; // prevents infinite fallback loop
            e.target.src = fallBackImage;
          }}
      />
      <h3 className="text-lg font-bold mt-2">{property.title}</h3>
      <p>{property.location} — ₹{property.price.toLocaleString()}</p>
      <p>{property.area} | {property.bedrooms} BHK</p>
      <button
        onClick={() => setWishlisted(!wishlisted)}
        className={`mt-2 px-3 py-1 rounded ${wishlisted ? 'bg-red-500' : 'bg-gray-300'}`}
      >
        {wishlisted ? 'Wishlisted ❤️' : 'Add to Wishlist 🤍'}
      </button>
    </div>
    </Link>
  );
}

export default PropertyCard;
