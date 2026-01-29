import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { updateDevice } from "../providers/Devices.jsx";

export default function EditEquipamento() {
  const location = useLocation();
  const navigate = useNavigate();
  const equipamento = location.state?.equipamento;
  const [form, setForm] = useState(equipamento || {});

  useEffect(() => {
    console.log("Equipamento to edit:", equipamento);
    if (!equipamento) {
      navigate("/equipamentos");
    }
  }, [equipamento, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(form);
    e.preventDefault();
    await updateDevice(form);
    navigate("/equipamentos");
  };

  if (!equipamento) return null;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Editar Equipamento</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div>
          <label className="block mb-1">Nome</label>
          <input name="name" defaultValue={form.name || ""} onChange={handleChange} className="w-full border px-2 py-1" />
        </div>
        <div>
          <label className="block mb-1">Tipo</label>
          <input name="type" defaultValue={form.type || ""} onChange={handleChange} className="w-full border px-2 py-1" />
        </div>
        <div>
          <label className="block mb-1">Colaborador</label>
          <input name="employee" defaultValue={form.employee || ""} onChange={handleChange} className="w-full border px-2 py-1" />
        </div>
        <div>
          <label className="block mb-1">IP</label>
          <input name="ip" defaultValue={form.ip || ""} onChange={handleChange} className="w-full border px-2 py-1" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
      </form>
    </div>
  );
}
