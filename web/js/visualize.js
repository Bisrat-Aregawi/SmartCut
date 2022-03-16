const solveBtn = document.querySelector('#solve');

/*---------------------------------------------------------------------------*/
function maker (elem) {
  return document.createElement(elem);
}

function makeResultTable (patternObject) {
  const tr = [];
  let row = '';
  let data = '';
  for (const detail in patternObject) {
    const uniqCuts = [...new Set(patternObject[detail].cuts)];
    for (const i in uniqCuts) {
      row = maker('tr');
      if (i === '0') {
        data = maker('td');
        data.setAttribute(
          'rowspan',
          `${uniqCuts.length}`
        );
        data.innerHTML = detail;
        row.append(data);
      }
      data = maker('td');
      data.innerHTML = uniqCuts[i];
      row.append(data);
      const count = countOccurance(patternObject[detail].cuts, uniqCuts[i]);
      data = maker('td');
      data.innerHTML = count;
      row.append(data);
      data = maker('td');
      data.style.backgroundColor = randomColor();
      row.append(data);
      tr.push(row);
    }
  }
  return tr;
}

function countOccurance (arr, val) {
  let count = 0;
  for (const i in arr) {
    if (arr[i] === val) {
      count++;
    }
  }
  return count;
}

function randomColor () {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
/*---------------------------------------------------------------------------*/


/* Reconstruct the result pagination */
/*---------------------------------------------------------------------------*/
function paginateResult (pages) {
  const resultsUL = document.querySelector('#resultsUL');
  resultsUL.innerHTML = '<li class="page-item"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li><li class="page-item"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';

  for (let i = 0; i < pages; i++) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    li.classList.add('page-item');

    btn.setAttribute('onclick', 'showTable();');
    btn.classList.add('page-link');
    btn.innerHTML = i + 1;
    li.append(btn);
    if (i === 0) li.classList.add('active');

    resultsUL.lastElementChild.insertAdjacentElement(
      'beforebegin',
      li
    );
  }
}
/*---------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------*/
function showTable () {
  const layoutTable = document.querySelector('#layoutTable');
  document.querySelector('#layouts').textContent = '';
  layoutTable.lastElementChild.textContent = '';
  if (!event.target.parentNode.classList.contains('active')) {
    const steelTypes = Object.keys(resultTables);
    tabulateResult(
      layoutTable,
      steelTypes[Number(event.target.innerText) - 1]
    );
  }
}

function tabulateResult (layoutTable, tableDescription, rowsArr = '') {
  const steelTypes = Object.keys(resultTables);

  document.querySelector('#tableDescription').innerHTML = tableDescription;
  if (rowsArr === '') {
    rowsArr = resultTables[
      steelTypes[Number(event.target.innerText) - 1]
    ];
  }
  for (let j = 0; j < rowsArr.length; j++) {
    layoutTable.lastElementChild.append(rowsArr[j]);
  }
  layoutResult();
  Array.from(event.target.parentNode.parentNode.children).forEach(elem => {
    elem.classList.remove('active');
  });
  event.target.parentNode.classList.add('active');
}
/*---------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------*/
function layoutResult() {
  const layoutsTable = document.getElementById('layoutTable');
  const layouts = document.getElementById('layouts');
  const child = layoutsTable.lastElementChild;
  let table = '';
  let tbody = '';
  let tr = '';
  for (let i = 0; i < child.childElementCount; i++) {
    if (child.children[i].firstChild.hasAttribute('rowspan')) {
      if (i !== 0) {
        tr.append(document.createElement('td'));
        tbody.append(tr);
        table.append(tbody);
        layouts.append(table);
      }
      table = document.createElement('table');
      tr = document.createElement('tr');
      tbody = document.createElement('tbody');
      for (let j = 0; j < Number(child.children[i].children[2].innerText); j++) {
        const td = document.createElement('td');
        td.style.backgroundColor = child.children[i].children[3].style.backgroundColor;
        td.style.width = String((Number(child.children[i].children[1].innerText) / 6000) * 100) + '%';
        td.innerHTML = `<small>${child.children[i].children[1].innerText}</small>`;
        tr.append(td);
      }
    } else {
      for (let k = 0; k < Number(child.children[i].children[1].innerText); k++) {
        const td = document.createElement('td');
        td.style.backgroundColor = child.children[i].children[2].style.backgroundColor;
        td.style.width = String((Number(child.children[i].children[0].innerText) / 6000) * 100) + '%';
        td.innerHTML = `<small>${child.children[i].children[0].innerText}</small>`;
        tr.append(td);
      }
    }
  }
}
/*---------------------------------------------------------------------------*/
