
const {app, BrowserWindow, Menu, remote} = require('electron');
let mainWindow;




function criarjanela()
{
    mainWindow = new BrowserWindow({
        width: 662,
        height: 350,
        frame: false,
        title: "Aplicativo demonstrativo",
        icon: './app/public/img/discord-new-logo.png',
        resizable: false,
        center: true,
        transparent: false
    });
//    mainWindow.openDevTools(); //<== abrir inspecionamento de códgio

    // menu do programa


    const menu = Menu.buildFromTemplate([
        {
            label: "Principal",
            submenu:[
                {
                    label: 'teste'
                }
            ]
        }
    ]);

    Menu.setApplicationMenu(menu)

    mainWindow.loadFile('./app/view/index.html');
    mainWindow.on('closed', function(){
        mainWindow = null;
    })

}
// inicializar a aplicação
app.on('ready', criarjanela);
app.on('window-all-closed', function(){
    if(process.platform !== 'darwin')
    {
        app.quit();
    }
})
app.on('activate', function () {
    criarjanela();

})