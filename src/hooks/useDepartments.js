import { useEffect, useState } from "react";
import { departmentService } from "../services/departmentService";

export function useDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDepartments = async () => {
    setLoading(true);
    const data = await departmentService.getAll();
    setDepartments(data);
    setLoading(false);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  return {
    departments,
    loading,
    reload: loadDepartments,
  };
}
