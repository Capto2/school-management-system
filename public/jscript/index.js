function showData() {
  document.getElementById("field-test").style.display = "none";
  document.getElementById("content").style.display = "block";
}
function clearForm() {
  document.getElementsByName("email").value = "";
  document.getElementsByName("username").value = "";
  document.getElementsByName("gender").value = "";
  document.getElementsByName("jambReg").value = "";
  document.getElementsByName("jambScores").value = "";
  document.getElementsByName("ssceReg1").value = "";
  document.getElementsByName("ssceReg2").value = "";
}
function calTestScores() {
  //results calculations
  
}
const reg_jam = document.getElementById("jamb-scores");
reg_jam.addEventListener("mouseout", applicationBtn);
function applicationBtn(){
  let jambScores = document.getElementById("jamb-scores").value;
  if(jambScores < 200){
    document.getElementById("reg-btn").style.display="none";
  }else{
    document.getElementById("reg-btn").style.display="block";
  }
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
