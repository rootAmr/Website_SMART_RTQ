const rowsPerPage = 5; // Show 5 rows per page
let currentPage = 1;
let totalPages = 1;
let allData = [];
const maxPageButtons = 5; // Maximum number of page buttons to display

// Function to render table data
function renderTable(data, page) {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    const residentsTable = document.getElementById('residents-table').getElementsByTagName('tbody')[0];
    residentsTable.innerHTML = ''; // Clear the table

    paginatedData.forEach((resident, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${startIndex + index + 1}</td> <!-- Add Nomor column -->
            <td>${resident.NAMA || 'N/A'}</td>
            <td>${resident["Status Kependudukan"] || 'N/A'}</td>
            <td>${resident.NIK || 'N/A'}</td>
            <td>${resident["T.LAHIR"] || 'N/A'}</td>
            <td>${resident["JENIS KELAMIN"] || 'N/A'}</td>
            <td>${resident.PEKERJAAN || 'N/A'}</td>
            <td>${resident.ALAMAT || 'N/A'}</td>
            <td>${resident.AGAMA || 'N/A'}</td>
            <td>${resident.Age || 'N/A'}</td>
            <td>${resident.rentang_umur || 'N/A'}</td>
        `;
        residentsTable.appendChild(row);
    });
}

// Function to render pagination controls
function renderPagination(pages) {
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = ''; // Clear the pagination controls

    // Previous button
    const prevItem = document.createElement('li');
    prevItem.className = 'page-item' + (currentPage === 1 ? ' disabled' : '');
    const prevLink = document.createElement('a');
    prevLink.className = 'page-link';
    prevLink.textContent = 'Previous';
    prevLink.href = '#';
    prevLink.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderTable(allData, currentPage);
            renderPagination(totalPages);
        }
    });
    prevItem.appendChild(prevLink);
    paginationControls.appendChild(prevItem);

    // Page number buttons
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(pages, startPage + maxPageButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = 'page-item' + (i === currentPage ? ' active' : '');
        const pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.textContent = i;
        pageLink.href = '#';
        pageLink.addEventListener('click', (event) => {
            event.preventDefault();
            currentPage = i;
            renderTable(allData, currentPage);
            renderPagination(totalPages);
        });
        pageItem.appendChild(pageLink);
        paginationControls.appendChild(pageItem);
    }

    // Next button
    const nextItem = document.createElement('li');
    nextItem.className = 'page-item' + (currentPage === pages ? ' disabled' : '');
    const nextLink = document.createElement('a');
    nextLink.className = 'page-link';
    nextLink.textContent = 'Next';
    nextLink.href = '#';
    nextLink.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage < pages) {
            currentPage++;
            renderTable(allData, currentPage);
            renderPagination(totalPages);
        }
    });
    nextItem.appendChild(nextLink);
    paginationControls.appendChild(nextItem);
}

// Function to handle search
function handleSearch() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredData = allData.filter(resident => {
        return Object.values(resident).some(value =>
            value.toString().toLowerCase().includes(query)
        );
    });
    totalPages = Math.ceil(filteredData.length / rowsPerPage);
    currentPage = 1; // Reset to first page
    renderTable(filteredData, currentPage);
    renderPagination(totalPages);
}

// Function to handle clearing the search input
function clearSearch() {
    document.getElementById('search-input').value = '';
    handleSearch(); // Trigger search with empty query
}

// Add event listener for the search button
document.getElementById('search-button').addEventListener('click', handleSearch);

// Add event listener for the clear button
document.getElementById('clear-button').addEventListener('click', clearSearch);

// Fetch resident data and initialize table and pagination
function fetchAndRenderData() {
    fetch('/api/data/residents')
        .then(response => response.json())
        .then(data => {
            allData = data;
            totalPages = Math.ceil(allData.length / rowsPerPage);
            renderTable(allData, currentPage);
            renderPagination(totalPages);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Initial data fetch and render
fetchAndRenderData();
