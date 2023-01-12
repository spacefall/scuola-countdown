// Giorni di "vacanza" in Veneto
const vacanzeVeneto = {
    0: [1, 2, 3, 4, 5, 6, 7],
    1: [20, 21, 22],
    2: [],
    3: [6, 7, 8, 9, 24, 25],
    4: [1],
    5: [2, 3],
    6: [],
    7: [],
    8: [],
    9: [31],
    10: [1],
    11: [8, 9, 10, 24, 25, 26, 27, 28, 29, 30, 31],
}

// Data finale
const countdownDate = new Date("Jun 10, 2023 13:15:00");

// Aggiorna il countdown ogni secondo
var countdown = setInterval(function () {
    // Get today's date and time
    var now = new Date();

    // Find the distance between now and the count down date
    var distance = countdownDate.getTime() - now.getTime();

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Giorni mancanti
    var lunedi = 0;
    var martedi = 0;
    var mercoledi = 0;
    var giovedi = 0;
    var venerdi = 0;
    var sabato = 0;

    // Escludi vacanze/domeniche
    var daysAntiLavorativi = 0;

    for (var x = 0; x <= days; x++) {
        // Passa al giorno successivo
        var nextDay = new Date(now);
        nextDay.setDate(now.getDate() + x);

        // Evita che cominci a contare giorni oltre alla data del countdown
        if (nextDay > countdownDate) {
            break;
        }

        // Rimouve i giorni di vacanza dal countdown
        if (vacanzeVeneto[nextDay.getMonth()].includes(nextDay.getDate())) {
            daysAntiLavorativi++;
            continue;
        }

        // Se il giorno è Domenica viene escluso dai giorni rimanenti
        if (nextDay.getDay() == 0) {
            daysAntiLavorativi++;
            continue;
        }

        switch (nextDay.getDay()) {
            case 1:
                lunedi++;
                break;
            case 2:
                martedi++;
                break;
            case 3:
                mercoledi++;
                break;
            case 4:
                giovedi++;
                break;
            case 5:
                venerdi++;
                break;
            case 6:
                sabato++;
                break;
            default:
                break;
        }
    }

    document.getElementById("lun").innerHTML = lunedi;
    document.getElementById("mar").innerHTML = martedi;
    document.getElementById("mer").innerHTML = mercoledi;
    document.getElementById("gio").innerHTML = giovedi;
    document.getElementById("ven").innerHTML = venerdi;
    document.getElementById("sab").innerHTML = sabato;

    // Imposta il testo di countdown_lavorativi 
    document.getElementById("countdown_lavorativi").innerHTML = days - daysAntiLavorativi + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    // Imposta il testo di countdown 
    document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    // Se il countdown ha finito scrivi vacanza
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Vacanze 🎉";
    }
}, 1000);