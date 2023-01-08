

// hw
// {
//     "Predicted_Power_HW_MW": 45.758354541
// }
// HD
// {
//     "Predicted_Power_HD_MW": 46.191585721,
//     "Predicted_Fuel_Gas_HD_MMSCFD": 5.4287902582
// }


var UT4_Crude_Oil_MBD = document.getElementById("UT4_Crude_Oil_MBD").value || 0 ;
var UT4_Gas_MMSCFD = document.getElementById("UT4_Gas_MMSCFD").value || 0 ;
var UT7_Crude_Oil_MBD = document.getElementById("UT7_Crude_Oil_MBD").value || 0 ;
var UT7_Gas_MMSCFD = document.getElementById("UT7_Gas_MMSCFD").value || 0 ;

var UT8_Crude_Oil_MBD = document.getElementById("UT8_Crude_Oil_MBD").value || 0 ;
var UT8_Gas_MMSCFD = document.getElementById("UT8_Gas_MMSCFD").value || 0 ;
var UT9_Crude_Oil_MBD = document.getElementById("UT9_Crude_Oil_MBD").value || 0 ;
var UT9_Gas_MMSCFD = document.getElementById("UT9_Gas_MMSCFD").value || 0 ;
var UT10_Crude_Oil_MBD = document.getElementById("UT10_Crude_Oil_MBD").value || 0 ;
var UT10_Gas_MMSCFD = document.getElementById("UT10_Gas_MMSCFD").value || 0 ;

var UT11_Crude_Oil_MBD = document.getElementById("UT11_Crude_Oil_MBD").value || 0 ;
var UT11_Gas_MMSCFD = document.getElementById("UT11_Gas_MMSCFD").value || 0 ;
var UT12_Crude_Oil_MBD = document.getElementById("UT12_Crude_Oil_MBD").value || 0 ;
var UT12_Gas_MMSCFD = document.getElementById("UT12_Gas_MMSCFD").value || 0 ;
var UT13_Crude_Oil_MBD = document.getElementById("UT13_Crude_Oil_MBD").value || 0 ;
var UT13_Gas_MMSCFD = document.getElementById("UT13_Gas_MMSCFD").value || 0 ;

// watercut

var P_UT4_Water_Cut = document.getElementById("P_UT4_Water_Cut").value || 0 ;
var P_UT8_Water_Cut = document.getElementById("UT8_Water_Cut_Ratio").value ||  0 ;
var P_UT9_Water_Cut = document.getElementById("UT9_Water_Cut_Ratio").value ||  0 ;
var P_UT10_Water_Cut = document.getElementById("UT10_Water_Cut_Ratio").value ||  0 ;
var P_UT11_Water_Cut = document.getElementById("UT11_Water_Cut_Ratio").value ||  0 ;
var P_UT12_Water_Cut = document.getElementById("UT12_Water_Cut_Ratio").value ||  0 ;
var P_UT13_Water_Cut = document.getElementById("UT13_Water_Cut_Ratio").value ||  0 ;

var P_HD1_Power_Demand_MW = 0
var P_HD2_Power_Demand_MW = 0
var P_HD3_Power_Demand_MW = 0
var P_HD2_FG_MMSCFD = 0





document.getElementById("Calculate_Water_Cut_UT").addEventListener("click", function(){
calculateWatercut({id:"Calculate_Water_Cut_UT", isPowerCalc:false});
});

document.getElementById("Calculate_Power_Ut").addEventListener("click", function(){
calculatePower({id:"Calculate_Power_Ut"});
});

const printbtn = document.getElementById("printpdf");
printbtn.addEventListener("click", printPdf);

const loader = document.getElementById("loading");

