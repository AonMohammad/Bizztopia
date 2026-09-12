const { Client } = require('ssh2');
const fs = require('fs');

const conn = new Client();

console.log('Connecting to root@169.58.102.34 with SSH Key & Password fallback...');

const privateKey = fs.existsSync('C:/Users/Admin/.ssh/id_rsa') 
    ? fs.readFileSync('C:/Users/Admin/.ssh/id_rsa') 
    : undefined;

conn.on('ready', () => {
    console.log('>>> [SUCCESS] SSH Authenticated as root! <<<');
    
    const cmd = `
        cd /var/www/bizztopia 2>/dev/null || cd /var/www/html;
        echo "Working Directory: $(pwd)";
        
        if [ ! -d .git ]; then
            git init;
            git remote add origin https://github.com/AonMohammad/Bizztopia.git;
            git fetch origin main;
            git reset --hard origin/main;
            git branch --set-upstream-to=origin/main main;
        else
            git pull origin main;
        fi
        
        if [ -f deploy/deploy.sh ]; then
            bash deploy/deploy.sh;
        fi
        
        echo "=== ALL DONE & LIVE ===";
    `;

    conn.exec(cmd, (err, stream) => {
        if (err) {
            console.error('Exec error:', err);
            conn.end();
            process.exit(1);
        }
        stream.on('data', (d) => process.stdout.write(d.toString()));
        stream.stderr.on('data', (d) => process.stderr.write(d.toString()));
        stream.on('close', (code) => {
            console.log('\nDeployment finished with code:', code);
            conn.end();
            process.exit(code || 0);
        });
    });
}).on('error', (err) => {
    console.error('SSH Error:', err.message);
    process.exit(1);
}).connect({
    host: '169.58.102.34',
    port: 22,
    username: 'root',
    privateKey: privateKey,
    password: 'PASSWORD_HERE',
    readyTimeout: 15000
});
