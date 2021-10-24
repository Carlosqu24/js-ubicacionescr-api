const API_URL = "https://ubicaciones.paginasweb.cr/";

const $selectPrimary = document.querySelector('#select-primary');
const $selectSecondary = document.querySelector('#select-secondary');
const $selectThird = document.querySelector('#select-third');


async function getProvinces() {
    const res = await fetch(`${API_URL}provincias.json`);
    const data = await res.json();
    
    let $options = `<option value="">Elige una Provincia</option>`;

    // let maxProvinces = Object.keys(data);
    let provinces = Object.values(data)

    provinces.forEach((province, i) => {
        let length = i + 1;
        $options += `<option value="${length}">${province}</option>`;
    });

    $selectPrimary.innerHTML = $options;

    
};

async function getCantones(provinceId) {
    const res = await fetch(`${API_URL}/provincia/${provinceId}/cantones.json`);
    const data = await res.json();
    
    let $options = `<option value="">Elige un Cantón</option>`;
;
    let cantons = Object.values(data)

    cantons.forEach((canton, i) => {
        let length = i + 1;
        $options += `<option value="${length}">${canton}</option>`;
    });

    $selectSecondary.innerHTML = $options;
}

async function getDistricts(provinceId, cantonId) {
    const res = await fetch(`${API_URL}/provincia/${provinceId}/canton/${cantonId}/distritos.json`);
    const data = await res.json();
    
    let $options = `<option value="">Elige un Distrito</option>`;
        let districts = Object.values(data)
    
        districts.forEach((district, i) => {
            let length = i + 1;
            $options += `<option value="${length}">${district}</option>`;
        });
    
        $selectThird.innerHTML = $options;
}





document.addEventListener('DOMContentLoaded', e => {
    getProvinces();
})

$selectPrimary.addEventListener('change', e => {
    getCantones($selectPrimary.value);
});

$selectSecondary.addEventListener('change', e => {
    getDistricts($selectPrimary.value, $selectSecondary.value)
})