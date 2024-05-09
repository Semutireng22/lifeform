document.getElementById('apiForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  var addressesInput = document.getElementById('addresses').value;
  var addresses = addressesInput.split(",").map(address => address.trim()).filter(Boolean); // Memisahkan alamat berdasarkan koma

  fetchData(addresses);
});

function fetchData(addresses) {
  var responseContainer = document.getElementById('responseContainer');

  // Membuat tabel untuk menampilkan hasil
  var table = document.createElement('table');
  table.classList.add('response-table');
  var tbody = document.createElement('tbody');

  // Membuat baris header tabel
  var headerRow = document.createElement('tr');
  var headerAddress = document.createElement('th');
  headerAddress.textContent = 'Address';
  var headerResult = document.createElement('th');
  headerResult.textContent = 'Result';
  headerRow.appendChild(headerAddress);
  headerRow.appendChild(headerResult);
  tbody.appendChild(headerRow);

  // Iterasi melalui setiap alamat
  addresses.forEach(address => {
    var url = 'https://pandora.lifeform.cc/lifeform_bsc_prod/api/v2/public/checkWhiteList?account=' + address;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Membuat baris untuk setiap alamat
        var row = document.createElement('tr');
        var cellAddress = document.createElement('td');
        cellAddress.textContent = address;
        var cellResult = document.createElement('td');
        cellResult.textContent = data.result ? "✅" : "❌";

        row.appendChild(cellAddress);
        row.appendChild(cellResult);

        // Menambahkan baris ke dalam tabel
        tbody.appendChild(row);
      })
      .catch(error => {
        console.error('Error fetching data for address ' + address + ':', error);
      });
  });

  // Menambahkan tbody ke dalam tabel
  table.appendChild(tbody);

  // Menghapus isi sebelumnya dari container
  responseContainer.innerHTML = '';

  // Menambahkan tabel ke dalam container
  responseContainer.appendChild(table);
}
