
import { useEffect, useState } from 'react';
import { getNetworkDevices } from '../providers/NetWork';
import { Card, CardContent } from './ui/card';
import { Monitor, ArrowUp, ArrowDown } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export default function Network() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const columns = [
    { label: 'IP', key: 'ip', width: 'w-32' },
    { label: 'Hostname', key: 'hostname', width: 'w-40' },
    { label: 'MAC', key: 'mac', width: 'w-40' },
  ];

  useEffect(() => {
    setLoading(true);
    getNetworkDevices()
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .finally(() => setLoading(false));
  }, []);

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key] || '';
    const bValue = b[sortConfig.key] || '';
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dispositivos de Rede</h1>
        <p className="text-gray-600 mt-2">Veja todos os dispositivos conectados à rede</p>
      </div>
      <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`${col.width} px-4 py-2 text-left text-xs font-medium uppercase tracking-wider cursor-pointer select-none`}
                      onClick={() => {
                        setSortConfig((prev) => {
                          if (prev.key === col.key) {
                            return { key: col.key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
                          }
                          return { key: col.key, direction: 'asc' };
                        });
                      }}
                    >
                      <span className="flex items-center gap-1">
                        {col.label}
                        {sortConfig.key === col.key && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
                      <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-32" /></td>
                      <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-32" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
                      <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-32" /></td>
                      <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-32" /></td>
                    </tr>
                  </>
                ) : sortedData.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-12">
                      <Monitor className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Nenhum dispositivo encontrado</p>
                    </td>
                  </tr>
                ) : (
                  sortedData.map((device, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-mono">{device.ip}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{device.hostname}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono">{device.mac}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
