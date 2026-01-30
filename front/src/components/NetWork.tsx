
import { use, useEffect, useState } from 'react';
import { getNetworkDevices, updateNetWorkList } from '../providers/NetWork';
import { Search } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Monitor, ArrowUp, ArrowDown } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface Device {
    id?: string | number;
    hostname?: string;
    ip?: string;
    mac?: string;
    ipNumber?: number;
    [key: string]: any;
}

export default function Network() {
    const [data, setData] = useState<Device[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });
    const [search, setSearch] = useState('');
    const columns = [
        { label: 'ID', key: 'id', width: 'w-40' },
        { label: 'Hostname', key: 'hostname', width: 'w-40' },
        { label: 'IP', key: 'ip', width: 'w-32' },
        { label: 'MAC', key: 'mac', width: 'w-40' },
    ];

    const fetchData = () => {
        setLoading(true);
        getNetworkDevices()
            .then((res) => {
                console.log(res);
                setData(res);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, []);
    const handleUpdate = async () => {
        setLoading(true);
        try {
            await updateNetWorkList();
        } catch (e) {
            console.error('Erro ao atualizar a lista de dispositivos de rede!');
        } finally {
            setLoading(false);
        }
    };

    const filteredData = data.filter(device => {
        const term = search.toLowerCase();
        return (
            device.ip?.toLowerCase().includes(term) ||
            device.mac?.toLowerCase().includes(term) ||
            device.hostname?.toLowerCase().includes(term)
        );
    });

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig.key) return 0;
        // Ordenação especial para IP numérico
        if (sortConfig.key === 'ip') {
            const aNum = a.ipNumber || 0;
            const bNum = b.ipNumber || 0;
            return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    // Detecta MACs duplicados
    const macCount = data.reduce<Record<string, number>>((acc, d) => {
        if (d.mac) acc[d.mac] = (acc[d.mac] || 0) + 1;
        return acc;
    }, {});
    const duplicatedMacs = Object.entries(macCount).filter(([_, count]) => count > 1).map(([mac]) => mac);

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Dispositivos de Rede</h1>
                        <p className="text-gray-600 mt-2">Veja todos os dispositivos conectados à rede</p>
                    </div>
                </div>
            </div>

            <div className="mb-6 max-w-2xl">
                <Card className={duplicatedMacs.length > 0 ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}>
                    <CardContent className="py-4">
                        {duplicatedMacs.length > 0 ? (
                            <>
                                <div className="font-bold text-red-700 mb-2">MACs duplicados encontrados:</div>
                                <ul className="list-disc pl-6 text-red-700">
                                    {duplicatedMacs.map(mac => (
                                        <li key={mac}>{mac}</li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <div className="font-bold text-green-700">Nenhum MAC duplicado encontrado.</div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="mb-4 max-w-md flex justify-between gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Pesquisar por IP, MAC ou Hostname..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        ATUALIZAR
                    </button>
                </div>
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
                                            <td className="px-6 py-4 whitespace-nowrap">{device.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{device.hostname}</td>
                                            <td className="px-6 py-4 whitespace-nowrap font-mono">{device.ip}</td>
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
