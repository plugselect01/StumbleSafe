const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');
const chalkRainbow = require('chalk-rainbow')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3', {
    method: 'GET',
    headers: {
      'authorization': auth
    }
  })
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });

});

(async () => {

  console.log(chalkWhite(`
───────────▄▄▄▄▄▄▄▄▄───────────
░██████╗░█████╗░███████╗███████╗
██╔════╝██╔══██╗██╔════╝██╔════╝
╚█████╗░███████║█████╗░░█████╗░░
░╚═══██╗██╔══██║██╔══╝░░██╔══╝░░
██████╔╝██║░░██║██║░░░░░███████╗
╚═════╝░╚═╝░░╚═╝╚═╝░░░░░╚══════╝
By : ${('VICENZO')}
`));

  const auth = rs.question(chalkYellow('Masukkan Auth Token Anda : '));
  console.log('');

  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

      console.log(chalkGreen(`\r[ ${moment().format('HH:mm:ss')} ] Auth Eror !`));

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;

console.log(chalk.bgBlack(`\r[ ${moment().format('HH:mm:ss')} ] ${chalk.yellow(`Nama Pengguna : ${username}`)} | ${chalk.yellow(`Negara : ${country}`)} | ${chalk.green(`Data Send : Berhasil`)} | ${chalk.blue(`Trophy : ${trophy}`)} | ${chalk.blue(`Mahkota : ${crown}`)}`));
console.log(chalk.bgRed(`Mohon Maaf Akun Kamu Terban :v !`));
      await sleep(5000);

    } else if (result == 'BANNED') {
      console.log(chalk.bgRed(`Mampus Banned Makanya jangan brutal`));
     break;
    }
  }


})();
