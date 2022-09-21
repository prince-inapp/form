var headers = new Headers();
headers.append("X-CSCAPI-KEY", "QnFSdDFqUVpPY2NOdWNJZmZTMVRJTG1LWWV3M0JJUDR1cWFZMktreA==");

var requestOptions = {
   method: 'GET',
   headers: headers,
   redirect: 'follow',
};

// api function which returns the data
async function loadData() {
    const response = await fetch('https://api.countrystatecity.in/v1/countries/', requestOptions);
    const data = await response.json();
    console.log(typeof data);
    loadOptions(data, 'select-country')

}

// function clearAll(){
//   let options = document.getElementById('select-state');
//   while(option.hasChildNodes()){
//
//   }
// }

async function loadStates(){

    const country = document.getElementById('select-country').value;
    console.log(country)
    console.log(document.getElementById("select-state"));
    if(document.getElementById("select-state") != null){
      document.getElementById("select-state").options.length=0;
    }
    const stateResponse = await fetch('https://api.countrystatecity.in/v1/countries/' + country + '/states', requestOptions);
    const stateData = await stateResponse.json();
    console.log(stateData);
    loadOptions(stateData, 'select-state');
    loadCities();
}

async function loadCities(){
    const country = document.getElementById('select-country').value;
    const state = document.getElementById('select-state').value;
    if(document.getElementById("select-city") != null){
      document.getElementById("select-city").options.length=0;
    }
    const cityResponse = await fetch(
        'https://api.countrystatecity.in/v1/countries/'+country+'/states/'+state+'/cities', requestOptions);
    const cityData = await cityResponse.json();
    console.log(cityData)
    loadOptions(cityData, 'select-city')

}

function loadOptions(data, id){

    const options = data.map((item) => {
        let selectCountry = document.getElementById(id);
        var opt = document.createElement('option');
        opt.value = item.iso2;
        opt.innerText = item.name;
        selectCountry.appendChild(opt);
    });
}
