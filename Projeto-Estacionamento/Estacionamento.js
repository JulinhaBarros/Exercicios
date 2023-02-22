(function(){
    const $ = q => document.querySelector(q);

    function convertPeriod(mil) {
        var min = Math.floor(mil / 60000);
        var sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    };

    function renderGarage () {
        const garage = getGarage();
        $("#garage").innerHTML = "";
        garage.forEach(c => addCarToGarage(c))
    };

    function addCarToGarage (car) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${car.name}</td>
            <td>${car.licence}</td>
            <td data-time="${car.time}">
                ${new Date(car.time)
                        .toLocaleString('pt-BR', { 
                            hour: 'numeric', minute: 'numeric' 
                })}
            </td>
            <td>
                <button class="delete">x</button>
            </td>
        `;

        $("#garage").appendChild(row);
    };

    function checkOut(info) {
        let period = new Date() - new Date(info[2].dataset.time);
        period = convertPeriod(period);

        const licence = info[1].textContent;
        const msg = `O veículo ${info[0].textContent} de placa ${licence} permaneceu ${period} estacionado. \n\n Deseja encerrar?`;

        if(!confirm(msg)) return;
        
        const garage = getGarage().filter(c => c.licence !== licence);
        localStorage.garage = JSON.stringify(garage);
        
        renderGarage();
    };

    const getGarage = () => localStorage.garage ? JSON.parse(localStorage.garage) : [];

    renderGarage();
    $("#send").addEventListener("click", e => {
        const name = $("#name").value;
        const licence = $("#licence").value;

        if(!name || !licence){
            alert("Os campos são obrigatórios.");
            return;
        }   

        const card = { name, licence, time: new Date() };

        const garage = getGarage();
        garage.push(card);

        localStorage.garage = JSON.stringify(garage);

        addCarToGarage(card);
        $("#name").value = "";
        $("#licence").value = "";
    });

    $("#garage").addEventListener("click", (e) => {
        if(e.target.className === "delete")
            checkOut(e.target.parentElement.parentElement.cells);
    });
})()


/*let dados = []


function estacionarCarro() {
    
    let modelo = document.getElementById('modelo')
    let placa = document.getElementById ('placa').value
    let cor = document.getElementById ('cor')
    let entrada = document.getElementById('entrada').value

    /*alert ("OS campos são obrigatórios")*/

    /*while (modelo) {
        modelo.innerHTML =`
    <p>Modelo: ${dados.modelo}</p>`
    break
    }
    while (placa) {
        placa.innerHTML =`
    <p>Placa: ${dados.placa}</p>`
    break
    }
    while (cor) {
        cor.innerHTML =`
    <p>Cor: ${dados.cor}</p>`
    break
    }
    while (entrada) {
        entrada.innerHTML =`
    <p>Entrada: ${dados.entrada}</p>`
    break
    }
}

/*function garage () {
    const garage = getGarage();
    $("#garage").innerHTML =`
    <p>Modelo: ${dados.modelo}</p>
    <p>Placa: ${dados.placa}</p>
    <p>Cor: ${dados.cor}</p>
    <p>Entrada: ${dados.entrada}</p>`


    garage.forEach(c => addCarToGarage(c))
}*/

/*function saidaCarro() {

    function horas(mil) {
        var min = Math.floor(mil / 60000);
        var sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    };

    let sai = document.getElementById('sai').value
    let entra = document.getElementById ('entra')

    while (sai) {
        sai.innerHTML =`
    <p>Saída: ${dados.sai}</p>`
    break
    }

    while (entra) {
        entra.innerHTML =`
    <p>Entrada: ${dados.entra}</p>`
    break
    }

    let soma =`${dados.saida}` - `${dados.entrada}`;
    alert ("Seu carro permaneceu" + horas + " horas no estacionamento e deverá pagar" + soma + " reais por permanência")
    
}


function mostrarCarro() {
    let mostrar = document.getElementById('mostrar').value

    while (mostrarCarro) {
        mostrar.innerHTML =`
    <p>Modelo: ${dados.modelo}</p>
    <p>Placa: ${dados.placa}</p>
    <p>Cor: ${dados.cor}</p>
    <p>Entrada: ${dados.entrada}</p>
    <p>Saída: ${dados.saida}</p>`
    break
    }
}
*/