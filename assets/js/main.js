const inType = document.querySelector("#inType");
const inMarca = document.querySelector("#inMarca");
const inModel = document.querySelector("#inModel");
const inYear = document.querySelector("#inYear");

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
  inType.innerHTML = `<select name="inType" id="inType">
  <option value="carros">Carros</option>
  <option value="motos">Motos</option>
  <option value="caminhoes">Caminhões</option>
  </select>`;

  const urlType = `https://parallelum.com.br/fipe/api/v1/${inType.value}/marcas`;

  const marcaJSON = await fetchJSON(urlType);

  inMarca.innerHTML = "";

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

  inModel.innerHTML = "";

  if (inModel && modelJSON.modelos) {
    modelJSON.modelos.forEach((model) => {
      const optionMarca = createOption(model.codigo, model.nome);
      inModel.appendChild(optionMarca);
    });
  }
}

// CRIAR APARECIMENTO DE ANO DO CARRO

inType.addEventListener("change", fetchType);
inMarca.addEventListener("change", fetchModel);
