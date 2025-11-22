import { useEffect, useState, useCallback } from "react";
import { userService } from "../services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const data = await userService.getUsers(); // ✔ Correct method
    setUsers(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    reload: loadUsers,
  };
};
