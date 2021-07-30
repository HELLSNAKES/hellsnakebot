const exec = require('child_process');
const moment = require('moment');

(async () => {
    async function loader() {
        const child = exec.spawn('node', ['--experimental-repl-await', '--trace-warnings', 'app.js'], {
            stdio: 'inherit',
            shell: true,
            cwd: __dirname
        });

        child.on('close', async (code) => {
            console.log()
            console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`,'Error code ' + code + '. Shutting down...');
            console.log()
            if (code == 2) {
                await loader();
                return;
            }
            process.exit(0)
        })
    }
    await loader();
})();
