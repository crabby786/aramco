var baseUrl = "https://sasserver.demo.sas.com/";


var SAOO_Sites = [
  "HGPD","NGPD","HdGPD","HNGLPD",
  "SNGLPD","SWID", "SyPD" ,"NGPD",
  "KhPD","APOD","SGPD"
]
var NAOO_Sites = [
  "SONPD","SOfPD","RTPD","MPD"
]
var SAGO_Sites = [
  "UGPD","ShGPD","HNGLPD","HGPD","HdGPD",
]
var NAGO_Sites = [
  "WGPD","SNGLPD","KGPD","FGPD","BGPD",
]

let allSites = [...NAGO_Sites, ...SAOO_Sites, ...NAOO_Sites, ...SAGO_Sites]

function removeActiveClass(items) {
  for (i = 0; i < items?.length; i++) {
    items[i].className = items[i].className.replace(" active", "");
  }
}
document.onreadystatechange = () => {
  baseUrl = document.getElementsByTagName("base")[0]?.href || baseUrl;
  console.log("ready baseUrl", baseUrl);

  if (document.readyState === "complete") {
    // getUsername();

    getUserGroups();
    
  let items = document.querySelectorAll(
    "#accordionPanelsStayOpenExample .accordion-item .btn"
  );
    for (i = 0; i < items?.length; i++) {
      items[i].addEventListener("click", e=> {
        removeActiveClass(items);
        e.currentTarget.className += " active";
      });
    }
  }
};
var rootgrdntColor =
  "linear-gradient(to bottom, #0c0448 0%, #3351c7 50%, #13025e 100%)";
var activeFullscreenItem = null;

// handles bgcolor for target setting when in fullscreen
function toggleIframeClass(id) {
  var iframe = document.getElementById(id);
  console.log("toggleclass", id, document?.fullscreenElement);
  var elmnt = iframe?.contentWindow?.document?.getElementsByTagName(
    "body"
  )?.[0];
  if (elmnt) {
    let isFullScreen = document?.fullscreenElement;
    //elmnt.style.background = rootgrdntColor;
    elmnt.style.background = isFullScreen ? rootgrdntColor : "transparent";
  }
}

function fullscreenchanged(event, id) {
  if (!document.fullscreenElement) {
    toggleIframeClass(id);
    event.target.removeEventListener("fullscreenchange", fullscreenchanged);
  }
}

async function openFullscreen(id) {
  let options = { navigationUI: "show" };
  var elem = document.getElementById(id);

  if (elem.requestFullscreen) {
    await elem.requestFullscreen(options);
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    await elem.webkitRequestFullscreen(options);
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    await elem.msRequestFullscreen(options);
  }

  if (elem?.name == "iframe1") {
    toggleIframeClass("HdGPD-Dashboard-frame1");
    elem.addEventListener("fullscreenchange", fullscreenchanged);
  }
}

function getUsername() {
  console.log("getUsername init");
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status == 200) {
      var resp = JSON.parse(xhr.response);
      const name = JSON.parse(xhr.response).name;
      document.getElementById("greetuser").textContent = name;
    } else {
      console.error("Error!");
    }
  };
  xhr.open("GET", baseUrl + "identities/users/@currentUser");
  xhr.setRequestHeader("accept", "application/json");
  xhr.send();
}
      //var groups = "";

function getUserGroups() {
  console.log("getUserGroups init");
  const xhr = new XMLHttpRequest();
  // const list1 = testUserGroups; // 

  function handleResp(list) {
    
    let enabledSites = []

    for (let item of list) {
      if (item.id == "aramcoadmin") {
        // enable all sites
        console.log("usergroup = aramcoadmin");
        enabledSites = allSites
        
      }
      if (item.id == "aramcohgpd") {
          //console.log(">> aramcohgpd");
          enabledSites = [...enabledSites,"HGPD"]
      }
      if (item.id == "aramcongpd") {
          enabledSites = [...enabledSites,"NGPD"]
      }
      if (item.id == "aramcohdgpd") {
          enabledSites = [...enabledSites,"HdGPD"]
      }
      if (item.id == "aramcohnglpd") {
          enabledSites = [...enabledSites,"HNGLPD"]
      }
      if (item.id == "aramcosypd") {
          enabledSites = [...enabledSites,"SyPD"]
      }
      //console.log(item.id);
      //groups += item.id + " / ";
      //document.getElementById("groups").value = groups;
  
    }

    
    let accordionContainer = document.getElementById("accordionPanelsStayOpenExample");
    let navMenuBtns = accordionContainer?.querySelectorAll("button.btn");
    navMenuBtns = navMenuBtns?.length ? Array.from(navMenuBtns) : [];

    if(navMenuBtns?.length) {
      // disable left panel buttons based on user groups

      let filteredNavBtns = navMenuBtns?.filter(item=> {
        let itemId = item?.id?.split("-")[0]
        return !enabledSites?.includes(itemId)
      } )
      for (i = 0; i < filteredNavBtns?.length; i++) {
        let currentBtn = filteredNavBtns[i]
        currentBtn.disabled = true;
      }

      // set 1st button active and open 1st accordion in left panel
      let firstButton = navMenuBtns?.find(obj=> enabledSites?.includes(obj?.id?.split("-")[0]) ) ;
      if(firstButton) {
        // make button active
        firstButton.className += " active"
        handleNavClick(firstButton?.id?.split("-")[0])
        openCity("targetSettingTab")
        let accItem = firstButton.closest('div.accordion-item');
        let colBtn = accItem?.querySelector("button.accordion-btn")
        let colPanel = accItem?.querySelector("div.expandable")
        // make active panel visible
        colBtn?.className.replace(" collapsed", "");
        colPanel.className += " show"
        
      }
    }    


  }

  xhr.onload = () => {
    if (xhr.status == 200) {
      let list = JSON.parse(xhr.response).items;
      handleResp(list)
    } else {
      console.error("Error!");
    }
    
  };

  xhr.open("GET", baseUrl + "identities/users/@currentUser/memberships");
  xhr.setRequestHeader("accept", "application/json");
  xhr.send();
}

