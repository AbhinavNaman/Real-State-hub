import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const res = await fetch(`http://localhost:5000/api/properties/${id}`);
      const data = await res.json();
      setProperty(data);
    };
    fetchProperty();
  }, [id]);

  if (!property) return <div>Loading...</div>;

  if (!id) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-64 object-cover rounded"
      />
      <h1 className="text-3xl font-bold mt-4">{property.title}</h1>
      <p className="text-gray-600">{property.location}</p>
      <p className="mt-2 text-xl font-semibold text-blue-600">
        ₹{property.price.toLocaleString()}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <p><strong>Type:</strong> {property.type}</p>
        <p><strong>Area:</strong> {property.area} sq.ft.</p>
        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="text-gray-700 mt-2">{property.description}</p>
      </div>
    </div>
  );
};

export default PropertyDetail;
