import React from "react";

import { Monitor, User, Network, X } from "lucide-react";

export default function DeviceDetailsModal({ device, onClose }) {
  if (!device) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-6 min-w-[300px] max-w-xs relative border border-blue-400">
        <button
          className=" top-3 right-3 text-gray-400 hover:text-blue-600 text-3xl transition-colors"
          onClick={onClose}
          title="Fechar"
        >
          <X className="w-7 h-7" />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-full">
            <Monitor className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-0.5">{device.name}</h2>
            <div className="text-gray-500 text-sm">{device.type}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 text-base">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-500" />
            <span className="font-semibold text-gray-700">Colaborador:</span>
            <span className="text-gray-900">{device.employee || <span className="italic text-gray-400">Não atribuído</span>}</span>
          </div>
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-blue-500" />
            <span className="font-semibold text-gray-700">IP:</span>
            <span className="text-gray-900">{device.ip || <span className="italic text-gray-400">Sem IP</span>}</span>
          </div>
          {device.mac && (
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-blue-500" />
              <span className="font-semibold text-gray-700">MAC:</span>
              <span className="text-gray-900">{device.mac}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
