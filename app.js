//order of operations, spacign and newline does not matter excpet for asesthetics
//creating some constants here. as opposed to variables which can be overwirtten as text progresses
const vizcontainer = document.getElementById("vizcontainer");
//calls the id created in the style.css
//always finish with a semi colon
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
const hideViz = document.getElementById("hideViz");
const showViz = document.getElementById("showViz");
const Central = document.getElementById("Central");
const North = document.getElementById("North");
const South = document.getElementById("South");
const revertBtn = document.getElementById("revertBtn");
//taking the sharing link from the dahsbaord share
//create the fucntion to load up the visualisation and name it ie'initviz'
const options = {
  device: "desktop",
  height: 700,
  width: 1000,
};
let viz;
//using let instad of constant

function initViz() {
  viz = new tableau.Viz(vizcontainer, url, options);
}
// see tableau help for ciz class constructors and viz create options

// run this funciton ona  particular event ie after loading
document.addEventListener("DOMContentLoaded", initViz);

//function to hide viz
function hidetheviz() {
  console.log("hiding viz");
  viz.hide();
}
// when to execute the fucntion
hideViz.addEventListener("click", hidetheviz);

//function to show viz
function showtheviz() {
  console.log("showing viz");
  viz.show();
}
// when to execute the fucntion
showViz.addEventListener("click", showtheviz);

// function for filtering by region

function filterRegion(value) {
  const sheettofilter = viz
    .getWorkbook()
    .getActiveSheet()
    .getWorksheets()
    .get("Sales Map");
  console.log(sheettofilter);
  sheettofilter.applyFilterAsync(
    "Region",
    value,
    tableau.FilterUpdateType.REPLACE
  );
}
//you might need go specify a specific workbook name etc if you had multiple tabs
//refer to the mapping diagram to make sure you understand your workbood dependancy and structure etc re. filters
//eg. worksheet.applyFilterAsync("Product Type", "Coffee", tableau.FilterUpdateType.REPLACE)

//looping through filters and obtainign hte value tahts going into the 'value' above
//using the class or id ie. class ="filter"
document.querySelectorAll(".filter").forEach((button) => {
  console.log(button);
  button.addEventListener("click", (e) => filterRegion(e.target.value));
});
// revert fucntion
function revertFilters() {
  console.log("reverting viz");
  viz.revertAllAsync();
}
revertBtn.addEventListener("click", revertFilters);
