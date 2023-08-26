const inType = document.querySelector("#inType");
const inMarca = document.querySelector("#inMarca");
const inModel = document.querySelector("#inModel");

async function fetchType() {
  const urlType = `https://parallelum.com.br/fipe/api/v1/${inType.value}/marcas`;

  try {
    const typeResponse = await fetch(urlType);
    const marcaJSON = await typeResponse.json();

    inMarca.innerHTML = "";
    inModel.innerHTML = "";

    marcaJSON.forEach((marca) => {
      const optionMarca = document.createElement("option");
      optionMarca.setAttribute("value", marca.codigo);
      optionMarca.innerText = marca.nome;
      inMarca.appendChild(optionMarca);
    });
  } catch (erro) {
    console.log(erro);
  }
}

function createMarcaOption(marca) {
  const optionMarca = document.createElement("option");
  optionMarca.setAttribute("value", marca.codigo);
  optionMarca.innerText = marca.nome;
  return optionMarca;
}

inType.addEventListener("change", fetchType);

// CRIAR APARECIMENTO DE MODELO DO CARRO
async function fetchModel() {
  const urlModel = `https://parallelum.com.br/fipe/api/v1/${inType.value}/marcas/${inMarca.value}/modelos`;

  try {
    const marcaResponse = await fetch(urlModel);
    const modelJSON = await marcaResponse.json();

    inModel.innerHTML = "";

    modelJSON.modelos.forEach((model) => {
      const optionModel = createModelOption(model);
      inModel.appendChild(optionModel);
    });
  } catch (erro) {
    console.log(erro);
  }
}

function createModelOption(model) {
  const optionModel = document.createElement("option");
  optionModel.setAttribute("value", model.codigo);
  optionModel.innerText = model.nome;
  return optionModel;
}

inMarca.addEventListener("change", fetchModel);

// CRIAR APARECIMENTO DE ANO DO CARRO
