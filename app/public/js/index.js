const { remote} = require('electron');

try{
(function handleWindowControls() {
    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            init();
        }
    };

    function init() {
        let window = remote.getCurrentWindow();
        const minButton = document.getElementById('min-button'),
            restoreButton = document.getElementById('restore-button'),
            closeButton = document.getElementById('close-button');

        minButton.addEventListener("click", event => {
            window = remote.getCurrentWindow();
            window.minimize();
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
                restoreButton.style.display = "flex";
            } else {
                restoreButton.style.display = "none";
            }
        }
    }
})();

   /*
        Mine sisteminha de validar login
   */
function validateLogin()
{
    var email = document.getElementById('fEmail').value;
    var senha = document.getElementById('fSenha').value;

    if (email === '' || senha === '') {
        document.getElementById('openAlert').style.display = 'block';
        document.getElementById('alert-msg').innerHTML = 'Os campos Email/senha estão vazios!'
        times(10);
        return;
    }else
    {
        if(email === 'adm@hotmail.com' && senha === '123456')
        {
            // abrir uma nova janela assim que logar
            const BrowserWindow = remote.BrowserWindow; // == criar uma janela do aplicativo
            const win = new BrowserWindow({     
                frame: false,
                title: "Aplicativo demonstrativo",
                icon: './app/public/img/discord-new-logo.png',
                resizable: true,
                minWidth: 800,
                minHeight: 800,
                center: true,
                transparent: false})

                // maximizar a janela
                win.maximize();

            // abrir a home.html
            win.loadFile('./app/view/home.html');
            let windows = remote.getCurrentWindow();
            windows.close();
            return;
            // =================================================== //
        }else
        {
            document.getElementById('openAlert').style.display = 'block';
            document.getElementById('alert-msg').innerHTML = 'Os dados informados estão inválidos!'
            times(10);
            return;  
        }
    }

  
}
//==================================================== //

// função de tempo para fechar a box de alerta
function times(count)
{
    setTimeout(() => {
        document.getElementById('openAlert').style.display = 'none';
        }, 1000 * count);
}
}catch (error)
{
    console.log(error);
}