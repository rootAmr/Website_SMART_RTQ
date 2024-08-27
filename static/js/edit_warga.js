const rowsPerPage = 5; // Show 5 rows per page
let currentPage = 1;
let totalPages = 1;
let allData = [];
const maxPageButtons = 5; // Maximum number of page buttons to display

// Function to render table data
function handleDelete(residentId) {
    // Make an API call to delete the resident
    fetch(`/api/delete/resident?nik=${residentId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(`Error: ${data.error}`);
        } else {
            alert('Data Berhasil di Hapus');
            fetchAndRenderData();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while deleting the resident.');
    });
}

function handleEdit(residentId) {
    // Redirect to the edit form page with the residentId (NIK) as a query parameter
    window.location.href = `/edit/formulir/warga?nik=${residentId}`;
}

if (window.location.search.includes('refetch=true')) {
    fetchAndRenderData();
}

// Function to fetch and render data
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

// Example function to reload table data
function loadTableData(page = 1) {
    fetch('/api/residents') // Replace with your API endpoint to get residents data
        .then(response => response.json())
        .then(data => {
            renderTable(data, page); // Render the table with the updated data
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function handleEdit(residentId) {
    // Redirect to the edit form page with the residentId (NIK) as a query parameter
    window.location.href = `/edit/formulir/warga?nik=${residentId}`;
}

function renderTable(data, page) {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    const residentsTable = document.getElementById('residents-table').getElementsByTagName('tbody')[0];
    residentsTable.innerHTML = ''; // Clear the table

    paginatedData.forEach((resident, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td>${resident.NAMA || 'N/A'}</td>
            <td>${resident["Status Kependudukan"] || 'N/A'}</td>
            <td>${resident.NIK || 'N/A'}</td>
            <td>${resident["T.LAHIR"] || 'N/A'}</td>
            <td>${resident["JENIS KELAMIN"] || 'N/A'}</td>
            <td>${resident.PEKERJAAN || 'N/A'}</td>
            <td>${resident.ALAMAT || 'N/A'}</td>
            <td>
                <button class="btn btn-sm btn-warning edit-button" data-id="${resident.NIK}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                    </svg>
                </button>
                <button class="btn btn-sm btn-danger delete-button" data-id="${resident.NIK}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </button>
            </td>
        `;
        residentsTable.appendChild(row);
    });

    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const residentId = button.getAttribute('data-id');
            handleEdit(residentId);
        });
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const residentId = button.getAttribute('data-id');
            $('#deleteModal').modal('show'); // Show the modal

            // Set up the confirmation button with the appropriate resident ID
            const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
            confirmDeleteBtn.onclick = () => {
                handleDelete(residentId);
                $('#deleteModal').modal('hide'); // Hide the modal after confirmation
            };
        });
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
