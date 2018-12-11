const {remote} = require('electron');

(function handleWindowControls() {

    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            init();
        }
    };

    function init() {
        let window = remote.getCurrentWindow();
        const minButton = document.getElementById('min-button'),
            maxButton = document.getElementById('max-button'),
            restoreButton = document.getElementById('restore-button'),
            closeButton = document.getElementById('close-button');

        minButton.addEventListener("click", event => {
            window = remote.getCurrentWindow();
            window.minimize();
        });

        maxButton.addEventListener("click", event => {
            window = remote.getCurrentWindow();
            window.maximize();
            toggleMaxRestoreButtons();
        });

        restoreButton.addEventListener("click", event => {
            window = remote.getCurrentWindow();
            window.unmaximize();
            toggleMaxRestoreButtons();
        });


        toggleMaxRestoreButtons();
        window.on('maximize', toggleMaxRestoreButtons);
        window.on('unmaximize', toggleMaxRestoreButtons);

        closeButton.addEventListener("click", event => {
            window = remote.getCurrentWindow();
            window.close();
        });

        function toggleMaxRestoreButtons() {
            window = remote.getCurrentWindow();
            if (window.isMaximized()) {
                maxButton.style.display = "none";
                restoreButton.style.display = "flex";
            } else {
                restoreButton.style.display = "none";
                maxButton.style.display = "flex";
            }
        }
    }
})();

// voltar para a tela de login 
function voltarLogin(){

    const BrowserWindow = remote.BrowserWindow;
    const win = new BrowserWindow({
        width: 662,
        height: 350,
        frame: false,
        title: "Aplicativo demonstrativo",
        icon: './img/discord-new-logo.png',
        resizable: false,
        center: true,
        transparent: false
    });
    win.loadFile('./app/view/index.html');
    // fechar a janela atual para ir na próxima
    let janelaFechar = remote.getCurrentWindow();
    janelaFechar.close();

}