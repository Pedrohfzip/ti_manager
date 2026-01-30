
import { exec } from 'child_process';
import dns from 'dns';


const baseIps = ['192.168.0.', '192.168.1.'];
const start = 1;
const end = 254;

let devices = [];
let checked = 0;
let processed = 0;
const totalChecks = baseIps.length * (end - start + 1);

function isValidIPv4(ip) {
  return /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
}


function getMacFromArp(ip, callback) {
  exec('arp -a', (err, stdout) => {
    if (err) return callback('');
    // Procura linha que começa com o IP e pega a segunda coluna (MAC)
    const lines = stdout.split(/\r?\n/);
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      if (parts[0] === ip && parts.length >= 2) {
        return callback(parts[1]);
      }
    }
    callback('');
  });
}

for (const baseIp of baseIps) {
  for (let i = start; i <= end; i++) {
    const ip = baseIp + i;
    exec(`ping -n 1 -w 100 ${ip}`, (err, stdout) => {
      checked++;
      if (!err && stdout.includes('TTL=')) {
        // IP respondeu ao ping
        getMacFromArp(ip, (mac) => {
          dns.reverse(ip, (err, hostnames) => {
            devices.push({
              ip,
              mac,
              hostname: (!err && hostnames && hostnames.length > 0) ? hostnames[0] : '',
            });
            processed++;
            if (processed === totalChecks) {
              console.table(devices, ['ip', 'mac', 'hostname']);
            }
          });
        });
      } else {
        processed++;
        if (processed === totalChecks) {
          console.table(devices, ['ip', 'mac', 'hostname']);
        }
      }
    });
  }
}
