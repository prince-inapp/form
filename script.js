var headers = new Headers();
headers.append("X-CSCAPI-KEY", "QnFSdDFqUVpPY2NOdWNJZmZTMVRJTG1LWWV3M0JJUDR1cWFZMktreA==");

var requestOptions = {
   method: 'GET',
   headers: headers,
   redirect: 'follow',
};

hide('state-div');
hide('city-div');
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
    if(document.getElementById("select-state") != null){
      document.getElementById("select-state").options.length=0;
    }
    const stateResponse = await fetch('https://api.countrystatecity.in/v1/countries/' + country + '/states', requestOptions);
    const stateData = await stateResponse.json();
    console.log("state data : ");
    console.log(stateData);
    
    try {
        loadOptions(stateData, 'select-state');
        loadCities();
        show('state-div');
        if(stateData.length === 0){
            console.log('inside if ');
            document.getElementById('state-div').hidden = true;
            hide('state-div');
            console.log('state-div hidden');
            hide('city-div');
        }
        
    } catch (error) {
        console.log("no state");
        hide('state-div');
        hide('city-div');
        
    }
    
}

async function loadCities(){
    const country = document.getElementById('select-country').value;
    const state = document.getElementById('select-state').value;
    if(document.getElementById("select-city") != null){
      document.getElementById("select-city").options.length=0;
    }
    const cityResponse = await fetch(
        'https://api.countrystatecity.in/v1/countries/'+country+'/states/'+state+'/cities', requestOptions).catch((e)=>{
            console.log('no city api');
        })
    const cityData = await cityResponse.json();
    //console.log(cityData);
    try{
        loadOptions(cityData, 'select-city');
        show('city-div');
    }
    catch{
        console.log("no city");
        hide('city-div');
    }
    
    

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

function hide(id){
    let options = document.getElementById(id);
    options.hidden = true;
}

function show(id){
    let options = document.getElementById(id);
    options.hidden = false;
}
