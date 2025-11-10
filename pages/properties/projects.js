import React, { useEffect, useState } from "react";
import axios from '../../utils/axiosInstance';
import CardGrid from "../../components/CardGrid";


export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/properties/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <div className="max-w-8xl mx-auto p-6">
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Projects</h2>
        </div>
        <CardGrid
          data={projects}
          linkKey="project"
          gradientClass="from-green-400 via-emerald-500 to-teal-600"
        />
      </section>
    </div>
  );
}
