import React, { useState } from "react";
import userProvider from "../providers/User";


const Register: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    if (!nome || !email || !senha) {
      setError("Preencha todos os campos.");
      setLoading(false);
      return;
    }
    try {
      const response = await userProvider.register({ name: nome, email, password: senha });
      if(response){
        setSuccess("Usuário registrado com sucesso! Você já pode fazer login.");
        setNome("");
        setEmail("");
        setSenha("");
        window.location.href = "/login";
      }
      setError("Erro ao registrar usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-md flex flex-col gap-6 border border-blue-100"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-2">Registrar Usuário</h1>
        <label className="flex flex-col gap-1">
          <span className="font-semibold text-zinc-700">Nome</span>
          <input
            type="text"
            className="border-2 rounded-xl px-4 py-2 focus:outline-none border-zinc-200"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
            placeholder="Seu nome"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold text-zinc-700">Email</span>
          <input
            type="email"
            className="border-2 rounded-xl px-4 py-2 focus:outline-none border-zinc-200"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold text-zinc-700">Senha</span>
          <input
            type="password"
            className="border-2 rounded-xl px-4 py-2 focus:outline-none border-zinc-200"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
            placeholder="••••••••"
          />
        </label>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full py-2 font-bold text-lg shadow hover:scale-105 hover:from-blue-700 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}
      </form>
    </div>
  );
};

export default Register;
