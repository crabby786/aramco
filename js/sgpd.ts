const UT4_Crude_Oil = document.getElementById("UT4_Crude_Oil");
const UT4_Gas = document.getElementById("UT4_Gas");
const UT4_Water_Cut_Ratio = document.getElementById("UT4_Water_Cut_Ratio");
const UT7_Crude_Oil = document.getElementById("UT7_Crude_Oil");
const UT8_Crude_Oil = document.getElementById("UT8_Crude_Oil");
const UT9_Crude_Oil = document.getElementById("UT9_Crude_Oil");
const UT10_Crude_Oil = document.getElementById("UT10_Crude_Oil");
const UT11_Crude_Oil = document.getElementById("UT11_Crude_Oil");
const UT12_Crude_Oil = document.getElementById("UT12_Crude_Oil");
const UT13_Crude_Oil = document.getElementById("UT13_Crude_Oil");
const UT7_Gas = document.getElementById("UT7_Gas");
const UT8_Gas = document.getElementById("UT8_Gas");
const UT9_Gas = document.getElementById("UT9_Gas");
const UT10_Gas = document.getElementById("UT10_Gas");
const UT11_Gas = document.getElementById("UT11_Gas");
const UT12_Gas = document.getElementById("UT12_Gas");
const UT13_Gas = document.getElementById("UT13_Gas");
const UT7_Water_Cut_Ratio = document.getElementById("UT7_Water_Cut_Ratio");
const UT8_Water_Cut_Ratio = document.getElementById("UT8_Water_Cut_Ratio");
const UT9_Water_Cut_Ratio = document.getElementById("UT9_Water_Cut_Ratio");
const UT10_Water_Cut_Ratio = document.getElementById("UT10_Water_Cut_Ratio");
const UT11_Water_Cut_Ratio = document.getElementById("UT811Water_Cut_Ratio");
const UT12_Water_Cut_Ratio = document.getElementById("UT8_12ater_Cut_Ratio");
const UT13_Water_Cut_Ratio = document.getElementById("UT8_W13ter_Cut_Ratio");

UT4_Crude_Oil.addEventListener("input", function (e) { if (!UT4_Crude_Oil.checkValidity()) { UT4_Crude_Oil.value = ""; } });
UT4_Gas.addEventListener("input", function (e) { if (!UT4_Gas.checkValidity()) { UT4_Gas.value = ""; } });
UT4_Water_Cut_Ratio.addEventListener("input", function (e) { if (!UT4_Water_Cut_Ratio.checkValidity()) { UT4_Water_Cut_Ratio.value = ""; } });
UT7_Crude_Oil.addEventListener("input", function (e) { if (!UT7_Crude_Oil.checkValidity()) { UT7_Crude_Oil.value = ""; } });
UT7_Gas.addEventListener("input", function (e) { if (!UT7_Gas.checkValidity()) { UT7_Gas.value = ""; } });
UT7_Water_Cut_Ratio.addEventListener("input", function (e) { if (!UT7_Water_Cut_Ratio.checkValidity()) { UT7_Water_Cut_Ratio.value = ""; } });

const calcbtn = document.getElementById("calculation");
calcbtn.addEventListener("click", calculateWatercut);


const printbtn = document.getElementById("printpdf");
printbtn.addEventListener("click", printPdf);

const loader = document.getElementById("loading");

// showing loading
function displayLoading() {
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 10000);
}

function hideLoading() {
    loader.classList.remove("display");
}

// document.onreadystatechange = function () {
//     var state = document.readyState
//     if (state == 'complete') {
//         setTimeout(function () {
//             document.getElementById('load').style.visibility = "hidden";
//         }, 2000);
//     }
// }


