const form = document.querySelector('form');
//Inputs
const radius = document.querySelector('#radius-input');
const angle = document.querySelector('#angle-input');
const PI = document.querySelector('#station-input');
const ch = document.querySelector('#chord-input');
//Inputs Values Print
const radiusOutput = document.querySelector('#radius-output');
const angleOutput = document.querySelector('#angle-output');
const piOutput = document.querySelector('#pi-output');
const chOutput = document.querySelector('#chord-output');
//table body
const tableBody = document.querySelector('#table-body');
//results using formulae
const PCstation = document.querySelector('#PC-station');
const PTstation = document.querySelector('#PT-station');
//
const submit = document.querySelector('#submit');
let n = 1;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    radiusOutput.innerHTML = "<b>Radius Of Curve(R):</b>" + " " + radius.value + " m";
    angleOutput.innerHTML = "<b>Deflection Angle(Δ):</b>" + " " + angle.value + " degrees";
    piOutput.innerHTML = "<b>PI Station:</b>" + " " + PI.value + " m";

    if (radius.value < 0) {
        alert('Radius of Curve can not be negative');
        radius.style.border = "2px solid red";
        setTimeout(() => {
            radius.style.border = "1px solid gray";
        }, 2000);

        radiusOutput.innerHTML = "<b>Radius Of Curve(R):</b>"
        angleOutput.innerHTML = "<b>Deflection Angle(Δ):</b>"
        piOutput.innerHTML = "<b>PI Station:</b>";

    } else if (angle.value == 0 || angle.value == 180) {
        alert('Deflection Angle can not be 0 or 180');
        angle.style.border = "2px solid red";
        setTimeout(() => {
            angle.style.border = "1px solid gray";
        }, 2000);

        radiusOutput.innerHTML = "<b>Radius Of Curve(R):</b>"
        angleOutput.innerHTML = "<b>Deflection Angle(Δ):</b>"
        piOutput.innerHTML = "<b>PI Station:</b>";
    } else {

        let PCstationValue = Math.round(PI.value - radius.value * Math.tan((angle.value * Math.PI / 180) / 2));
        PCstation.innerHTML = "<b>PC Station:</b>" + " " + PCstationValue + " m";

        let PTStationValue = Math.round(PCstationValue + 2 * Math.PI * radius.value * angle.value / 360);
        PTstation.innerHTML = "<b>PT Station:</b>" + " " + PTStationValue + " m";

        let CurveLengthValue = Math.round(radius.value * angle.value * Math.PI / 180);
        CurveLength.innerHTML = "<b>Length of Curve:</b>" + " " + CurveLengthValue + " m";

        let TangentLengthValue = Math.round(radius.value * Math.tan((angle.value * Math.PI / 180) / 2));
        TangentLength.innerHTML = "<b>Length of Tangent:</b>" + " " + TangentLengthValue + " m";

        let ChordLengthValue = Math.round(2 * radius.value * Math.sin((angle.value * Math.PI / 180) / 2));
        ChordLength.innerHTML = "<b>Length of Chord:</b>" + " " + ChordLengthValue + " m";

        let MidOrdValue = Math.round(radius.value - (radius.value * Math.cos((angle.value * Math.PI / 180) / 2)));
        MidOrdinate.innerHTML = "<b>Middle Ordinate:</b>" + " " + MidOrdValue + " m";

        let ExtOrdValue = Math.round(radius.value * (1 / Math.cos((angle.value * Math.PI / 180) / 2) - 1));
        ExtOrdinate.innerHTML = "<b>External Ordinate:</b>" + " " + ExtOrdValue + " m";

        const tr = document.createElement('tr');
        tableBody.appendChild(tr);

        const th = document.createElement('th');
        th.textContent = n;
        tr.appendChild(th);
 
        const tdOne = document.createElement('td');
        tdOne.textContent = PCstationValue;
        tr.appendChild(tdOne);

        n++;
        //Just for column Y
        let radiusValue = radius.value;
        //Just for column Y
        for (let i = PCstationValue; i < PTStationValue; i++) {
            if (i % ch.value == 0) {
                const tr = document.createElement('tr');
                tableBody.appendChild(tr);

                const th = document.createElement('th');
                th.textContent = n;
                tr.appendChild(th);

                const tdOne = document.createElement('td');
                tdOne.textContent = i;
                tr.appendChild(tdOne);

                n++;
            }
        }

        const anothertr = document.createElement('tr');
        tableBody.appendChild(anothertr);

        const anotherth = document.createElement('th');
        anotherth.textContent = n;
        anothertr.appendChild(anotherth);

        const lasttdOne = document.createElement('td');
        lasttdOne.textContent = PTStationValue;
        anothertr.appendChild(lasttdOne);

        form.reset();

        const alltds = document.querySelectorAll('td');
        const alltrs = document.querySelectorAll('tr');
        for (let j = 0; j <= alltrs.length; j++) {

            const tdTwo = document.createElement('td');
            alltrs[j + 2].appendChild(tdTwo);
            tdTwo.textContent = (alltds[j + 1].textContent - alltds[j].textContent);


            const tdThree = document.createElement('td');
            tdThree.classList.add('tdThree');
            alltrs[j + 2].appendChild(tdThree);
            let x = Math.round(tdTwo.textContent);
            tdThree.textContent = parseFloat((180 * x) / (2 * Math.PI * Math.round(radiusValue))).toFixed(3);

            const alltdThree = document.querySelectorAll('.tdThree');
            if (alltdThree.length == (alltrs.length - 2)) {

                const sum = document.querySelector('#sum');
                sum.innerHTML = "<b>Summation of θi:</b>" + " " + parseFloat((alltrs.length - 4) * parseFloat(alltdThree[1].textContent) + parseFloat(alltdThree[0].textContent) + parseFloat(alltdThree[alltrs.length - 3].textContent)).toFixed(1) + " degrees" + "<br>{Note: Summation of θi should be half of Deflection Angle (Δ)}";
            }

            if (j == 0) {
                const tdFour = document.createElement('td');
                tdFour.classList.add('tdFour');
                alltrs[2].appendChild(tdFour);
                tdFour.textContent = alltdThree[0].textContent;
            }else if(j <= alltrs.length){

                const alltdFour = document.querySelectorAll('.tdFour');
                
                const tdFour = document.createElement('td');
                tdFour.classList.add('tdFour');
                alltrs[j+2].appendChild(tdFour); 
                tdFour.textContent = parseFloat(parseFloat(alltdFour[j-1].textContent) + parseFloat(alltdThree[j].textContent)).toFixed(3); 
            }
        }

    }


});
