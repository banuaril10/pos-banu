const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'pos-idolmart-win32-ia32/'),
    authors: 'Banu Ari Ramadhan',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'pos-idolmart.exe',
    setupExe: 'pos-idolmart-setup.v4.0.0.exe',
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
  })
}