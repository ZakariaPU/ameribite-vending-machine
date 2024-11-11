fetch('../json/vending-machine.json')
    .then(response => response.json())
    .then(data => {
        $('#dataset').DataTable({
            data: data,
            "columns": [
                { "data": "Status" },
                { "data": "Device_ID" },
                { "data": "Machine" },
                { "data": "Location" },
                { "data": "Product" },
                { "data": "Category" },
                { "data": "Transaction" },
                { "data": "TransDate" },
                { "data": "Type" },
                { "data": "RCoil" },
                { "data": "RPrice" },
                { "data": "TransTotal" },
            ]
        });
    })
    .catch(error => console.error('Error fetching data:', error));

    $(document).ready(function() {
        $('#category').DataTable();
    });

