import React, { useState } from "react";
import axios from "axios";

interface AddressResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

const SearchForm: React.FC = () => {
  const [streetName, setStreetName] = useState("");
  const [addresses, setAddresses] = useState<AddressResult[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get<AddressResult[]>(
        `https://nominatim.openstreetmap.org/search?format=json&q=${streetName}&countrycodes=BR&limit=10`
      );
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Digite o nome da rua"
          value={streetName}
          onChange={(e) => setStreetName(e.target.value)}
          className="p-2 border rounded-md w-64"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Buscar Cep
        </button>
      </form>
      <div>
        <h2 className="mb-2 text-lg font-semibold">Resultados:</h2>
        {addresses.length === 0 ? (
          <p>Nenhum resultado encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {addresses.map((address) => (
              <div
                key={address.place_id}
                className="bg-white rounded-lg p-4 shadow-md"
              >
                <p className="text-blue-600 font-semibold">
                  {address.display_name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
