// Api connection and load data
const ApiConnection = (value) => {
  if (value == '') {
    hideAndShowSpinner('none');
    noRersultFound('none');
    document.getElementById('noInput').style.display = 'block';

  }
  else {
    document.getElementById('noInput').style.display = 'none';
    fetch(`https://openapi.programming-hero.com/api/phones?search=${value.toLowerCase()}`)
      .then(res => res.json())
      .then(data => CardsDisplay(data));
  }

}
// no result found msg control function
const noRersultFound = (value) => {
  document.getElementById('ResultNotFound').style.display = value;
}
// Spinner control
const hideAndShowSpinner = (dislayType) => {
  document.getElementById('spinner').style.display = dislayType;

}

// search button funtion 
document.getElementById('search-btn').addEventListener('click', function () {
  let searchText = document.getElementById('search-input-text');
  hideAndShowSpinner('block');
  ApiConnection(searchText.value);
  searchText.value = ''; // celar search box value

})

// product details data fetch
const fetchProductDetails = (value) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${value}`)
    .then(res => res.json())
    .then(data => showProductDetails(data.data));
  location.href = "#productDetails";

}

// show more btn hide and show
const showMoreBtnHideShow = (value) => {
  document.getElementById('showmore').style.display = value;
}

//limited numbers of phone show
const displaySlice = (phones) => {

  const resultId = document.getElementById('phones');
  // clear previous search result
  resultId.textContent = '';   //.data.slice(0, 20)
  for (let phone of phones) {

    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
              <div class="card h-100 ">
               <img src="${phone.image}" class="card-img-top  img-fluid rounded mx-auto pt-4" alt="..."
                  style=" height: 60%; width:60%;">
               <div class="card-body text-center pt-5">
                  <h5 class="card-title t"> ${phone.phone_name}</h5>
                  <h5 class="card-title t"> ${phone.brand}</h5>
                  <div id="showDetailsBtn" class="d-grid gap-2 col-6 mx-auto">
                      <button  onclick="fetchProductDetails('${phone.slug}')" class="btn btn-primary" type="button">Show details</button>
                  </div>
               </div>
              </div>`;
    resultId.appendChild(div);
    hideAndShowSpinner('none'); // hide spinner
  }
}

// display phones 
const CardsDisplay = (phones) => {
  let phoneNumber = phones.data.length;
  // clear previous search result
  const resultId = document.getElementById('phones');
  resultId.textContent = '';

  if (phoneNumber > 20) {
    displaySlice(phones.data.slice(0, 20));
    showMoreBtnHideShow('block');
    document.getElementById('showmore').addEventListener('click', function () {
      displaySlice(phones.data);
      showMoreBtnHideShow('none');
    })
  }
  else if (phoneNumber <= 20 && phoneNumber > 0) {
    displaySlice(phones.data);
    showMoreBtnHideShow('none');

  }

  if (phoneNumber == 0) {
    noRersultFound('block');
    hideAndShowSpinner('none'); // hide spinner
    document.getElementById('productDetails').style.display = 'none';
    showMoreBtnHideShow('none');
  }
  else {
    noRersultFound('none');

  }

}


//product details
const showProductDetails = (phone) => {
  document.getElementById('productDetails').style.display = 'block';
  var sensors = '';
  var d = [];
  for (const data of phone.mainFeatures.sensors) {
    sensors = data.replace(/\s+/g, '-') + " ";
    d.push(sensors);
  }
  console.log(sensors);

  document.getElementById('productDetails').innerHTML = `
  <div class="mx-auto text-center mb-5" style=" ">
              <img class="img-fluid mt-5 w-25" src="${phone.image}" alt="">
              <p class="fw-bold text-center m-0 p-0"> Product-ID:</p>
              <p class=" text-center m-0 p-0">${phone.slug.toString()} </p>
          </div>
  <table class="table table-bordered">
<thead>
  <tr class="table-dark">
    
    <th scope="col">Basic Info</th>
    <th scope="col">Details</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Name</td>
    <td>${phone.name.toString()}</td>
  </tr>
  <tr>
    <td>Brand</td>
    <td>${phone.brand.toString()}</td>
  </tr>
  
  <tr>
    <td>ReleaseDate</td>
    <td>${phone.releaseDate.toString() ? phone.releaseDate : ' not released'}</td>
  </tr>
  <tr class="table-dark">
    <td class="fw-bold">MainFeatures</td>
    <td class="fw-bold">Details</td>
  </tr>
  <tr>
    <td>Storage</td>
    <td>${phone.mainFeatures.storage.toString()}</td>
  </tr>
  <tr>
    <td>DisplaySize</td>
    <td>${phone.mainFeatures.displaySize.toString()}</td>
  </tr>
  <tr>
    <td>ChipSet</td>
    <td>${phone.mainFeatures.chipSet.toString()}</td>
  </tr>
  <tr>
    <td>Memory</td>
    <td>${phone.mainFeatures.memory.toString()}</td>
  </tr>
  <tr>
    <td>Sensors</td>
    <td>${d.toString()}</td>
  </tr>
  <tr class="table-dark">
  <td class="fw-bold">Others info</td>
  <td class="fw-bold">Details</td>
</tr>
  <tr>
    <td>WLAN</td>
    <td>${phone.others?.WLAN.toString() ?? 'Info not avaiable'}</td>
  </tr>
  <tr>
    <td>Bluetooth</td>
    <td>${phone.others?.Bluetooth.toString() ?? 'Info not avaiable'}</td>
  </tr>
  <tr>
    <td>GPS</td>
    <td>${phone.others?.GPS.toString() ?? 'Info not avaiable'}</td>
  </tr>
  <tr>
    <td>NFC</td>
    <td>${phone.others?.NFC.toString() ?? 'Info not avaiable'}</td>
  </tr>
  <tr>
    <td>Radio</td>
    <td>${phone.others?.Radio.toString() ?? 'Info not avaiable'}</td>
  </tr>
  <tr>
  <td>USB</td>
  <td>${phone.others?.USB.toString() ?? 'Info not avaiable'}</td>
</tr>

</tbody>
</table>`;
}