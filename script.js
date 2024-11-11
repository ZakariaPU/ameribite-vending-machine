fetch("../json/vending-machine.json")
  .then((response) => response.json())
  .then((data) => {
    //--------------------------------------------SCORECARD---------------------------------------------------------
    // Transaction Count
    const dataTransaction = data.length;

    const dataProduct = data.map(function (row) {
      return row.Product;
    });
    const countProduct = new Set(dataProduct).size;

    // Category Count
    const dataCategory = data.map(function (row) {
      return row.Category;
    });
    const countCategory = new Set(dataCategory).size;

    // Machine Count
    const dataMachine = data.map(function (row) {
      return row.Machine;
    });
    const countMachine = new Set(dataMachine).size;

    // Location Count
    const dataLokasi = data.map(function (row) {
      return row.Location;
    });
    const countLocation = new Set(dataLokasi).size;

    // Mendapatkan elemen HTML tempat kita akan menyisipkan nilai
    const countTransactionElement = document.getElementById("transaction");
    const countProductElement = document.getElementById("product");
    const countCategoryElement = document.getElementById("category");
    const countMachineElement = document.getElementById("machine");
    const countLocationElement = document.getElementById("location");

    // Menyisipkan nilai ke dalam elemen HTML
    countTransactionElement.textContent = dataTransaction;
    countProductElement.textContent = countProduct;
    countCategoryElement.textContent = countCategory;
    countMachineElement.textContent = countMachine;
    countLocationElement.textContent = countLocation;

    //--------------------------------------CHART-------------------------------------------------------------------
    // Grafik Number Of Products Per Machine
    const ctx2 = document.getElementById("myChart2").getContext("2d");
    const productCounts = {};
    data.forEach((item) => {
      const machineID = item.Machine;
      productCounts[machineID] = (productCounts[machineID] || 0) + 1;
    });
    const productLabels = Object.keys(productCounts);
    const productCountsValues = Object.values(productCounts);
    const chart2 = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: productLabels,
        datasets: [
          {
            label: "Products per Machine",
            data: productCountsValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",   
              "rgba(54, 162, 235, 0.2)",   
              "rgba(0, 255, 0, 0.2)",      
              "rgba(255, 159, 64, 0.2)",   
              "rgba(128, 0, 128, 0.2)"     
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",    
              "rgba(54, 162, 235, 1)",    
              "rgba(0, 255, 0, 1)",       
              "rgba(255, 159, 64, 1)",    
              "rgba(128, 0, 128, 1)"      
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y', // Mengubah sumbu indeks menjadi sumbu y
        responsive: true,
        scales: {
          x: { // Mengatur skala untuk sumbu x
            beginAtZero: true,
            precision: 0,
          },
        },
      },
    });
    
    // Tambahkan event listener untuk tombol download
    document.getElementById("downloadMachine").addEventListener("click", function() {
      const a = document.createElement('a');
      a.href = chart2.toBase64Image();
      a.download = 'Products per Machine.png';
      a.click();
    });
        

    // Grafik Number of Products Per Category
    const ctx3 = document.getElementById("myChart3").getContext("2d");
    const categoryCounts = {};
    data.forEach((item) => {
      const category = item.Category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    const categoryLabels = Object.keys(categoryCounts);
    const categoryCountsValues = Object.values(categoryCounts);
    const chart3 = new Chart(ctx3, {
      type: "bar",
      data: {
        labels: categoryLabels,
        datasets: [
          {
            label: "Products per Category",
            data: categoryCountsValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",   
              "rgba(54, 162, 235, 0.2)",   
              "rgba(0, 255, 0, 0.2)",      
              "rgba(255, 159, 64, 0.2)"    
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",    
              "rgba(54, 162, 235, 1)",    
              "rgba(0, 255, 0, 1)",       
              "rgba(255, 159, 64, 1)"     
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y', // Mengubah sumbu indeks menjadi sumbu y
        responsive: true,
        scales: {
          x: { // Mengatur skala untuk sumbu x
            beginAtZero: true,
            precision: 0,
          },
        },
      },
    });
    
    document.getElementById("downloadCategories").addEventListener("click", function() {
      const a = document.createElement('a');
      a.href = chart3.toBase64Image();
      a.download = 'Products per Category.png';
      a.click();
    });
    
    
    // Grafik Number Of Distinct Product Per Location
    const productsPerLocation = {};
    data.forEach((item) => {
      const location = item.Location;
      if (!productsPerLocation[location]) {
        productsPerLocation[location] = new Set();
      }
      productsPerLocation[location].add(item.Product);
    });
    
    const locationLabels = Object.keys(productsPerLocation);
    const productsCountPerLocation = Object.values(productsPerLocation).map(set => set.size);
    
    // Mengurutkan data berdasarkan jumlah produk berbeda per lokasi
    const sortedData = locationLabels.map((label, index) => ({
      label: label,
      count: productsCountPerLocation[index],
    })).sort((a, b) => b.count - a.count);
    
    const sortedLabels = sortedData.map(item => item.label);
    const sortedCounts = sortedData.map(item => item.count);
    
    const ctx4 = document.getElementById("myChart4").getContext("2d");
    const chart4 = new Chart(ctx4, {
      type: "bar",
      data: {
        labels: sortedLabels,
        datasets: [
          {
            label: "Number of Distinct Products per Location",
            data: sortedCounts,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",   
              "rgba(54, 162, 235, 0.2)",   
              "rgba(0, 255, 0, 0.2)",      
              "rgba(255, 159, 64, 0.2)"    
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",    
              "rgba(54, 162, 235, 1)",   
              "rgba(0, 255, 0, 1)",       
              "rgba(255, 159, 64, 1)"     
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y', // Mengubah sumbu indeks menjadi sumbu y
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            precision: 0,
          },
        },
      },
    });
    

    // Grafik Average Transtotal Per Location
    const ctx5 = document.getElementById("myChart5").getContext("2d");
    const averageTransTotalPerLocation = {};
    const locationCount = {};
    data.forEach((item) => {
      const location = item.Location;
      const transTotal = parseFloat(item.TransTotal);
      averageTransTotalPerLocation[location] =
        (averageTransTotalPerLocation[location] || 0) + transTotal;
      locationCount[location] = (locationCount[location] || 0) + 1;
    });
    Object.keys(averageTransTotalPerLocation).forEach((location) => {
      averageTransTotalPerLocation[location] /= locationCount[location];
    });
    const locationLabels5 = Object.keys(averageTransTotalPerLocation);
    const averageTransTotalValues = Object.values(averageTransTotalPerLocation);
    const chart5 = new Chart(ctx5, {
      type: "pie",
      data: {
        labels: locationLabels5,
        datasets: [
          {
            label: "Average TransTotal per Location",
            data: averageTransTotalValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",   
              "rgba(54, 162, 235, 0.2)",   
              "rgba(0, 255, 0, 0.2)",      
              "rgba(255, 159, 64, 0.2)"    
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",    
              "rgba(54, 162, 235, 1)",    
              "rgba(0, 255, 0, 1)",       
              "rgba(255, 159, 64, 1)"     
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            precision: 0,
          },
        },
      },
    });

    // Tambahkan event listener untuk tombol download
   document.getElementById("downloadLocation1").addEventListener("click", function() {
    const canvas = document.getElementById('combinedChart');
    const context = canvas.getContext('2d');
    
    // Tentukan ukuran canvas gabungan
    const width = Math.max(chart4.width, chart5.width);
    const height = chart4.height + chart5.height + 50; 
    
    canvas.width = width;
    canvas.height = height;
    
    // Gambar chart pertama
    context.drawImage(chart4.canvas, 0, 0);
    
    // Gambar chart kedua di bawah chart pertama
    context.drawImage(chart5.canvas, 0, chart4.height + 50);
    
    // Unduh gambar gabungan
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'Combined_Charts_PerLocation.png';
    a.click();
    });

    //Grafik Sales Trend
    const salesTrendData = {};
    // Proses pengumpulan data sales trend
    data.forEach((item) => {
      const date = new Date(item.Prcd_Date);
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const category = item.Category;
      const price = parseFloat(item.MPrice);
      const monthYear = `${month} ${year}`;

      if (!salesTrendData[category]) {
        salesTrendData[category] = {};
      }

      if (!salesTrendData[category][monthYear]) {
        salesTrendData[category][monthYear] = [];
      }

      salesTrendData[category][monthYear].push(price);
    });

    // Membuat list bulan dan tahun dalam urutan yang benar
    const monthsInOrder = [];
    for (let year = 2022; year <= 2023; year++) {
      for (let month = 0; month < 12; month++) {
        const monthName = new Date(year, month).toLocaleString("default", {
          month: "long",
        });
        monthsInOrder.push(`${monthName} ${year}`);
        // Memeriksa apakah sudah mencapai Januari 2023
        if (year === 2023 && month === 0) {
          break;
        }
      }
    }

    // Menghitung rata-rata harga produk per kategori per bulan
    const salesTrendLabels = Object.keys(salesTrendData);
    const salesTrendValues = {};
    salesTrendLabels.forEach((category) => {
      salesTrendValues[category] = [];
      monthsInOrder.forEach((monthYear) => {
        const prices = salesTrendData[category][monthYear] || [];
        const sum = prices.reduce((total, price) => total + price, 0);
        const averagePrice = prices.length ? sum / prices.length : 0;
        salesTrendValues[category].push(averagePrice);
      });
    });

    // Membuat grafik sales trend per kategori dengan tipe "line"
    const ctx6 = document.getElementById("myChart6").getContext("2d");
    const chart6 = new Chart(ctx6, {
      type: "line",
      data: {
        labels: monthsInOrder,
        datasets: Object.keys(salesTrendData).map((category, index) => ({
          label: category,
          data: salesTrendValues[category],
          fill: "origin",
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",  
            "rgba(54, 162, 235, 0.2)",  
            "rgba(0, 255, 0, 0.2)",     
            "rgba(255, 159, 64, 0.2)",  
          ][index % 4],
          borderColor: [
            "rgba(255, 99, 132, 1)",  
            "rgba(54, 162, 235, 1)",  
             "rgba(0, 255, 0, 1)",     
            "rgba(255, 159, 64, 1)",  
          ][index % 4],
          borderWidth: 2,
        })),
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
            precision: 2,
          },
        },
      },
    });

    //Grafik Transaction Count Per Mounth    
        // Mengumpulkan data transaksi per bulan dari Januari 2022 hingga Januari 2023
        const transactionDataPerMonth = {};
        for (let year = 2022; year <= 2023; year++) {
          const endMonth = year === 2023 ? 1 : 12; // Jika tahun 2023, berhenti di Januari
          for (let month = 0; month < endMonth; month++) {
            const date = new Date(year, month, 1);
            const monthName = date.toLocaleString("default", { month: "long" });
            const formattedMonth = `${monthName} ${year}`;
            // Inisialisasi jumlah transaksi untuk setiap bulan
            transactionDataPerMonth[formattedMonth] = 0;
          }
        }

        // Mengisi data transaksi yang sebenarnya
        data.forEach((item) => {
          const date = new Date(item.TransDate);
          const month = date.toLocaleString("default", { month: "long" });
          const year = date.getFullYear();
          // Mengecek apakah bulan dan tahun sesuai dengan rentang yang diinginkan
          if (year === 2022 || (year === 2023 && date.getMonth() === 0)) {
            const formattedMonth = `${month} ${year}`;
            // Meningkatkan jumlah transaksi untuk bulan yang sesuai
            transactionDataPerMonth[formattedMonth]++;
          }
        });

        // Memisahkan label bulan dan jumlah transaksi
        const labels = Object.keys(transactionDataPerMonth);
        const values = Object.values(transactionDataPerMonth);

        // Mendapatkan konteks dari elemen canvas pada HTML
        const ctx = document.getElementById("myChart7").getContext("2d");

        // Membuat grafik garis
        const transactionPerformanceChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Transaction Count Per Month",
                data: values,
                fill: false,
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                },
              },
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                },
              },
            },
          },
        });

        document.getElementById('downloadTanggal').addEventListener('click', () => {
          const combinedCanvas = document.getElementById('combinedChart');
          combinedCanvas.width = 800;
          combinedCanvas.height = 800;
          const ctx = combinedCanvas.getContext('2d');
      
          // Clear the combined canvas
          ctx.clearRect(0, 0, combinedCanvas.width, combinedCanvas.height);
      
          // Draw the first chart
          ctx.drawImage(document.getElementById('myChart6'), 0, 0, 800, 400);
      
          // Draw the second chart
          ctx.drawImage(document.getElementById('myChart7'), 0, 400, 800, 400);
      
          // Create a download link
          const link = document.createElement('a');
          link.href = combinedCanvas.toDataURL('image/png');
          link.download = 'Combined_Chart_ByDate.png';
          link.click();
        });
    //----------------------------------------------------FILTER------------------------------------------------------

    //Fungsi untuk filter chart Number Of Product Per Machine
       // Elemen HTML untuk filter machine
      const machineFilter = document.getElementById("machineFilter");

      // Membuat checkbox "Select All" untuk machine
      const selectAllLabelMachine = document.createElement("label");
      const selectAllCheckboxMachine = document.createElement("input");
      selectAllCheckboxMachine.type = "checkbox";
      selectAllCheckboxMachine.value = "selectAll";
      selectAllCheckboxMachine.checked = true;
      selectAllCheckboxMachine.addEventListener("change", toggleSelectAllMachine);
      selectAllLabelMachine.appendChild(selectAllCheckboxMachine);
      selectAllLabelMachine.appendChild(document.createTextNode("Select All"));
      machineFilter.appendChild(selectAllLabelMachine);
      machineFilter.appendChild(document.createElement("br"));

      // Fungsi untuk mengubah semua checkbox machine
      function toggleSelectAllMachine() {
          const isChecked = selectAllCheckboxMachine.checked;
          machineFilter.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
              checkbox.checked = isChecked;
          });
          updateMachineChart();
      }

    // Mendapatkan machine unik dari data
    const uniqueMachine = [...new Set(data.map(item => item.Machine))];

    // Membuat checkbox untuk setiap machine unik
    uniqueMachine.forEach(machine => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = machine;
        checkbox.checked = true;
        checkbox.addEventListener("change", updateMachineChart);
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(machine));
        machineFilter.appendChild(label);
        machineFilter.appendChild(document.createElement("br"));
    });

    // Fungsi untuk memperbarui chart2 berdasarkan machine yang dipilih
    function updateMachineChart() {
        const selectedMachine = Array.from(machineFilter.querySelectorAll("input[type='checkbox']:checked"))
            .filter(input => input.value !== 'selectAll')
            .map(input => input.value);

        const machineCounts = {};
        data.forEach((item) => {
            if (selectedMachine.includes(item.Machine)) {
                const machine = item.Machine;
                machineCounts[machine] = (machineCounts[machine] || 0) + 1;
            }
        });

        const machineLabels = Object.keys(machineCounts);
        const machineCountsValues = Object.values(machineCounts);

        chart2.data.labels = machineLabels;
        chart2.data.datasets[0].data = machineCountsValues;
        chart2.update();
    }


        //Fungsi untuk filter chart Number Of Product Per Category
        // Elemen HTML untuk filter kategori
        const categoryFilter = document.getElementById("categoryFilter");

        // Membuat checkbox "Select All" untuk kategori
        const selectAllLabelCategory = document.createElement("label");
        const selectAllCheckboxCategory = document.createElement("input");
        selectAllCheckboxCategory.type = "checkbox";
        selectAllCheckboxCategory.value = "selectAll";
        selectAllCheckboxCategory.checked = true;
        selectAllCheckboxCategory.addEventListener("change", toggleSelectAllCategories);
        selectAllLabelCategory.appendChild(selectAllCheckboxCategory);
        selectAllLabelCategory.appendChild(document.createTextNode("Select All"));
        categoryFilter.appendChild(selectAllLabelCategory);
        categoryFilter.appendChild(document.createElement("br"));

        // Fungsi untuk mengubah semua checkbox kategori
        function toggleSelectAllCategories() {
            const isChecked = selectAllCheckboxCategory.checked;
            categoryFilter.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
                checkbox.checked = isChecked;
            });
            updateCategoryChart();
        }

    // Mendapatkan kategori unik dari data
    const uniqueCategories = [...new Set(data.map(item => item.Category))];

    // Membuat checkbox untuk setiap kategori unik
    uniqueCategories.forEach(category => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = category;
        checkbox.checked = true;
        checkbox.addEventListener("change", updateCategoryChart);
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(category));
        categoryFilter.appendChild(label);
        categoryFilter.appendChild(document.createElement("br"));
    });

    // Fungsi untuk memperbarui chart3 berdasarkan kategori yang dipilih
    function updateCategoryChart() {
        const selectedCategories = Array.from(categoryFilter.querySelectorAll("input[type='checkbox']:checked"))
            .filter(input => input.value !== 'selectAll')
            .map(input => input.value);

        const categoryCounts = {};
        data.forEach((item) => {
            if (selectedCategories.includes(item.Category)) {
                const category = item.Category;
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            }
        });

        const categoryLabels = Object.keys(categoryCounts);
        const categoryCountsValues = Object.values(categoryCounts);

        chart3.data.labels = categoryLabels;
        chart3.data.datasets[0].data = categoryCountsValues;
        chart3.update();
    }

    
    //Fungsi untuk filter chart Average Transtotal Per Location
    const locationFilter = document.getElementById("locationFilter");
    // Create "Select All" checkbox
    const selectAllLabel = document.createElement("label");
    const selectAllCheckbox = document.createElement("input");
    selectAllCheckbox.type = "checkbox";
    selectAllCheckbox.value = "selectAll";
    selectAllCheckbox.checked = true;
    selectAllCheckbox.addEventListener("change", toggleSelectAll);
    selectAllLabel.appendChild(selectAllCheckbox);
    selectAllLabel.appendChild(document.createTextNode("Select All"));
    locationFilter.appendChild(selectAllLabel);
    locationFilter.appendChild(document.createElement("br"));

    // Function to toggle select all checkboxes
    function toggleSelectAll() {
      const isChecked = selectAllCheckbox.checked;
      const checkboxes = locationFilter.querySelectorAll("input[type='checkbox']");
      checkboxes.forEach(checkbox => {
          checkbox.checked = isChecked;
      });
      updateCharts();
    }

    // Get unique locations from data
    const uniqueLocations = [...new Set(data.map(item => item.Location))];

    // Create checkbox for each unique location
    uniqueLocations.forEach(location => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = location;
      checkbox.checked = true;
      checkbox.addEventListener("change", updateCharts);
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(location));
      locationFilter.appendChild(label);
      locationFilter.appendChild(document.createElement("br"));
    });

    function updateCharts() {
        const selectedLocations = Array.from(locationFilter.querySelectorAll("input[type='checkbox']:checked"))
            .filter(input => input.value !== 'selectAll')
            .map(input => input.value);

        // Update chart4 (Number of Distinct Products Per Location)
        const productsPerLocation = {};
        data.forEach((item) => {
            if (selectedLocations.includes(item.Location)) {
                const location = item.Location;
                productsPerLocation[location] = productsPerLocation[location] || new Set();
                productsPerLocation[location].add(item.Product);
            }
        });

        const locationLabels = Object.keys(productsPerLocation);
        const productsCountPerLocation = Object.values(productsPerLocation).map(set => set.size);

        chart4.data.labels = locationLabels;
        chart4.data.datasets[0].data = productsCountPerLocation;
        chart4.update();

        // Update chart5 (Average TransTotal Per Location)
        const averageTransTotalPerLocation = {};
        const locationCount = {};
        data.forEach((item) => {
            if (selectedLocations.includes(item.Location)) {
                const location = item.Location;
                const transTotal = parseFloat(item.TransTotal);
                averageTransTotalPerLocation[location] = (averageTransTotalPerLocation[location] || 0) + transTotal;
                locationCount[location] = (locationCount[location] || 0) + 1;
            }
        });

        Object.keys(averageTransTotalPerLocation).forEach((location) => {
            averageTransTotalPerLocation[location] /= locationCount[location];
        });

        const locationLabels5 = Object.keys(averageTransTotalPerLocation);
        const averageTransTotalValues = Object.values(averageTransTotalPerLocation);

        chart5.data.labels = locationLabels5;
        chart5.data.datasets[0].data = averageTransTotalValues;
        chart5.update();
    }
    updateCharts(); // Initial update


    //Fungsi untuk filter chart Sales Trend
    function filterChartSalesTrend() {
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
    
      // Filter data JSON berdasarkan tanggal transaksi
      const filteredData = data.filter(
        (item) =>
          new Date(item.Prcd_Date) >= new Date(startDate) &&
          new Date(item.Prcd_Date) <= new Date(endDate)
      );
    
      // Proses pengumpulan data sales trend dari data yang difilter
      const salesTrendData = {};
      filteredData.forEach((item) => {
        const date = new Date(item.Prcd_Date);
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        const category = item.Category;
        const price = parseFloat(item.MPrice);
        const monthYear = `${month} ${year}`;
    
        if (!salesTrendData[category]) {
          salesTrendData[category] = {};
        }
    
        if (!salesTrendData[category][monthYear]) {
          salesTrendData[category][monthYear] = [];
        }
    
        salesTrendData[category][monthYear].push(price);
      });
    
      // Membuat list bulan dan tahun dalam urutan yang benar
      const monthsInOrder = [];
      for (let year = 2022; year <= 2023; year++) {
        for (let month = 0; month < 12; month++) {
          const monthName = new Date(year, month).toLocaleString("default", {
            month: "long",
          });
          monthsInOrder.push(`${monthName} ${year}`);
          // Memeriksa apakah sudah mencapai Januari 2023
          if (year === 2023 && month === 0) {
            break; // Keluar dari loop jika sudah mencapai Januari 2023
          }
        }
      }
    
      // Menghitung rata-rata harga produk per kategori per bulan
      const salesTrendLabels = Object.keys(salesTrendData);
      const salesTrendValues = {};
      salesTrendLabels.forEach((category) => {
        salesTrendValues[category] = [];
        monthsInOrder.forEach((monthYear) => {
          const prices = salesTrendData[category][monthYear] || [];
          const sum = prices.reduce((total, price) => total + price, 0);
          const averagePrice = prices.length ? sum / prices.length : 0;
          salesTrendValues[category].push(averagePrice);
        });
      });
    
      // Perbarui data pada chart 
      chart6.data.labels = monthsInOrder;
      chart6.data.datasets = Object.keys(salesTrendData).map((category, index) => ({
        label: category,
        data: salesTrendValues[category],
        fill: "origin",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",  
          "rgba(54, 162, 235, 0.2)",  
          "rgba(0, 255, 0, 0.2)",     
          "rgba(255, 159, 64, 0.2)",  
        ][index % 4],
        borderColor: [
          "rgba(255, 99, 132, 1)",  
          "rgba(54, 162, 235, 1)",  
           "rgba(0, 255, 0, 1)",    
          "rgba(255, 159, 64, 1)",  
        ][index % 4],
        borderWidth: 2,
      }));
      chart6.update();
    }


    function filterChartTransactionCountPerMounth() {
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
    
      // Mengumpulkan data transaksi per bulan sesuai rentang tanggal
      const filteredTransactionDataPerMonth = {};
      for (let year = 2022; year <= 2022; year++) {
        const endMonth = 12; // Hanya tahun 2022, sehingga berhenti di Desember
        for (let month = 0; month < endMonth; month++) {
          const date = new Date(year, month, 1);
          const monthName = date.toLocaleString("default", { month: "long" });
          const formattedMonth = `${monthName} ${year}`;
    
          // Filter data transaksi berdasarkan rentang tanggal
          const filteredData = data.filter((item) => {
            const transDate = new Date(item.TransDate);
            return transDate >= new Date(startDate) && transDate <= new Date(endDate);
          });
    
          // Hitung jumlah transaksi untuk bulan yang sesuai
          filteredTransactionDataPerMonth[formattedMonth] = filteredData.filter((item) => {
            const transDate = new Date(item.TransDate);
            return transDate.getFullYear() === date.getFullYear() && transDate.getMonth() === date.getMonth();
          }).length;
        }
      }
    
      // Memisahkan label bulan dan jumlah transaksi
      const labels = Object.keys(filteredTransactionDataPerMonth);
      const values = Object.values(filteredTransactionDataPerMonth);
    
      // Update data pada chart
      transactionPerformanceChart.data.labels = labels;
      transactionPerformanceChart.data.datasets[0].data = values;
      transactionPerformanceChart.update();
    }

      // Function to confirm and filter charts
      function confirmAndFilterCharts() {
        if (confirm("Apakah Anda yakin untuk memfilter?")) {
          filterChartSalesTrend();
          filterChartTransactionCountPerMounth();
        }
      }
        // Tambahkan event listener pada tombol filter
        document.getElementById("filterBtn").addEventListener("click", confirmAndFilterCharts);
  });   