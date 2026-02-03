import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserProvider from "../providers/User";
import { getEmployees } from "../providers/Employees";
export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError("");
      try {
        const users = await getEmployees();
        const user = Array.isArray(users) ? users.find((u) => String(u.id) === String(id)) : null;
        if (user) {
          setForm({ name: user.name || "", email: user.email || "" });
        } else {
          setError("Usuário não encontrado.");
        }
      } catch (err) {
        setError("Erro ao buscar usuário.");
      } finally {
        setLoading(false);
        setUserLoaded(true);
      }
    }
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
    //   await UserProvider.updateUser({ id, ...form });
      setSuccess("Usuário atualizado com sucesso!");
      setTimeout(() => navigate("/colaboradores"), 1200);
    } catch (err) {
      setError("Erro ao atualizar usuário.");
    } finally {
      setLoading(false);
    }
  };

  if (!userLoaded && loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen  bg-opacity-10">
      <div className="bg-white rounded-lg shadow-lg p-8 min-w-[350px] max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={() => navigate("/colaboradores")}
        >
          <span aria-hidden>×</span>
        </button>
        <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              required
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200"
              onClick={() => navigate("/colaboradores")}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
