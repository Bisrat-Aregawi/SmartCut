const stockTable = document.querySelector("#stockTable");

function rowRemove() {
  event.target.parentNode.parentNode.remove();
}

function removeTable() {
  event.target.parentNode.remove();
}

function asideHighlight() {
  const projectLinks = document.querySelector("#proj-links");
  for (let i = 0; i < projectLinks.childElementCount; i++) {
    projectLinks.children[i].classList.remove("active");
  }
  event.target.classList.add("active");
}

function changeSection() {
  const tabsUL = event.target.parentNode.parentNode;
  if (!event.target.classList.contains('active')) {
    for (let i = 0; i < tabsUL.childElementCount; i++) {
      if (tabsUL.children[i].children[0].classList.contains('active')) {
        tabsUL.children[i].children[0].classList.remove('active');
        tabsUL.children[i].children[0].classList.add('text-light');
      }
    }
    event.target.classList.add('active');
    const sections = document.querySelector('#sections');
    if (event.target.innerText === 'Stock') {
      sections.children[0].style.display = 'block';
      sections.children[1].style.display = 'none';
      sections.children[2].style.display = 'none';
    } else if (event.target.innerText === 'Cut List') {
      sections.children[0].style.display = 'none';
      sections.children[1].style.display = 'grid';
      sections.children[2].style.display = 'none';
    } else if (event.target.innerText === 'Result') {
      sections.children[0].style.display = 'none';
      sections.children[1].style.display = 'none';
      sections.children[2].style.display = 'block';
    }
  }
}

const addProject = document.querySelector("#addProject");
addProject.addEventListener("click", () => {
  const collapseOne = document.querySelector("#collapseOne");
  const collapseInputChildren =
    collapseOne.children[0].children[0].childElementCount;
  const projectValues = [];
  let missing = false;
  for (let i = 0; i < collapseInputChildren - 1; i++) {
    projectValues.push(
      collapseOne.children[0].children[0].children[i].children[0].children[0]
        .value
    );
  }
  for (let i = 0; i < projectValues.length; i++) {
    if (projectValues[i] === "") {
      missing = true;
    }
  }
  if (!missing) {
    const projectLinks = document.querySelector("#proj-links");
    projectLinks.innerHTML += `<button class="list-group-item list-group-item-action" onclick="asideHighlight();"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">${projectValues[0]}</h5><span class="badge bg-success">On Going</span></div><h6 class="mb-1">CUSTOMER: ${projectValues[1]}</h6><hr/><p class="mb-1">Some placeholder content in a paragraph.</p><div class="row gx-3" style="text-align: center"><div class="col"><div class="border rounded-3 fs-6 fw-light"><small>Started: </small><small>${projectValues[2]}</small></div></div><div class="col"><div class="border rounded-3 fs-6 fw-light"><small>Due: </small><small>${projectValues[3]}</small></div></div></div></button>`;
  }
});

const addStockRow = document.querySelector("#addStockRow");
addStockRow.addEventListener("click", () => {
  const stockTable = document.querySelector("#stockTable");
  console.log(stockTable.lastElementChild);
  stockTable.lastElementChild.insertAdjacentHTML(
    "afterend",
    '<tr><th scope="row" class="small-width">3</th><td><input type="number" class="form-control" aria-label="Recipient\'s username" aria-describedby="basic-addon2"></td><td><input type="number" class="form-control" placeholder="000" aria-label="Recipient\'s username" aria-describedby="basic-addon2"></td><td><div class="input-group" style="margin: auto;"><input type="text" class="table-input form-control" placeholder="0.00" aria-label="Recipient\'s username" aria-describedby="basic-addon2" style="width: 80px;"><select class="table-select form-select" aria-label="stckLength" style="width: 60px"><option selected>cm</option><option value="1">mm</option><option value="2">m</option></select></div></td><td><div class="input-group" style="margin: auto;"><input type="text" class="table-input form-control" placeholder="0.00" aria-label="Recipient\'s username" aria-describedby="basic-addon2" style="width: 80px;"><select class="table-select form-select" aria-label="stckLength" style = "width: 60px;"><option selected>ETB</option><option value="1">€</option><option value="2">$</option></select></div></td><td style="text-align: center"><button type="button" class="btn btn-outline-danger fw-bold btn-sm" onclick="rowRemove();">Delete Record <i class="fas fa-trash-alt"></i></button></td></tr>'
  );
});

const addTable = document.querySelector('#addTable');
addTable.addEventListener('click', () => {
  const tableSection = document.querySelector('#midSection');

  if (!tableSection.lastElementChild) {
    tableSection.innerHTML += `<div class="c1_r1"><button class="btn btn-danger btn-sm hidden-table-delete"  onclick="removeTable();"><i class="fas fa-plus"></i></button><table class="table table-sm table-hover table-bordered"><thead><tr><th colspan="3"><input type="text" placeholder="Steel Type"></th></tr></thead><tbody><tr><td>#</td><td>Quantity</td><td>Length(cm)</td></tr></tbody></table></div>`;
  } else {
    console.log(tableSection.lastElementChild);
    tableSection.lastElementChild.insertAdjacentHTML(
      'afterend',
      `<div class="c1_r1"><button class="btn btn-danger btn-sm hidden-table-delete"  onclick="removeTable();"><i class="fas fa-plus"></i></button><table class="table table-sm table-hover table-bordered"><thead><tr><th colspan="3"><input type="text" placeholder="Steel Type"></th></tr></thead><tbody><tr><td>#</td><td>Quantity</td><td>Length(cm)</td></tr></tbody></table></div>`
    );
  }
});

const tabulate = document.querySelector('#inputGroupFileAddon04');
const fileInput = document.querySelector('#inputGroupFile04');

tabulate.addEventListener('click', (e) => {
  const inputFile = fileInput.files[0];
  const reader = new FileReader();
  reader.readAsText(inputFile);

  function csvToArray(str, delimiter = ',') {
    const data = {};
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');
    rows.pop();
    for (let i = 0; i < rows.length; i++) {
      rows[i] = rows[i].split(',');
      data[rows[i][2]] = {
        Lengths: [],
        Quantity: []
      };
    }
    for (const type in data) {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i][2] === type) {
          data[type].Lengths.push(rows[i][3]);
          data[type].Quantity.push(rows[i][1]);
        }
      }
    }
    return data;
  }

  reader.onload = (e) => {
    console.log(
      csvToArray(e.target.result)
    );
  };
});
