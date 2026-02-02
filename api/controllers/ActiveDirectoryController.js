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
                'name',
                'description'
            ]
        };
        client.search('dc=ezortea,dc=com,dc=br', opts, (err, ldapRes) => {
            ldapRes.on('searchEntry', async (entry) => {
                const attrs = {};
                entry.attributes.forEach(a => {
                    attrs[a.type] = a.vals.length > 1 ? a.vals : a.vals[0];
                });
                // Definir type conforme o padrão do name
                let type = null;
                if (attrs.name && typeof attrs.name === 'string') {
                    if (attrs.name.toUpperCase().startsWith('EZ-LT-')) {
                        type = 'Notebook';
                    } else if (attrs.name.toUpperCase().startsWith('EZ-PC-')) {
                        type = 'Computador';
                    }
                }
                // Cria Device apenas se houver name
                if (attrs.name) {
                    try {
                        await db.Devices.create({
                            name: attrs.name,
                            employee: attrs.description || null,
                            type: type
                        });
                    } catch (e) {
                        console.error('Erro ao criar Device:', e);
                    }
                }
                computers.push({
                    name: attrs.name,
                    employee: attrs.description,
                    type: type
                });
            });
            ldapRes.on('end', () => {
                client.unbind();
                return res.json(computers);
            });
        });
    },
    async getUsers(req, res) {
    const client = adInit();
    const users = [];

    const opts = {
        filter: '(&(objectClass=user)(!(objectClass=computer)))',
        scope: 'sub',
        attributes: [
            'sAMAccountName',
            'displayName',
            'mail',
            'department'
        ]
    };

    client.search('dc=ezortea,dc=com,dc=br', opts, (err, ldapRes) => {
        if (err) {
            console.error('Erro na busca LDAP:', err);
            return res.status(500).json({ error: 'Erro ao consultar o AD' });
        }

        ldapRes.on('searchEntry', (entry) => {
            const attrs = {};

            entry.attributes.forEach(a => {
                attrs[a.type] = a.vals.length > 1 ? a.vals : a.vals[0];
            });

            // Só adiciona se tiver login
                if (attrs.sAMAccountName && attrs.mail) {
                    users.push({
                        login: attrs.sAMAccountName,
                        nome: attrs.displayName || null,
                        email: attrs.mail,
                        departament: attrs.department || null,
                    });
                }
        });

        ldapRes.on('end', () => {
            client.unbind();
            return res.json(users);
        });

        ldapRes.on('error', (err) => {
            console.error('Erro no LDAP:', err);
            client.unbind();
            return res.status(500).json({ error: 'Erro durante leitura do AD' });
        });
    });
}


};

export default ActiveDirectoryController;
