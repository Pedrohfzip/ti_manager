import { exec } from 'child_process';
import dns from 'dns';
exec(
  `powershell -command "arp -a"`,
  (err, stdout) => {
    if (err) return console.error(err);
    // Extrai linhas relevantes
    const lines = stdout.split('\n').filter(line => line.match(/\d+\.\d+\.\d+\.\d+/));
    const devices = lines.map(line => {
      // Exemplo de linha:  192.168.1.1          00-11-22-33-44-55     dynamic
      const parts = line.trim().split(/\s+/);
      return {
        ip: parts[0],
        mac: parts[1],
        type: parts[2] || ''
      };
    });
    // Tenta resolver o nome do host para cada IP
    let resolved = 0;
    devices.forEach(device => {
      dns.reverse(device.ip, (err, hostnames) => {
        device.hostname = (!err && hostnames && hostnames.length > 0) ? hostnames[0] : '';
        resolved++;
        if (resolved === devices.length) {
          console.table(devices, ['ip', 'mac', 'hostname']);
        }
      });
    });
  }
);
