clear
echo 'Installing dependencies for building node-canvas and more native Node.js module.';
echo 'This may require sudo, please provide your password if required.';
echo '---------------------------------------------------------------------------------';
echo 'Please ignore the error : "bash: sudo: command not found" if you are root.';
echo
echo 'Press any key to continue...';
read;
sudo apt install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev;
apt install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev;
echo 'Installation complete.'
