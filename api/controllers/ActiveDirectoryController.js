import dotenv from "dotenv";
import { db } from "../database/models/index.js";
import jwt from "jsonwebtoken";
import adInit from '../adInit.js';
dotenv.config();


const ActiveDirectoryController = {

    async getData(req, res) {
        const client = adInit();
        const computers = [];
        const opts = {
            filter: '(objectClass=computer)',
            scope: 'sub',
            attributes: [
                'cn',
                'name',
                'description',
                'dNSHostName',
                'operatingSystem',
                'operatingSystemVersion',
                'operatingSystemServicePack',
                'lastLogon',
                'lastLogoff',
                'lastLogonTimestamp',
                'userAccountControl',
                'whenCreated',
                'whenChanged',
                'managedBy',
                'location',
                'samAccountName',
                'memberOf',
                'distinguishedName'
            ]
        };
        client.search('dc=ezortea,dc=com,dc=br', opts, (err, res) => {
            res.on('searchEntry', (entry) => {
                    const attrs = {};
                       entry.attributes.forEach(a => {
                            // Se tiver múltiplos valores, pega o primeiro
                            attrs[a.type] = a.vals.length > 1 ? a.vals : a.vals[0];
                        });

                        computers.push({
                            nome: attrs.cn,
                            so: attrs.operatingSystem,
                            versao: attrs.operatingSystemVersion,
                            ultimoLogon: attrs.lastLogonTimestamp,
                            dn: attrs.distinguishedName
                        });
                        console.log('Entrada encontrada:', attrs);
            });

            

            res.on('end', () => {
                client.unbind();
                return res.json(computers)
            });
        });

    },

};



// import dotenv from "dotenv";
// import { db } from "../database/models/index.js";
// import jwt from "jsonwebtoken";
// import adInit from '../adInit.js';
// dotenv.config();


// const ActiveDirectoryController = {


//     async getData(req, res) {
//         const client = adInit();
//         const computers = [];
//         const opts = {
//             filter: '(objectClass=computer)',
//             scope: 'sub',
//             attributes: [
//                 'name',
//                 'description'
//             ]
//         };
//         client.search('dc=ezortea,dc=com,dc=br', opts, (err, ldapRes) => {
//             ldapRes.on('searchEntry', async (entry) => {
//                 const attrs = {};
//                 entry.attributes.forEach(a => {
//                     attrs[a.type] = a.vals.length > 1 ? a.vals : a.vals[0];
//                 });

//                 // Definir type conforme o padrão do name
//                 let type = null;
//                 if (attrs.name && typeof attrs.name === 'string') {
//                     if (attrs.name.startsWith('EZ-LT-')) {
//                         type = 'Notebook';
//                     } else if (attrs.name.startsWith('EZ-PC-')) {
//                         type = 'Computador';
//                     }
//                 }

//                 // Cria Device apenas se houver name
//                 if (attrs.name) {
//                     try {
//                         await db.Devices.create({
//                             name: attrs.name,
//                             employee: attrs.description || null,
//                             type: type
//                         });
//                     } catch (e) {
//                         console.error('Erro ao criar Device:', e);
//                     }
//                 }

//                 computers.push({
//                     name: attrs.name,
//                     description: attrs.description
//                 });
//             });

//             ldapRes.on('end', () => {
//                 client.unbind();
//                 return res.json(computers);
//             });
//         });
//     },

// };



// export default ActiveDirectoryController;




export default ActiveDirectoryController;
