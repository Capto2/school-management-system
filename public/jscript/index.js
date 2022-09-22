function myFunction() {
  document.getElementById("field-test").style.display = "none";
}
function showData(){
    document.getElementById("$400Level-Result").style.display = "none";
}
//print functions codes.
var doc = new jsPDF();
var specialElementHandler = {
  "#editor": function (element, renderer) {
    return true;
  },
};
$("#print-page-btn").click(function () {
  doc.fromHTML($("content").html(), 15, 15, {
    width: 170,
    elementHandlers: specialElementHandlers,
  });
  doc.save("sample-file.pdf");
});
