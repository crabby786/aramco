const calcWaterUtBtn = document.getElementById("Calculate_Water_Cut_UT");
calcWaterUtBtn.addEventListener("click", function () {
  calculateWatercut({ id: "Calculate_Water_Cut_UT", isPowerCalc: false });
});
const calcPowerUtBtn = document.getElementById("Calculate_Power_Ut");
calcPowerUtBtn.addEventListener("click", function () {
  calculatePower({ id: "Calculate_Power_Ut" });
});

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

var baseUrl = "https://sasserver.demo.sas.com/SASJobExecution/";

var powerResponses = {
  P_UT4_Power_Demand_MW: 0,
  P_UT7_Power_Demand_MW: 0,
  P_UT8_Power_Demand_MW: 0,
  P_UT9_Power_Demand_MW: 0,
  P_UT10_Power_Demand_MW: 0,
  P_UT11_Power_Demand_MW: 0,
  P_UT12_Power_Demand_MW: 0,
  P_UT13_Power_Demand_MW: 0,
  P_HW2_Power_Demand_MW: 0,
  P_HW3_Power_Demand_MW: 0,
  P_HW4_Power_Demand_MW: 0,
  P_HD1_Power_Demand_MW: 0,
  P_HD2_Power_Demand_MW: 0,
  P_HD3_Power_Demand_MW: 0,
  P_HD2_FG_MMSCFD: 0
};