// showing loading
function displayLoading() {
console.log("loader fn call")
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


var baseUrl = 'https://sasserver.demo.sas.com/SASJobExecution/';

async function calculateWatercut({id, isPowerCalc}) {
debugger;

if (
    UT4_Crude_Oil_MBD == 0 || UT4_Gas_MMSCFD == 0 || UT7_Crude_Oil_MBD == 0 || UT7_Gas_MMSCFD == 0 || 
    UT8_Crude_Oil_MBD == 0 || UT8_Gas_MMSCFD == 0 ||
    UT9_Crude_Oil_MBD == 0 || UT9_Gas_MMSCFD == 0 ||
    UT10_Crude_Oil_MBD == 0 || UT10_Gas_MMSCFD == 0 ||
    UT11_Crude_Oil_MBD == 0 || UT11_Gas_MMSCFD == 0 ||
    UT12_Crude_Oil_MBD == 0 || UT12_Gas_MMSCFD == 0 ||
    UT13_Crude_Oil_MBD == 0 || UT13_Gas_MMSCFD == 0
    ) { 
    alert("please enter data on all fields"); 
    return; 
} 

displayLoading();

var sas_job = '/jobDefinitions/definitions/0b915294-9263-4e89-9737-9be870aca1e5';

baseUrl = baseUrl.concat('?', '_job=', sas_job, '&', 'UT4_Crude_Oil_MBD=', UT4_Crude_Oil_MBD, '&', 
 'UT4_Gas_MMSCFD=', UT4_Gas_MMSCFD, '&', 'UT7_Crude_Oil_MBD=', UT7_Crude_Oil_MBD, '&' , 'UT7_Gas_MMSCFD=' ,UT7_Gas_MMSCFD 
 , '&',    'UT8_Crude_Oil_MBD=' ,UT8_Crude_Oil_MBD , '&', 'UT8_Gas_MMSCFD=' ,UT8_Gas_MMSCFD , '&',    'UT9_Crude_Oil_MBD=' ,UT9_Crude_Oil_MBD , '&', 'UT9_Gas_MMSCFD=' ,UT9_Gas_MMSCFD , '&','UT10_Crude_Oil_MBD=' ,UT10_Crude_Oil_MBD , '&', 'UT10_Gas_MMSCFD=' ,UT10_Gas_MMSCFD , '&','UT11_Crude_Oil_MBD=' ,UT11_Crude_Oil_MBD , '&', 'UT11_Gas_MMSCFD=' ,UT11_Gas_MMSCFD , '&','UT12_Crude_Oil_MBD=' ,UT12_Crude_Oil_MBD , '&', 'UT12_Gas_MMSCFD=' ,UT12_Gas_MMSCFD , '&','UT13_Crude_Oil_MBD=' ,UT13_Crude_Oil_MBD , '&', 'UT13_Gas_MMSCFD=' ,UT13_Gas_MMSCFD );

 console.log("water url", baseUrl)

let response = await fetch(baseUrl);
if (response.ok) {

    let service_response = await response.json();
  
  if(isPowerCalc) {
    return service_response //... response will be used to calculate power
    console.log("water service_response", service_response);
  }
  
    document.getElementById("P_UT4_Water_Cut").value = getPositiveValue(service_response.P_UT4_Water_Cut);
    document.getElementById("UT7_Water_Cut_Ratio").value = getPositiveValue(service_response.P_UT7_Water_Cut);
    document.getElementById("UT8_Water_Cut_Ratio").value = getPositiveValue(service_response.P_UT9_Water_Cut);
    document.getElementById("UT9_Water_Cut_Ratio").value = getPositiveValue(service_response.P_UT10_Water_Cut);
    document.getElementById("UT10_Water_Cut_Ratio").value = getPositiveValue(service_response.P_UT11_Water_Cut);
    document.getElementById("UT11_Water_Cut_Ratio").value = getPositiveValue(service_response.P_UT12_Water_Cut);
    document.getElementById("UT12_Water_Cut_Ratio").value = getPositiveValue(service_response.P_UT12_Water_Cut);
    document.getElementById("UT13_Water_Cut_Ratio").value = getPositiveValue(service_response.P_UT13_Water_Cut);

} else {
    alert("HTTP-Error: " + response.status);
}

hideLoading();
}
async function calculatePower() {
try {

displayLoading();
// for testing
let watercutResponse =  await calculateWatercut(true);

var {
P_UT4_Injected_Water_MBD = 0,
P_UT8_Injected_Water_MBD = 0,    
P_UT9_Injected_Water_MBD = 0,    
P_UT10_Injected_Water_MBD = 0,    
P_UT11_Injected_Water_MBD = 0,    
P_UT12_Injected_Water_MBD = 0,    
P_UT13_Injected_Water_MBD = 0,    
} = watercutResponse

// take value from input, else from water cut response
P_UT4_Water_Cut = document.getElementById("P_UT4_Water_Cut").value || watercutResponse?.P_UT4_Water_Cut || 0 ;
P_UT8_Water_Cut = document.getElementById("UT8_Water_Cut_Ratio").value || watercutResponse?.P_UT8_Water_Cut || 0 ;
P_UT9_Water_Cut = document.getElementById("UT9_Water_Cut_Ratio").value || watercutResponse?.P_UT9_Water_Cut || 0 ;
P_UT10_Water_Cut = document.getElementById("UT10_Water_Cut_Ratio").value || watercutResponse?.P_UT10_Water_Cut || 0 ;
P_UT11_Water_Cut = document.getElementById("UT11_Water_Cut_Ratio").value || watercutResponse?.P_UT11_Water_Cut || 0 ;
P_UT12_Water_Cut = document.getElementById("UT12_Water_Cut_Ratio").value || watercutResponse?.P_UT12_Water_Cut || 0 ;
P_UT13_Water_Cut = document.getElementById("UT13_Water_Cut_Ratio").value || watercutResponse?.P_UT13_Water_Cut || 0 ;

var sas_job = '/jobDefinitions/definitions/c36b3dd0-cec5-416a-93b3-06068e3db249';


baseUrl =     baseUrl = baseUrl.concat('?', '_job=', sas_job, '&', 'UT4_Crude_Oil_MBD=', UT4_Crude_Oil_MBD, '&', 
 'UT4_Gas_MMSCFD=', UT4_Gas_MMSCFD, '&', 'UT7_Crude_Oil_MBD=', UT7_Crude_Oil_MBD, '&' , 'UT7_Gas_MMSCFD=' ,UT7_Gas_MMSCFD 
 , '&',    'UT8_Crude_Oil_MBD=' ,UT8_Crude_Oil_MBD , '&', 'UT8_Gas_MMSCFD=' ,UT8_Gas_MMSCFD , '&',    'UT9_Crude_Oil_MBD=' ,UT9_Crude_Oil_MBD , '&', 'UT9_Gas_MMSCFD=' ,UT9_Gas_MMSCFD , '&','UT10_Crude_Oil_MBD=' ,UT10_Crude_Oil_MBD , '&', 'UT10_Gas_MMSCFD=' ,UT10_Gas_MMSCFD , '&','UT11_Crude_Oil_MBD=' ,UT11_Crude_Oil_MBD , '&', 'UT11_Gas_MMSCFD=' ,UT11_Gas_MMSCFD , '&','UT12_Crude_Oil_MBD=' ,UT12_Crude_Oil_MBD , '&', 'UT12_Gas_MMSCFD=' ,UT12_Gas_MMSCFD , '&','UT13_Crude_Oil_MBD=' ,UT13_Crude_Oil_MBD , 
 '&', 'UT13_Gas_MMSCFD=' ,UT13_Gas_MMSCFD ,
   '&', 'P_UT4_Injected_Water_MBD=', P_UT4_Injected_Water_MBD,
   '&', 'P_UT4_Water_Cut=', P_UT4_Water_Cut,
   '&', 'P_UT8_Injected_Water_MBD=', P_UT8_Injected_Water_MBD,
   '&', 'P_UT8_Water_Cut=', P_UT8_Water_Cut,
   '&', 'P_UT9_Injected_Water_MBD=', P_UT9_Injected_Water_MBD,
   '&', 'P_UT9_Water_Cut=', P_UT9_Water_Cut,
   '&', 'P_UT10_Injected_Water_MBD=', P_UT10_Injected_Water_MBD,
   '&', 'P_UT10_Water_Cut=', P_UT10_Water_Cut,
   '&', 'P_UT11_Injected_Water_MBD=', P_UT11_Injected_Water_MBD,
   '&', 'P_UT11_Water_Cut=', P_UT11_Water_Cut,
   '&', 'P_UT12_Injected_Water_MBD=', P_UT12_Injected_Water_MBD,
   '&', 'P_UT12_Water_Cut=', P_UT12_Water_Cut,
   '&', 'P_UT13_Injected_Water_MBD=', P_UT13_Injected_Water_MBD,
   '&', 'P_UT13_Water_Cut=', P_UT13_Water_Cut
 );

 console.log("power url", baseUrl)

let response = await fetch(baseUrl);
if (response.ok) {
    let service_response = await response.json();
    console.log("calc power service_response", service_response);
    document.getElementById("Predicted_Power_Ut_MW").value = getPositiveValue(service_response.Predicted_Power_UT_MW);

} else {
    alert("HTTP-Error: " + response.status);
}

hideLoading();

} catch (error) {
    alert("Failed to calculate power")
}
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

function calculateKpi(){
//   validate empty fields

let PwrConversionFactor = document.getElementById("Power_Conversion_Factor")?.value || 0
let PwrImportEfficiency = document.getElementById("powerImpEff")?.value || 0

let crudSumList = [
"HD1_Crude_Oil_MBD" ,
"HD2_Crude_Oil_MBD" ,
"HD3_Crude_Oil_MBD" ,
"HW2_Crude_Oil_MBD" , 
"HW3_Crude_Oil_MBD" , 
"HW4_Crude_Oil_MBD" , 
"UT4_Crude_Oil_MBD" , 
"UT7_Crude_Oil_MBD" , 
"UT8_Crude_Oil_MBD" , 
"UT9_Crude_Oil_MBD" , 
"UT10_Crude_Oil_MBD" , 
"UT11_Crude_Oil_MBD" , 
"UT12_Crude_Oil_MBD" , 
"UT13_Crude_Oil_MBD"
]
let gasSumList = [
"HD1_Gas_MMSCFD", "HD2_Gas_MMSCFD", "HD3_Gas_MMSCFD", "HW2_Gas_MMSCFD", "HW3_Gas_MMSCFD", "HW4_Gas_MMSCFD", "UT4_Gas_MMSCFD", "UT7_Gas_MMSCFD", "UT8_Gas_MMSCFD", "UT9_Gas_MMSCFD", "UT10_Gas_MMSCFD", "UT11_Gas_MMSCFD", "UT12_Gas_MMSCFD", "UT13_Gas_MMSCFD"];

let crudSum = 0
let isValid = true
crudSumList?.forEach(id=> {
let el = document.getElementById(id)
if(!el)
console.log("el not found for: ", id)
let value = el?.value || 0;
!value && (isValid = false)
crudSum += value
} )
// if(!isValid) 
// return alert("Please fill all fields for crud oil")

let gasSum = 0
gasSumList?.forEach(id=> {
let el = document.getElementById(id)
if(!el)
console.log("el not found for: ", id)
let value = el?.value || 0;
!value && (isValid = false)
gasSum += value
} )

// if(!isValid) 
// return alert("Please fill all fields for Gas")

// if(!P_HD2_FG_MMSCFD)
// return alert("Please calculate Predicted Fuel Gas HD (MMSCFD)");

let totalProd = crudSum + gasSum * 1700  / 5800 + P_HD2_FG_MMSCFD * 1080 /  5800 ;

let totalEnergy = (P_UT4_Power_Demand_MW + P_UT7_Power_Demand_MW + P_UT8_Power_Demand_MW + P_UT9_Power_Demand_MW + P_UT10_Power_Demand_MW + P_UT11_Power_Demand_MW + P_UT12_Power_Demand_MW + P_UT13_Power_Demand_MW + P_HW2_Power_Demand_MW + P_HW3_Power_Demand_MW + P_HW4_Power_Demand_MW + P_HD1_Power_Demand_MW + P_HD2_Power_Demand_MW + P_HD3_Power_Demand_MW) * PwrConversionFactor / PwrImportEfficiency + P_HD2_FG_MMSCFD * 1080 /  5800;

let energyIntensity = totalEnergy / totalProd * 24;

document.getElementById("EIN").value = energyIntensity || 0
}

// _________________________SGPD HW Calc_________________

// UT4_Crude_Oil_MBD.addEventListener("input", function (e) { if (!UT4_Crude_Oil_MBD.checkValidity()) { UT4_Crude_Oil_MBD.value = ""; } });
// UT4_Gas_MMSCFD.addEventListener("input", function (e) { if (!UT4_Gas_MMSCFD.checkValidity()) { UT4_Gas_MMSCFD.value = ""; } });
// UT4_Water_Cut_Ratio.addEventListener("input", function (e) { if (!UT4_Water_Cut_Ratio.checkValidity()) { UT4_Water_Cut_Ratio.value = ""; } });
// UT7_Crude_Oil_MBD.addEventListener("input", function (e) { if (!UT7_Crude_Oil_MBD.checkValidity()) { UT7_Crude_Oil_MBD.value = ""; } });
// UT7_Gas_MMSCFD.addEventListener("input", function (e) { if (!UT7_Gas_MMSCFD.checkValidity()) { UT7_Gas_MMSCFD.value = ""; } });
// UT7_Water_Cut_Ratio.addEventListener("input", function (e) { if (!UT7_Water_Cut_Ratio.checkValidity()) { UT7_Water_Cut_Ratio.value = ""; } });

// const UT4_Crude_Oil_MBD = document.getElementById("UT4_Crude_Oil_MBD");
// const UT4_Gas_MMSCFD = document.getElementById("UT4_Gas_MMSCFD");
// const UT4_Water_Cut_Ratio = document.getElementById("P_UT4_Water_Cut");
// const UT7_Crude_Oil_MBD = document.getElementById("UT7_Crude_Oil_MBD");
// const UT8_Crude_Oil_MBD = document.getElementById("UT8_Crude_Oil_MBD");
// const UT9_Crude_Oil_MBD = document.getElementById("UT9_Crude_Oil_MBD");
// const UT10_Crude_Oil_MBD = document.getElementById("UT10_Crude_Oil_MBD");
// const UT11_Crude_Oil_MBD = document.getElementById("UT11_Crude_Oil_MBD");
// const UT12_Crude_Oil_MBD = document.getElementById("UT12_Crude_Oil_MBD");
// const UT13_Crude_Oil_MBD = document.getElementById("UT13_Crude_Oil_MBD");
// const UT7_Gas_MMSCFD = document.getElementById("UT7_Gas_MMSCFD");
// const UT8_Gas_MMSCFD = document.getElementById("UT8_Gas_MMSCFD");
// const UT9_Gas_MMSCFD = document.getElementById("UT9_Gas_MMSCFD");
// const UT10_Gas_MMSCFD = document.getElementById("UT10_Gas_MMSCFD");
// const UT11_Gas_MMSCFD = document.getElementById("UT11_Gas_MMSCFD");
// const UT12_Gas_MMSCFD = document.getElementById("UT12_Gas_MMSCFD");
// const UT13_Gas_MMSCFD = document.getElementById("UT13_Gas_MMSCFD");
// const UT7_Water_Cut_Ratio = document.getElementById("UT7_Water_Cut_Ratio");
// const UT8_Water_Cut_Ratio = document.getElementById("UT8_Water_Cut_Ratio");
// const UT9_Water_Cut_Ratio = document.getElementById("UT9_Water_Cut_Ratio");
// const UT10_Water_Cut_Ratio = document.getElementById("UT10_Water_Cut_Ratio");
// const UT11_Water_Cut_Ratio = document.getElementById("UT811Water_Cut_Ratio");
// const UT12_Water_Cut_Ratio = document.getElementById("UT8_12ater_Cut_Ratio");
// const UT13_Water_Cut_Ratio = document.getElementById("UT8_W13ter_Cut_Ratio");

// tabs js

// function handleTabs() {
                    var currentTab = 2; // Current tab is set to be the first tab (0)
                    showTab(currentTab); // Display the current tab
                    console.log("handleTabs")
                    
                    function showTab(n) {
                            // This function will display the specified tab of the form...
                            var x = document.getElementsByClassName("tab");
                    x[n].style.display = "block";
                    //... and fix the Previous/Next buttons:
                    if (n == 0) {
                            document.getElementById("prevBtn").style.display = "none";
                    } else {
                            document.getElementById("prevBtn").style.display = "inline";
                    }
                    if (n == (x.length - 1)) {
                            document.getElementById("nextBtn").style.display = "none";
                    } else {
                            document.getElementById("nextBtn").style.display = "inline";
                    }
                    //... and run a function that will display the correct step indicator:
                    fixStepIndicator(n)
            }

            function nextPrev(n) {
                    // This function will figure out which tab to display
                    var x = document.getElementsByClassName("tab");
                    // Hide the current tab:
                    x[currentTab].style.display = "none";
                    // Increase or decrease the current tab by 1:
                    currentTab = currentTab + n;
                    // Otherwise, display the correct tab:
                    showTab(currentTab);
            }

            function fixStepIndicator(n) {
                    // This function removes the "active" class of all steps...
                    var i, x = document.getElementsByClassName("step");
                    for (i = 0; i < x.length; i++) {
                            x[i].className = x[i].className.replace(" active", "");
                    }
                    //... and adds the "active" class on the current step:
                    x[n].className += " active";
            }