async function calculateWatercut() {

    var UT4_Crude_Oil = document.getElementById("UT4_Crude_Oil").value || 0;
    var UT4_Gas = document.getElementById("UT4_Gas").value || 0;
    var UT4_Water_Cut_Ratio = document.getElementById("UT4_Water_Cut_Ratio").value || 0;
    var UT7_Crude_Oil = document.getElementById("UT7_Crude_Oil").value || 0;
    var UT7_Gas = document.getElementById("UT7_Gas").value || 0;
    var UT7_Water_Cut_Ratio = document.getElementById("UT7_Water_Cut_Ratio").value || 0;
	// var powerImpEff = document.getElementById("powerImpEff").value || 0;

    if (UT4_Crude_Oil == 0 || UT4_Gas == 0 || UT4_Water_Cut_Ratio == 0 || UT7_Crude_Oil == 0 || UT7_Gas == 0 || UT7_Water_Cut_Ratio == 0) {
        alert("please enter data on all fields");
        return;
    }

    displayLoading();


    var url = 'https://cs-action.aramco.com/SASJobExecution/';
    
    var sas_job = '/jobDefinitions/definitions/0b915294-9263-4e89-9737-9be870aca1e5';

    url = url.concat('?', '_job=', sas_job, '&', 'UT4_Crude_Oil_MBD=', UT4_Crude_Oil, '&', 
     'UT4_Gas_MMSCFD=', UT4_Gas, '&', 'UT7_Crude_Oil_MBD=', UT7_Crude_Oil, '&' , 'UT7_Gas_MMSCFD=' ,UT7_Gas 
     , '&',    'UT8_Crude_Oil_MBD=' ,UT8_Crude_Oil , '&', 'UT8_Gas_MMSCFD=' ,UT8_Gas , '&',    'UT9_Crude_Oil_MBD=' ,UT9_Crude_Oil , '&', 'UT9_Gas_MMSCFD=' ,UT9_Gas , '&','UT10_Crude_Oil_MBD=' ,UT10_Crude_Oil , '&', 'UT10_Gas_MMSCFD=' ,UT10_Gas , '&','UT11_Crude_Oil_MBD=' ,UT11_Crude_Oil , '&', 'UT11_Gas_MMSCFD=' ,UT11_Gas , '&','UT12_Crude_Oil_MBD=' ,UT12_Crude_Oil , '&', 'UT12_Gas_MMSCFD=' ,UT12_Gas , '&','UT13_Crude_Oil_MBD=' ,UT13_Crude_Oil , '&', 'UT13_Gas_MMSCFD=' ,UT13_Gas );

    let response = await fetch(url);
    if (response.ok) {
        let service_response = await response.json();
        //console.log(service_response);
        document.getElementById("Cogen_Stm_Prod_MLB_H").value = getPositiveValue(service_response.P_Cogen_Stm_Prod_MLB_H);
        document.getElementById("EII_KPI").value = getPositiveValue(service_response.EII_KPI);
        document.getElementById("EnergyProd_MBOE").value = getPositiveValue(service_response.EnergyProd_MBOE);
        document.getElementById("Energy_Consumption_MMBTUH").value = getPositiveValue(service_response.Energy_Consumption_MMBTUH);
        //document.getElementById("FG_Excl_Boilers_MMSCFD").value = getPositiveValue(service_response.FG_Excl_Boilers_MMSCFD);
        //document.getElementById("FG_for_Boilers_MMSCFD").value = getPositiveValue(service_response.FG_for_Boilers_MMSCFD);
        //document.getElementById("FG_for_Coeg_MMSCFD").value = getPositiveValue(service_response.FG_for_Coeg_MMSCFD);
        document.getElementById("Export_Power_MMBTUH").value = getPositiveValue(service_response.Export_Power_MMBTUH);
        document.getElementById("P_BoilerSteamV4_MLB_H").value = getPositiveValue(service_response.P_BoilerSteamV4_MLB_H);
        document.getElementById("Power_Demand_MW").value = getPositiveValue(service_response.Power_Demand_MW);
        document.getElementById("Steam_Demand_MLB_H").value = getPositiveValue(service_response.P_Steam_Demand_MLB_H);
        document.getElementById("Tot_SRU_Stm_Prod_MLB_H").value = getPositiveValue(service_response.P_Tot_SRU_Stm_Prod_MLB_H);
        document.getElementById("TotalPlantFG").value = getPositiveValue(service_response.TotalPlantFG);
        
        //document.getElementById("EM_SC1").value = getPositiveValue(service_response.TotalPlantFG);
        document.getElementById("EM_SC2").value = getPositiveValue(service_response.EM_SC2);
        //document.getElementById("EM_TOT").value = getPositiveValue(service_response.TotalPlantFG);

    } else {
        alert("HTTP-Error: " + response.status);
    }

    hideLoading();
}

function getPositiveValue(value) {
    if (value < 0) {
        return 0;
    }
    return value;
}

function printPdf() {
    window.print();
}