async function calculateWatercut({ id, isPowerCalc }) {
  var UT4_Crude_Oil = document.getElementById("UT4_Crude_Oil_MBD").value || 0;
  var UT4_Gas_MMSCFD = document.getElementById("UT4_Gas_MMSCFD").value || 0;
  var UT7_Crude_Oil = document.getElementById("UT7_Crude_Oil_MBD").value || 0;
  var UT7_Gas_MMSCFD = document.getElementById("UT7_Gas_MMSCFD").value || 0;

  var UT8_Crude_Oil = document.getElementById("UT8_Crude_Oil_MBD").value || 0;
  var UT8_Gas_MMSCFD = document.getElementById("UT8_Gas_MMSCFD").value || 0;
  var UT9_Crude_Oil = document.getElementById("UT9_Crude_Oil_MBD").value || 0;
  var UT9_Gas_MMSCFD = document.getElementById("UT9_Gas_MMSCFD").value || 0;
  var UT10_Crude_Oil = document.getElementById("UT10_Crude_Oil_MBD").value || 0;
  var UT10_Gas_MMSCFD = document.getElementById("UT10_Gas_MMSCFD").value || 0;

  var UT11_Crude_Oil = document.getElementById("UT11_Crude_Oil_MBD").value || 0;
  var UT11_Gas_MMSCFD = document.getElementById("UT11_Gas_MMSCFD").value || 0;
  var UT12_Crude_Oil = document.getElementById("UT12_Crude_Oil_MBD").value || 0;
  var UT12_Gas_MMSCFD = document.getElementById("UT12_Gas_MMSCFD").value || 0;
  var UT13_Crude_Oil = document.getElementById("UT13_Crude_Oil_MBD").value || 0;
  var UT13_Gas_MMSCFD = document.getElementById("UT13_Gas_MMSCFD").value || 0;

  if (
    UT4_Crude_Oil == 0 ||
    UT4_Gas_MMSCFD == 0 ||
    UT7_Crude_Oil == 0 ||
    UT7_Gas_MMSCFD == 0 ||
    UT8_Crude_Oil == 0 ||
    UT8_Gas_MMSCFD == 0 ||
    UT9_Crude_Oil == 0 ||
    UT9_Gas_MMSCFD == 0 ||
    UT10_Crude_Oil == 0 ||
    UT10_Gas_MMSCFD == 0 ||
    UT11_Crude_Oil == 0 ||
    UT11_Gas_MMSCFD == 0 ||
    UT12_Crude_Oil == 0 ||
    UT12_Gas_MMSCFD == 0 ||
    UT13_Crude_Oil == 0 ||
    UT13_Gas_MMSCFD == 0
  ) {
    alert("please enter data on all fields");
    return;
  }

  displayLoading();

  var sas_job =
    "/jobDefinitions/definitions/0b915294-9263-4e89-9737-9be870aca1e5";

  let watercutUrl = baseUrl.concat(
    "?",
    "_job=",
    sas_job,
    "&",
    "UT4_Crude_Oil_MBD=",
    UT4_Crude_Oil,
    "&",
    "UT4_Gas_MMSCFD=",
    UT4_Gas_MMSCFD,
    "&",
    "UT7_Crude_Oil_MBD=",
    UT7_Crude_Oil,
    "&",
    "UT7_Gas_MMSCFD=",
    UT7_Gas_MMSCFD,
    "&",
    "UT8_Crude_Oil_MBD=",
    UT8_Crude_Oil,
    "&",
    "UT8_Gas_MMSCFD=",
    UT8_Gas_MMSCFD,
    "&",
    "UT9_Crude_Oil_MBD=",
    UT9_Crude_Oil,
    "&",
    "UT9_Gas_MMSCFD=",
    UT9_Gas_MMSCFD,
    "&",
    "UT10_Crude_Oil_MBD=",
    UT10_Crude_Oil,
    "&",
    "UT10_Gas_MMSCFD=",
    UT10_Gas_MMSCFD,
    "&",
    "UT11_Crude_Oil_MBD=",
    UT11_Crude_Oil,
    "&",
    "UT11_Gas_MMSCFD=",
    UT11_Gas_MMSCFD,
    "&",
    "UT12_Crude_Oil_MBD=",
    UT12_Crude_Oil,
    "&",
    "UT12_Gas_MMSCFD=",
    UT12_Gas_MMSCFD,
    "&",
    "UT13_Crude_Oil_MBD=",
    UT13_Crude_Oil,
    "&",
    "UT13_Gas_MMSCFD=",
    UT13_Gas_MMSCFD
  );

  console.log("water url", watercutUrl);

  let response = await fetch(watercutUrl);
  if (response.ok) {
    let service_response = await response.json();

    console.log("water service_response", service_response);
    if (isPowerCalc) {
      return service_response; //... response will be used to calculate power
    }

    document.getElementById("P_UT4_Water_Cut").value = getPositiveValue(
      service_response.P_UT4_Water_Cut
    );
    document.getElementById("UT7_Water_Cut_Ratio").value = getPositiveValue(
      service_response.P_UT7_Water_Cut
    );
    document.getElementById("UT8_Water_Cut_Ratio").value = getPositiveValue(
      service_response.P_UT9_Water_Cut
    );
    document.getElementById("UT9_Water_Cut_Ratio").value = getPositiveValue(
      service_response.P_UT10_Water_Cut
    );
    document.getElementById("UT10_Water_Cut_Ratio").value = getPositiveValue(
      service_response.P_UT11_Water_Cut
    );
    document.getElementById("UT11_Water_Cut_Ratio").value = getPositiveValue(
      service_response.P_UT12_Water_Cut
    );
    document.getElementById("UT12_Water_Cut_Ratio").value = getPositiveValue(
      service_response.P_UT12_Water_Cut
    );
    document.getElementById("UT13_Water_Cut_Ratio").value = getPositiveValue(
      service_response.P_UT13_Water_Cut
    );
  } else {
    alert("HTTP-Error: " + response.status);
  }

  hideLoading();
}
function updatePowerResponse(powerResponses) {
  for (let prop in powerResponses) {
    if (
      service_response?.hasOwnProperty(prop) &&
      powerResponses?.hasOwnProperty(prop)
    ) {
      powerResponses[property] = service_response[prop];
    }
  }
}
async function calculatePower() {
  try {
    var UT4_Crude_Oil = document.getElementById("UT4_Crude_Oil_MBD").value || 0;
    var UT4_Gas_MMSCFD = document.getElementById("UT4_Gas_MMSCFD").value || 0;
    var UT7_Crude_Oil = document.getElementById("UT7_Crude_Oil_MBD").value || 0;
    var UT7_Gas_MMSCFD = document.getElementById("UT7_Gas_MMSCFD").value || 0;

    var UT8_Crude_Oil = document.getElementById("UT8_Crude_Oil_MBD").value || 0;
    var UT8_Gas_MMSCFD = document.getElementById("UT8_Gas_MMSCFD").value || 0;
    var UT9_Crude_Oil = document.getElementById("UT9_Crude_Oil_MBD").value || 0;
    var UT9_Gas_MMSCFD = document.getElementById("UT9_Gas_MMSCFD").value || 0;
    var UT10_Crude_Oil =
      document.getElementById("UT10_Crude_Oil_MBD").value || 0;
    var UT10_Gas_MMSCFD = document.getElementById("UT10_Gas_MMSCFD").value || 0;

    var UT11_Crude_Oil =
      document.getElementById("UT11_Crude_Oil_MBD").value || 0;
    var UT11_Gas_MMSCFD = document.getElementById("UT11_Gas_MMSCFD").value || 0;
    var UT12_Crude_Oil =
      document.getElementById("UT12_Crude_Oil_MBD").value || 0;
    var UT12_Gas_MMSCFD = document.getElementById("UT12_Gas_MMSCFD").value || 0;
    var UT13_Crude_Oil =
      document.getElementById("UT13_Crude_Oil_MBD").value || 0;
    var UT13_Gas_MMSCFD = document.getElementById("UT13_Gas_MMSCFD").value || 0;

    displayLoading();
    // for testing
    let watercutResponse = await calculateWatercut({ isPowerCalc: true });

    var {
      P_UT4_Injected_Water_MBD = 0,
      P_UT8_Injected_Water_MBD = 0,
      P_UT9_Injected_Water_MBD = 0,
      P_UT10_Injected_Water_MBD = 0,
      P_UT11_Injected_Water_MBD = 0,
      P_UT12_Injected_Water_MBD = 0,
      P_UT13_Injected_Water_MBD = 0
    } = watercutResponse;

    // take value from input, else from water cut response
    var P_UT4_Water_Cut =
      document.getElementById("P_UT4_Water_Cut").value ||
      watercutResponse?.P_UT4_Water_Cut ||
      0;
    var P_UT8_Water_Cut =
      document.getElementById("UT8_Water_Cut_Ratio").value ||
      watercutResponse?.P_UT8_Water_Cut ||
      0;
    var P_UT9_Water_Cut =
      document.getElementById("UT9_Water_Cut_Ratio").value ||
      watercutResponse?.P_UT9_Water_Cut ||
      0;
    var P_UT10_Water_Cut =
      document.getElementById("UT10_Water_Cut_Ratio").value ||
      watercutResponse?.P_UT10_Water_Cut ||
      0;
    var P_UT11_Water_Cut =
      document.getElementById("UT11_Water_Cut_Ratio").value ||
      watercutResponse?.P_UT11_Water_Cut ||
      0;
    var P_UT12_Water_Cut =
      document.getElementById("UT12_Water_Cut_Ratio").value ||
      watercutResponse?.P_UT12_Water_Cut ||
      0;
    var P_UT13_Water_Cut =
      document.getElementById("UT13_Water_Cut_Ratio").value ||
      watercutResponse?.P_UT13_Water_Cut ||
      0;

    var sas_job =
      "/jobDefinitions/definitions/c36b3dd0-cec5-416a-93b3-06068e3db249";

    let powerUrl = baseUrl.concat(
      "?",
      "_job=",
      sas_job,
      "&",
      "UT4_Crude_Oil_MBD=",
      UT4_Crude_Oil,
      "&",
      "UT4_Gas_MMSCFD=",
      UT4_Gas_MMSCFD,
      "&",
      "UT7_Crude_Oil_MBD=",
      UT7_Crude_Oil,
      "&",
      "UT7_Gas_MMSCFD=",
      UT7_Gas_MMSCFD,
      "&",
      "UT8_Crude_Oil_MBD=",
      UT8_Crude_Oil,
      "&",
      "UT8_Gas_MMSCFD=",
      UT8_Gas_MMSCFD,
      "&",
      "UT9_Crude_Oil_MBD=",
      UT9_Crude_Oil,
      "&",
      "UT9_Gas_MMSCFD=",
      UT9_Gas_MMSCFD,
      "&",
      "UT10_Crude_Oil_MBD=",
      UT10_Crude_Oil,
      "&",
      "UT10_Gas_MMSCFD=",
      UT10_Gas_MMSCFD,
      "&",
      "UT11_Crude_Oil_MBD=",
      UT11_Crude_Oil,
      "&",
      "UT11_Gas_MMSCFD=",
      UT11_Gas_MMSCFD,
      "&",
      "UT12_Crude_Oil_MBD=",
      UT12_Crude_Oil,
      "&",
      "UT12_Gas_MMSCFD=",
      UT12_Gas_MMSCFD,
      "&",
      "UT13_Crude_Oil_MBD=",
      UT13_Crude_Oil,
      "&",
      "UT13_Gas_MMSCFD=",
      UT13_Gas_MMSCFD,
      "&",
      "P_UT4_Injected_Water_MBD=",
      P_UT4_Injected_Water_MBD,
      "&",
      "P_UT4_Water_Cut=",
      P_UT4_Water_Cut,
      "&",
      "P_UT8_Injected_Water_MBD=",
      P_UT8_Injected_Water_MBD,
      "&",
      "P_UT8_Water_Cut=",
      P_UT8_Water_Cut,
      "&",
      "P_UT9_Injected_Water_MBD=",
      P_UT9_Injected_Water_MBD,
      "&",
      "P_UT9_Water_Cut=",
      P_UT9_Water_Cut,
      "&",
      "P_UT10_Injected_Water_MBD=",
      P_UT10_Injected_Water_MBD,
      "&",
      "P_UT10_Water_Cut=",
      P_UT10_Water_Cut,
      "&",
      "P_UT11_Injected_Water_MBD=",
      P_UT11_Injected_Water_MBD,
      "&",
      "P_UT11_Water_Cut=",
      P_UT11_Water_Cut,
      "&",
      "P_UT12_Injected_Water_MBD=",
      P_UT12_Injected_Water_MBD,
      "&",
      "P_UT12_Water_Cut=",
      P_UT12_Water_Cut,
      "&",
      "P_UT13_Injected_Water_MBD=",
      P_UT13_Injected_Water_MBD,
      "&",
      "P_UT13_Water_Cut=",
      P_UT13_Water_Cut
    );

    console.log("power url", powerUrl);

    let response = await fetch(powerUrl);
    if (response.ok) {
      let service_response = await response.json();
      console.log("calc power service_response", service_response);
      document.getElementById("Predicted_Power_Ut_MW").value = getPositiveValue(
        service_response.Predicted_Power_UT_MW
      );
      updatePowerResponse(service_response);
    } else {
      alert("HTTP-Error: " + response.status);
    }

    hideLoading();
  } catch (error) {
    alert("Failed to calculate power");
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

let watercutJob_UT = "0b915294-9263-4e89-9737-9be870aca1e5";
let calcPowerJob_UT = "c36b3dd0-cec5-416a-93b3-06068e3db249";
let watercutJob_HW = "2a4bb92a-acf0-4050-8013-1551c0bd3a16";
let calcPowerJob_HW = "f1520bd1-ae22-4534-96b1-9edfd7d3c937";
let watercutJob_HD = "557c11c1-e71d-4d56-ad6a-08f5c7cfd77c";
let calcPowerJob_HD = "743d217b-d54a-47d5-9cb5-be72b3de4dfa";

function getJobId(dashboardId) {
  let powerJobId = "";
  let watercutJobId = "";
  switch (dashboardId) {
    case "sgpd-hw-table":
      powerJobId = calcPowerJob_HW;
      watercutJobId = watercutJob_HW;
      break;
    case "sgpd-hd-table":
      powerJobId = calcPowerJob_HD;
      watercutJobId = watercutJob_HD;
      break;
    default:
      break;
  }
  return { powerJobId, watercutJobId };
}
function setValues(dashboardId, resp) {
  switch (dashboardId) {
    case "sgpd-hw-table":
      document.getElementById("Predicted_Power_HW").value = getPositiveValue(
        resp.Predicted_Power_HW_MW
      );
      updatePowerResponse(resp);
      break;
    case "sgpd-hd-table":
      document.getElementById("Predicted_Power_HD").value = getPositiveValue(
        resp.Predicted_Power_HD_MW
      );
      document.getElementById(
        "Predicted_Fuel_Gas_HD_MMSCFD"
      ).value = getPositiveValue(resp.Predicted_Fuel_Gas_HD_MMSCFD);
      updatePowerResponse(resp);
      break;
    default:
      break;
  }
}

async function calWaterHw({ id, isCalPowerHw }) {
  let jobId = getJobId(id)?.watercutJobId;

  var sas_job = baseUrl + `?_job=/jobDefinitions/definitions/${jobId}`;
  let calcWaterUrl = "";
  let targetDashboard = document.getElementById(id);
  let gasOilFields = targetDashboard.querySelectorAll("input.gasF, input.coF");
  let gasOilArray = Array.from(gasOilFields);
  if (gasOilArray?.length) {
    let isValidInput = gasOilArray.every((item) =>
      item?.value ? true : false
    );
    if (!isValidInput) {
      alert("Please fill all fields");
      return;
    }

    gasOilArray.forEach((item, i, arr) => {
      let value = item?.value;
      let isLast = i == arr?.length - 1;
      calcWaterUrl += item?.id + "=" + value + (isLast ? "" : "&");
    });
    console.log("calcWaterUrl", calcWaterUrl);
    displayLoading();
    let response = await fetch(sas_job + "&" + calcWaterUrl);
    if (response.ok) {
      let service_response = await response.json();
      console.log("calcWaterResp", service_response);
      // if(!service_response) {
      //   alert("Failed to get response , Please try again later")
      // }
      let service_response_for_calc_power = { ...service_response };
      let calcPowerUrl = calcWaterUrl;

      let watercutFields = targetDashboard.querySelectorAll("input.watF");
      let watercutArray = Array.from(watercutFields);
      watercutArray.forEach((item, i, arr) => {
        let value = item?.value;
        if (item) {
          value && (service_response_for_calc_power[item?.id] = value);
          if (!isCalPowerHw) item.value = service_response[item?.id];
        }
      });
      if (isCalPowerHw) {
        return (
          calcWaterUrl +
          "&" +
          new URLSearchParams(service_response_for_calc_power)
        );
      }
    }
    hideLoading();
  }
}
async function calPowerHw({ id }) {
  try {
    let jobId = getJobId(id)?.powerJobId;
    let watercutJobId = getJobId(id)?.watercutJobId;
    var sas_job = baseUrl + `?_job=/jobDefinitions/definitions/${jobId}`;
    let waterResp = await calWaterHw({
      isCalPowerHw: true,
      id,
      jobId: watercutJobId
    });
    let calcPowerUrl = sas_job + "&" + waterResp;
    console.log("calcPowerUrl", calcPowerUrl);
    displayLoading();
    let response = await fetch(calcPowerUrl);
    if (response.ok) {
      let service_response = await response.json();
      console.log("calcPowerRespHw", service_response);
      if (service_response) setValues(id, service_response);
    }
    hideLoading();
  } catch (err) {
    hideLoading();
    alert("Something went wrong, please try again");
  }
}

function calculateKpi() {
  //   validate empty fields

  let PwrConversionFactor =
    document.getElementById("Power_Conversion_Factor")?.value || 0;
  let PwrImportEfficiency = document.getElementById("powerImpEff")?.value || 0;

  let crudSumList = [
    "HD1_Crude_Oil_MBD",
    "HD2_Crude_Oil_MBD",
    "HD3_Crude_Oil_MBD",
    "HW2_Crude_Oil_MBD",
    "HW3_Crude_Oil_MBD",
    "HW4_Crude_Oil_MBD",
    "UT4_Crude_Oil_MBD",
    "UT7_Crude_Oil_MBD",
    "UT8_Crude_Oil_MBD",
    "UT9_Crude_Oil_MBD",
    "UT10_Crude_Oil_MBD",
    "UT11_Crude_Oil_MBD",
    "UT12_Crude_Oil_MBD",
    "UT13_Crude_Oil_MBD"
  ];
  let gasSumList = [
    "HD1_Gas_MMSCFD",
    "HD2_Gas_MMSCFD",
    "HD3_Gas_MMSCFD",
    "HW2_Gas_MMSCFD",
    "HW3_Gas_MMSCFD",
    "HW4_Gas_MMSCFD",
    "UT4_Gas_MMSCFD",
    "UT7_Gas_MMSCFD",
    "UT8_Gas_MMSCFD",
    "UT9_Gas_MMSCFD",
    "UT10_Gas_MMSCFD",
    "UT11_Gas_MMSCFD",
    "UT12_Gas_MMSCFD",
    "UT13_Gas_MMSCFD"
  ];

  let crudSum = 0;
  let isValid = true;
  crudSumList?.forEach((id) => {
    let el = document.getElementById(id);
    if (!el) console.log("el not found for: ", id);
    let value = el?.value || 0;
    !value && (isValid = false);
    crudSum += value;
  });
  // if(!isValid)
  // return alert("Please fill all fields for crud oil")

  let gasSum = 0;
  gasSumList?.forEach((id) => {
    let el = document.getElementById(id);
    if (!el) console.log("el not found for: ", id);
    let value = el?.value || 0;
    !value && (isValid = false);
    gasSum += value;
  });

  // if(!isValid)
  // return alert("Please fill all fields for Gas")

  // if(!P_HD2_FG_MMSCFD)
  // return alert("Please calculate Predicted Fuel Gas HD (MMSCFD)");

  let totalProd =
    crudSum + (gasSum * 1700) / 5800 + (P_HD2_FG_MMSCFD * 1080) / 5800;

  let totalEnergy =
    ((P_UT4_Power_Demand_MW +
      P_UT7_Power_Demand_MW +
      P_UT8_Power_Demand_MW +
      P_UT9_Power_Demand_MW +
      P_UT10_Power_Demand_MW +
      P_UT11_Power_Demand_MW +
      P_UT12_Power_Demand_MW +
      P_UT13_Power_Demand_MW +
      P_HW2_Power_Demand_MW +
      P_HW3_Power_Demand_MW +
      P_HW4_Power_Demand_MW +
      P_HD1_Power_Demand_MW +
      P_HD2_Power_Demand_MW +
      P_HD3_Power_Demand_MW) *
      PwrConversionFactor) /
      PwrImportEfficiency +
    (P_HD2_FG_MMSCFD * 1080) / 5800;

  let energyIntensity = (totalEnergy / totalProd) * 24;

  document.getElementById("EIN").value = energyIntensity || 0;
}
// tabs js

// function handleTabs() {
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
console.log("handleTabs");

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
  if (n == x.length - 1) {
    document.getElementById("nextBtn").style.display = "none";
  } else {
    document.getElementById("nextBtn").style.display = "inline";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
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
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}
