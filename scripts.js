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
var LastObj;
var ObjBtnTxt;
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
