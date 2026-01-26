import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import userProvider from '../providers/User';
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusField, setFocusField] = useState<'email' | 'password' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      setError('Preencha todos os campos.');
      setLoading(false);
      return;
    }
    // Simulação de login
    try{
        await userProvider.loginUser(email, password);
    }catch(err){
        setError('Falha ao entrar. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-fadeInLogin">
      {/* Loading overlay */}
      {loading && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(219,234,254,0.7)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.3s',
        }}>
          <div className="flex flex-col items-center gap-3">
            <span className="loader-login mb-2"></span>
            <span className="text-blue-700 font-semibold animate-fadeInLogin">Entrando...</span>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-md flex flex-col gap-6 border border-blue-100 animate-slideInLogin"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <div className="flex flex-col items-center mb-2">
          <span className="bg-blue-100 p-4 rounded-full mb-2 animate-popIn">
            <FaUserCircle className="text-blue-600 text-4xl drop-shadow" />
          </span>
          <h1 className="text-3xl font-extrabold text-zinc-900 mb-1 tracking-tight animate-fadeInLogin">Bem-vindo de volta</h1>
          <p className="text-zinc-500 text-sm animate-fadeInLogin">Acesse sua conta para continuar</p>
        </div>
        <label className="flex flex-col gap-1 animate-fadeInLogin">
          <span className="font-semibold text-zinc-700">Email</span>
          <input
            type="email"
            className={`border-2 rounded-xl px-4 py-2 focus:outline-none transition-all duration-200 ${focusField === 'email' ? 'border-blue-500 shadow-lg' : 'border-zinc-200'}`}
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocusField('email')}
            onBlur={() => setFocusField(null)}
            required
            autoComplete="email"
            placeholder="seu@email.com"
          />
        </label>
        <label className="flex flex-col gap-1 animate-fadeInLogin">
          <span className="font-semibold text-zinc-700">Senha</span>
          <input
            type="password"
            className={`border-2 rounded-xl px-4 py-2 focus:outline-none transition-all duration-200 ${focusField === 'password' ? 'border-blue-500 shadow-lg' : 'border-zinc-200'}`}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onFocus={() => setFocusField('password')}
            onBlur={() => setFocusField(null)}
            required
            autoComplete="current-password"
            placeholder="••••••••"
          />
        </label>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full py-2 font-bold text-lg shadow hover:scale-105 hover:from-blue-700 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <div className="text-center mt-2 text-sm text-zinc-700 animate-fadeInLogin">
          Ainda não tem login?{' '}
          <a href="/register" className="text-blue-600 hover:underline font-semibold">Registre-se</a>
        </div>
        {error && <div className="text-red-500 text-center animate-fadeInLogin">{error}</div>}
      </form>
      <style>{`
        @keyframes fadeInLogin {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInLogin {
          animation: fadeInLogin 0.7s cubic-bezier(.4,0,.2,1);
        }
        @keyframes slideInLogin {
          from { opacity: 0; transform: translateX(60px) scale(0.98); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-slideInLogin {
          animation: slideInLogin 0.7s cubic-bezier(.4,0,.2,1);
        }
        @keyframes popIn {
          0% { transform: scale(0.7); opacity: 0; }
          80% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-popIn {
          animation: popIn 0.6s cubic-bezier(.4,0,.2,1);
        }
        .loader-login {
          width: 44px;
          height: 44px;
          border: 5px solid #3b82f6;
          border-top: 5px solid #e0e7ef;
          border-radius: 50%;
          animation: spinLogin 0.8s linear infinite;
        }
        @keyframes spinLogin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;