var activeExpandId = "";

var allFrameLinks = {
  SNGLPD: {
    targetLink:
      baseUrl +
      "SASJobExecution/?_job=/jobDefinitions/definitions/7366f601-66b8-49f2-a8b1-3dbb5603326d",
    monitoringLink:
      baseUrl +
      "SASVisualAnalytics/?reportUri=%2Freports%2Freports%2Fc5ccb3a4-5a9c-4752-8406-32a0e9b05570&sectionIndex=0&reportViewOnly=true&reportContextBar=false&sas-welcome=false&appSwitcherDisabled=true"
  },
  SyPD: {
    targetLink:
      baseUrl +
      "SASJobExecution/?_job=/jobDefinitions/definitions/a7dc4f96-a387-4e05-b9a7-2dad6aebecb0",
    monitoringLink:
      baseUrl +
      "SASVisualAnalytics/?reportUri=%2Freports%2Freports%2Fc5ccb3a4-5a9c-4752-8406-32a0e9b05570&sectionIndex=0&reportViewOnly=true&reportContextBar=false&sas-welcome=false&appSwitcherDisabled=true"
  },
  SWID: {
    targetLink:
      baseUrl +
      "SASJobExecution/?_job=/jobDefinitions/definitions/58d9c77e-8679-491b-8de1-da374e71a23c",
    monitoringLink:
      baseUrl +
      "SASVisualAnalytics/?reportUri=%2Freports%2Freports%2Fc5ccb3a4-5a9c-4752-8406-32a0e9b05570&sectionIndex=0&reportViewOnly=true&reportContextBar=false&sas-welcome=false&appSwitcherDisabled=true"
  },
  HNGLPD: {
    targetLink:
      baseUrl +
      "SASJobExecution/?_job=/jobDefinitions/definitions/673087ca-bda0-4dd3-abe4-ab86d28ebc87",
    monitoringLink:
      baseUrl +
      "SASVisualAnalytics/?reportUri=%2Freports%2Freports%2Fc5ccb3a4-5a9c-4752-8406-32a0e9b05570&sectionIndex=0&reportViewOnly=true&reportContextBar=false&sas-welcome=false&appSwitcherDisabled=true"
  },
  HdGPD: {
    targetLink:
      baseUrl +
      "SASJobExecution/?_job=/jobDefinitions/definitions/d3ee50d2-1a5d-4130-b6cc-c754e7cc2999",
    monitoringLink:
      baseUrl +
      "SASVisualAnalytics/?reportUri=%2Freports%2Freports%2Fc5ccb3a4-5a9c-4752-8406-32a0e9b05570&sectionIndex=0&reportViewOnly=true&reportContextBar=false&sas-welcome=false&appSwitcherDisabled=true"
  }
};
function handleNavClick(id) {
  console.log("handleNavClick", id);
  // toggleConntent()//remove later when all sites migrated
  if (allFrameLinks?.hasOwnProperty(id)) {
    let activeLink = allFrameLinks[id];
    console.log("activeLink", activeLink);
    let content = document.getElementById("content1");

    let dashboardFrame = content.querySelector("#Dashboard-frame1");
    let monitoringFrame = content.querySelector("#Monitoring-frame2");

    dashboardFrame.src = activeLink?.targetLink;
    monitoringFrame.src = activeLink?.monitoringLink;
    // dashboardFrame.style.display = "inline-block";
  } else {
    console.log("allFrameLinks missing iframe url");
  }
}

function setExpandId(activeCity) {
  if (activeCity) {
    let iframe = activeCity.querySelectorAll("iframe")[0];
    if (iframe) {
      activeExpandId = iframe.id;
    }
  }
}

function openCity(buttonId) {
  var i, tabcontent, tablinks;
  let iframeName = buttonId == 'realTimeTab' ? "realtimeContent": "targetContent";
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.querySelectorAll(".nav-tabs .btn.active");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  var activeCity = document.getElementById(iframeName);
  var activeButton = document.getElementById(buttonId);
  //   setExpandId(activeCity) // to set expand id
  activeCity.style.display = "block";
  if (activeButton)
    // add else 1st element on page load
    activeButton.className += " active";
}

var testUserGroups = [
  {
    links: [
      {
        method: "GET",
        rel: "group",
        href: "/identities/groups/AdaptiveLearningUsers",
        uri: "/identities/groups/AdaptiveLearningUsers",
        type: "application/vnd.sas.identity.group"
      }
    ],
    version: 1,
    id: "aramcoadmin",
    name: "Adaptive Learning Users",
    providerId: "local",
    implicit: false
  },
];
