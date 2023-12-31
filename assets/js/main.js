const inType = document.querySelector("#inType");
const inMarca = document.querySelector("#inMarca");
const inModel = document.querySelector("#inModel");
const inYear = document.querySelector("#inYear");
const vehicle = document.querySelector(".vehicle");
const selected = document.querySelector("[selected]");

// function para retulizar nos inputs
function createOption(value, text) {
  const option = document.createElement("option");
  option.setAttribute("value", value);
  option.innerText = text;
  return option;
}

// fecth para reutlizar dentro das funcoes de criacao dos html dos inputs
async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

// funcao que retorna as marcas se baseando no tipo de veiculo
async function fetchType() {
  const urlType = `https://parallelum.com.br/fipe/api/v1/${inType.value}/marcas`;

  const marcaJSON = await fetchJSON(urlType);
  inMarca.innerHTML = `<option value="" selected disabled>Selecione</option>`;
  inModel.innerHTML = `<option value="" selected disabled>Selecione</option>`;
  inYear.innerHTML = `<option value="" selected disabled>Selecione</option>`;
  vehicle.innerHTML = "";

  selected.setAttribute("value", "");
  inMarca.disabled = false;
  inModel.disabled = true;
  inYear.disabled = true;

  if (marcaJSON) {
    marcaJSON.forEach((marca) => {
      const optionMarca = createOption(marca.codigo, marca.nome);
      inMarca.appendChild(optionMarca);
    });
  }
}

// funcao que retorna o modelo do carro se baseando na marca
async function fetchModel() {
  const urlModel = `https://parallelum.com.br/fipe/api/v1/${inType.value}/marcas/${inMarca.value}/modelos`;

  const modelJSON = await fetchJSON(urlModel);

  inModel.innerHTML = `<option value="" selected disabled>Selecione</option>`;
  inYear.innerHTML = `<option value="" selected disabled>Selecione</option>`;
  vehicle.innerHTML = "";
  inModel.disabled = false;
  inYear.disabled = true;

  if (inModel && modelJSON.modelos) {
    modelJSON.modelos.forEach((model) => {
      const optionMarca = createOption(model.codigo, model.nome);
      inModel.appendChild(optionMarca);
    });
  }
}

// funcao que retorna o ano do carro se baseando no modelo
async function fetchYear() {
  const urlYear = `https://parallelum.com.br/fipe/api/v1/${inType.value}/marcas/${inMarca.value}/modelos/${inModel.value}/anos`;

  const yearJSON = await fetchJSON(urlYear);

  inYear.innerHTML = `<option value="" selected disabled>Selecione</option>`;
  vehicle.innerHTML = "";
  inYear.disabled = false;

  if (inModel && yearJSON) {
    yearJSON.forEach((year) => {
      const optionYear = createOption(year.codigo, year.nome);
      inYear.appendChild(optionYear);
    });
  }
}

async function fetchDetails() {
  const urlDetails = `https://parallelum.com.br/fipe/api/v1/${inType.value}/marcas/${inMarca.value}/modelos/${inModel.value}/anos/${inYear.value}`;

  const detailJSON = await fetchJSON(urlDetails);
  vehicle.innerHTML = "";

  if (detailJSON) {
    vehicle.innerHTML = ` <h2>${detailJSON.Modelo} - ${detailJSON.AnoModelo}</h2>
                          <p><span>Marca:</span> ${detailJSON.Marca}</p>
                          <p><span>Combustível:</span> ${detailJSON.Combustivel}</p>
                          <p><span>Valor:</span> ${detailJSON.Valor}</p>
                          <p><span>Referência:</span> ${detailJSON.MesReferencia}</p>
                          `;
  }
}

inType.addEventListener("change", fetchType);
inMarca.addEventListener("change", fetchModel);
inModel.addEventListener("change", fetchYear);
inYear.addEventListener("change", fetchDetails);
