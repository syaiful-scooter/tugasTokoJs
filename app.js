let data = [
  {
    id: 1,
    merk: "Reebok",
    harga: 120000,
    kategori: "lari",
    rating: 4.8,
    gambar: "./rebook_lari.jpg",
  },
  {
    id: 2,
    merk: "Reebok",
    harga: 135000,
    kategori: "badminton",
    rating: 4.9,
    gambar: "rebook_badminton.jpg",
  },
  {
    id: 3,
    merk: "Puma",
    harga: 125000,
    kategori: "lari",
    rating: 4.8,
    gambar: "puma_lari.jpg",
  },
  {
    id: 4,
    merk: "Puma",
    harga: 139000,
    kategori: "badminton",
    rating: 4.9,
    gambar: "puma_badminton.jpg",
  },
];

let data_sepatu = data;
showDataSepatu();
display_data_sepatu();

function formatNumber(num) {
  return num.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}

function hapus(id) {
  console.log(data_sepatu);

  let index_item = data_sepatu.findIndex((sepatu) => sepatu.id == id);
  console.log("ini index_item : " + index_item);
  data_sepatu.splice(index_item, 1);

  showDataSepatu();
  display_data_sepatu();

  console.log(data_sepatu);
}

function showDataSepatu() {
  let item_html = "";
  data_sepatu.forEach((sepatu, i) => {
    item_html += `
                <tr>
                    <td>${i + 1}.</td>
                    <td>${sepatu.merk}</td>
                    <td>${sepatu.kategori}</td>
                    <td>${formatNumber(sepatu.harga)}</td>
                    <td> <i class="fas fa-star"></i>${sepatu.rating}</td>
                    <td><button class="btn btn-sm btn-danger" onclick="hapus('${
                      sepatu.id
                    }')"><i class="fas fa-window-close"> </i> Delete</button>
                    </td>
                </tr>
                `;
  });

  let table_body_peserta = document.getElementById("data-peserta");
  table_body_peserta.innerHTML = item_html;
  // console.log(table_body_peserta.attributes);
}

function display_data_sepatu() {
  let item_display_sepatu = "";
  data_sepatu.forEach((sepatu) => {
    item_display_sepatu += `
                <div class="col-md-3 mx-3 my-2">
                    <div class="card" >
                        <img class="card-img-top" src="assets/gambar/${
                          sepatu.gambar
                        }" alt="${sepatu.merk}" width="200" height="200">
                        <div class="card-body">
                            <h3 class="card-title">${sepatu.merk} 
                            <span class="badge badge-pill badge-warning float-right">
                            <i class="fas fa-star"></i>
                            ${sepatu.rating}
                            </span>
                            </h3>
                            <h4 class="card-subtitle mb-2 text-muted">${formatNumber(
                              sepatu.harga
                            )}</h4>

                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                                the card's
                                content.</p>
                                </div>
                                <button type="button" class="btn btn-lg btn-primary"><i class="fas fa-cart-plus"> </i>  B e l i </button>
                    </div>
                </div>
                      `;
  });

  let table_body_peserta = document.getElementById("pajang-sepatu");
  table_body_peserta.innerHTML = item_display_sepatu;
  // console.log("ini ==> " + table_body_peserta.attributes);
}

function showFormSection() {
  document
    .getElementById("form-section")
    .setAttribute("style", "display:block");
}

function saveData() {
  let form_data = document.getElementById("form-data-peserta");
  // form_data.querySelector(".name").value;
  let merk = form_data.querySelector(".merk").value.trim();
  let kategori = form_data.querySelector(".kategori").value.trim();
  let harga = form_data.querySelector(".harga").value.trim();
  let rating = form_data.querySelector(".rating").value.trim().trim();
  let picture = form_data.querySelector(".picture").files[0];

  let validation_form = [
    { field: "merk", required: true },
    { field: "kategori", required: true },
    { field: "harga", required: true },
    { field: "rating", required: true },
  ];

  let isValid = false;
  let statusValid = 0;
  validation_form.forEach(function (validation) {
    if (
      validation["required"] == true &&
      form_data.querySelector("." + validation["field"]).value == ""
    ) {
      form_data.querySelector("." + validation["field"] + "-error").innerHTML =
        "Harus Diisi";
    } else {
      isValid = true;
      statusValid += 1;
    }
  });

  // cek jumlah syarat kolom input yang wajib (ada 4 /sejumlah validation form)
  if (isValid && statusValid >= validation_form.length) {
    data_sepatu.push({
      id: data_sepatu.length + 1,
      merk: merk,
      kategori: kategori,
      harga: parseInt(harga),
      rating: rating,
      gambar: "default-picture.jpg",
    });
  }

  data = data_sepatu;

  showDataSepatu();
  display_data_sepatu();
  console.log(data_sepatu);
}

let btn_close_form = document.getElementById("btn-close-form");
btn_close_form.addEventListener("click", function (event) {
  document.getElementById("form-section").setAttribute("style", "display:hide");
  event.preventDefault();
});
function updateFields(element) {
  if (element.value != "") {
    document.getElementsByClassName(element.name + "-error")[0].innerHTML = "";
  }
}

function filterProducts() {
  let cari = document.getElementById("cari").value.toLowerCase();
  console.log("ini cari" + cari);
  if (cari != "") {
    data_sepatu = data_sepatu.filter(
      (sepokat) =>
        sepokat.merk.toLowerCase().includes(cari) ||
        sepokat.kategori.toLowerCase().includes(cari) ||
        sepokat.harga.toString().includes(cari)
    );
  } else {
    data_sepatu = data;
  }
  console.log("data_sepatu");
  console.log(data_sepatu);

  let order = document.getElementById("Filter-sort").value;
  // console.log("ini" + order);
  if (order == "asc") {
    data_sepatu = data_sepatu.sort((a, b) => a.merk.localeCompare(b.merk));
  } else if (order == "desc") {
    data_sepatu = data_sepatu.sort((a, b) => b.merk.localeCompare(a.merk));
  } else if (order == "hrg_asc") {
    data_sepatu = data_sepatu.sort((a, b) => a.harga - b.harga);
  } else if (order == "hrg_desc") {
    data_sepatu = data_sepatu.sort((a, b) => b.harga - a.harga);
  }

  showDataSepatu();
  display_data_sepatu();
}
