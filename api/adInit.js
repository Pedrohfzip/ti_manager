import ldap from 'ldapjs';


const adInit = () => {
    const client = ldap.createClient({
        url: 'ldap://ezortea.com.br:389',
        timeout: 5000,
        connectTimeout: 5000
    });
    client.bind(
        'pedro.fagundes@ezortea.com.br',
        process.env.AD_PASSWORD,
        (err) => {
            if (err) {
                console.error('Erro ao autenticar no AD:', err);
                return;
            }
            console.log('Conectado ao Active Directory');
        }
    );

    return client;
}
export default adInit;