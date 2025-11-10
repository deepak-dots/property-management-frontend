import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import CardGrid from "../../components/CardGrid";

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    axios
      .get("/properties/developers")
      .then((res) => {
        console.log("Developers data:", res.data);
        setDevelopers(Array.isArray(res.data) ? res.data : res.data.developers || []);
      })
      .catch((err) => console.error("Error fetching developers:", err));
  }, []);

  return (
    <div className="max-w-8xl mx-auto p-6">
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Property Developers</h2>
        </div>

        <CardGrid
          data={developers}
          linkKey="developer"
          gradientClass="flex items-center justify-center h-40 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white text-center rounded-2xl group-hover:scale-[1.03] transition-transform duration-300"
        />
      </section>
    </div>
  );
}
