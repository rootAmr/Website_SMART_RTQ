// Fetch gender counts
fetch('/api/count/gender')
    .then(response => response.json())
    .then(data => {
        document.getElementById('male-count').textContent = data.male_count;
        document.getElementById('female-count').textContent = data.female_count;
    })
    .catch(error => {
        console.error('Error fetching gender counts:', error);
        document.getElementById('male-count').textContent = 'Error';
        document.getElementById('female-count').textContent = 'Error';
    });

// Fetch status counts
fetch('/api/count/status')
    .then(response => response.json())
    .then(data => {
        const statusList = document.getElementById('status-counts');
        statusList.innerHTML = ''; // Clear the list
        for (const status in data) {
            const listItem = document.createElement('li');
            listItem.textContent = `${status}: ${data[status]}`;
            statusList.appendChild(listItem);
        }
    })
    .catch(error => {
        console.error('Error fetching status counts:', error);
        const statusList = document.getElementById('status-counts');
        statusList.innerHTML = '<li>Error</li>';
    });

// Fetch age range counts
fetch('/api/count/age_ranges/permanent')
    .then(response => response.json())
    .then(data => {
        const ageRangeList = document.getElementById('age-range-counts');
        ageRangeList.innerHTML = ''; // Clear the list
        for (const range in data) {
            const countInfo = data[range];
            const listItem = document.createElement('li');
            listItem.textContent = `${range} - Laki-Laki: ${countInfo.L}, Perempuan: ${countInfo.P}, Total: ${countInfo.Total}`;
            ageRangeList.appendChild(listItem);
        }
    })
    .catch(error => {
        console.error('Error fetching age range counts:', error);
        const ageRangeList = document.getElementById('age-range-counts');
        ageRangeList.innerHTML = '<li>Error</li>';
    });

fetch('/api/count/total')
    .then(response => response.json())
    .then(data => {
        document.getElementById('total-residents').textContent = data.total_residents;
    })
    .catch(error => {
        console.error('Error fetching total residents:', error);
        document.getElementById('total-residents').textContent = 'Error';
    });

fetch('/api/data/residents')
    .then(response => response.json())
    .then(data => {
        // Assuming data is an array of resident objects
        const residentsTable = document.getElementById('residents-table');
        residentsTable.innerHTML = ''; // Clear the table

        // Define table headers in the exact order as your data keys
        const headers = [
            'NAMA', 
            'Status Kependudukan', 
            'NIK', 
            'T.LAHIR', 
            'JENIS KELAMIN', 
            'PEKERJAAN', 
            'ALAMAT', 
            'AGAMA', 
            'Age', 
            'rentang_umur'
        ];

        // Create table headers
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        residentsTable.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        data.forEach(resident => {
            const row = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = resident[header] || 'N/A'; // Use 'N/A' if data is undefined
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        residentsTable.appendChild(tbody);
    })
    .catch(error => {
        console.error('Error fetching resident data:', error);
        // Handle errors as needed
    });
