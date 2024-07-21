var LastObj;
var ObjBtnTxt;
function toggle(a) {
  LastObj != undefined && closeText(LastObj),
    (LastObj == undefined ||
      a.getAttribute("id") != LastObj.getAttribute("id") ||
      (a.getAttribute("id") == LastObj.getAttribute("id") &&
        ObjBtnTxt.includes("[+]"))) &&
      (openText(a), (LastObj = a));
}
function openText(e) {
  var a = e.getAttribute("id");
  var d = document.getElementById("Text" + a.substring(a.indexOf("_")));
  var c = document.getElementById(a);
  var b = c.innerText;
  (d.style.display = "block"), (b = b.replace("[+]", "[-]")), (c.innerText = b);
}
function closeText(d) {
  var a = d.getAttribute("id");
  var e = document.getElementById("Text" + a.substring(a.indexOf("_")));
  var c = document.getElementById(a);
  var b = c.innerText;
  (ObjBtnTxt = d.innerHTML),
    (e.style.display = "none"),
    (b = b.replace("[-]", "[+]")),
    (c.innerText = b);
}
function toggleDisplay() {
  (document.getElementById("filterDropdown").style.display = "block"),
    (document.getElementById("Btns").style.display = "inline");
}
function toggleHide() {
  (document.getElementById("filterDropdown").style.display = "none"),
    (document.getElementById("Btns").style.display = "none");
}
function toggleClear() {
  document.querySelectorAll("input:checked").forEach(function (checkbox) {
    checkbox.checked = !1;
  });
}
function processSelection() {
  var checkValues = "";
  document.querySelectorAll("input:checked").forEach(function (checkbox) {
    checkValues += "," + checkbox.value;
  }),
    (checkValues = checkValues.slice(1).split(","));
  var articleIds = [];
  checkValues.forEach(function (article) {
    articleIds.push("Article_" + article);
  }),
    Array.from(document.getElementsByClassName("article")).forEach(function (
      div
    ) {
      articleIds.includes(div.id) || articleIds[0] == "Article_"
        ? showDiv(div.id)
        : hideDiv(div.id);
    });
}
function showDiv(id) {
  document.getElementById(id).style.display = "block";
}
function hideDiv(id) {
  document.getElementById(id).style.display = "none";
}
function buildMenu() {
  const fileUrl = "menu.txt";  //  
  "https://semgep.github.io/VafSoft/menu.txt"; 
  fetch(fileUrl)
    .then((response) => response.text())
    .then((text) => {
      let ulList = document.getElementById("ulList");
      for (let elem of text.split("\r\n")) {
        let newElement = document.createElement("li");
        let newLink = document.createElement("a");
        newLink.href = elem.split(",")[0] + ".html";
        newLink.textContent = elem.split(",")[0];
        newElement.appendChild(newLink);
        ulList.appendChild(newElement);
      }
    });
}
function highlightCurrentPage() {
  var currentPage = window.location.pathname.split("/").pop(); // Получаем текущий путь
  document.querySelectorAll("nav ul li a").forEach(function (link) {
    // Проходимся по всем ссылкам в меню
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("current-page");
    } else {
      link.classList.remove("current-page");
    }
  });
}
function toggleMenu() {
  var menu = document.getElementById("menu");
  // var menuIcon = document.getElementById("menu-icon");
  var menuIcon = document.getElementsByClassName("menu-icon");
  if (menu.classList.contains("show")) {
    menu.classList.remove("show");
    menu.classList.add("hidden");
    menuIcon[0].innerHTML = "&#9776;"; // Символ гамбургера
  } else {
    menu.classList.add("show");
    menu.classList.remove("hidden");
    menuIcon[0].innerHTML = "&times;"; // Символ закрытия
  }
}
function toggleSearch() {
  var search = document.getElementById("search");
  if (search.classList.contains("show")) {
    search.classList.remove("show");
    search.classList.add("hidden");
  } else {
    search.classList.add("show");
    search.classList.remove("hidden");
  }
}
function searchSite() {
  var input = document.getElementById("searchInput").value.toLowerCase();
  var content = document.querySelectorAll("body *");
  var found = false;

  content.forEach(function (element) {
    if (element.textContent.toLowerCase().includes(input)) {
      highlightText(element, input);
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      found = true;
      // Добавляем задержку перед прокруткой
      setTimeout(function () {
        scrollToElement(element);
      }, 100); // 100 миллисекунд задержки
      return false;
    }
  });
  if (!found) {
    alert("No results found");
  }
}
function scrollToElement(element) {
  element.scrollIntoView({ behavior: "smooth", block: "center" });
}
function highlightText(element, text) {
  var innerHTML = element.innerHTML;
  var index = innerHTML.toLowerCase().indexOf(text);
  if (index >= 0) {
    innerHTML =
      innerHTML.substring(0, index) +
      "<span class='highlight'>" +
      innerHTML.substring(index, index + text.length) +
      "</span>" +
      innerHTML.substring(index + text.length);
    element.innerHTML = innerHTML;
  }
}
function begin() {
  document.addEventListener("load", function () {
    window.scrollTo(0, 0); // Прокрутка страницы к началу при загрузке
  });
}
function getNow() {
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  };
  document.getElementById(
    "getNow"
  ).innerHTML += `<font size="1">${new Date().toLocaleString(
    "en-US",
    options
  )}</font>`;
}
document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0); // Прокрутка страницы к началу при загрузке
  var menuLinks = document.querySelectorAll("#menu ul li a");
  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      toggleMenu();
    });
  });
});
