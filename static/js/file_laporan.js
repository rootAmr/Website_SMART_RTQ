        // Function to fetch and display data
        function fetchData(status) {
            // Make an API call to fetch the age range counts based on status
            fetch(`/agerange?status=${status}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Clear any existing table rows
                    const tbody = document.getElementById('ageRangeTable').querySelector('tbody');
                    tbody.innerHTML = '';

                    // Define age ranges
                    const ageRanges = ['0-6', '7-9', '10-13', '14-16', '17-19', '20-30', '31-40', '41-50', '51-60', '61 keatas'];

                    // Iterate over the age ranges and append rows to the table
                    ageRanges.forEach(ageRange => {
                        const row = document.createElement('tr');

                        // Create cells for age range, male count, female count, and total count
                        const ageRangeCell = document.createElement('td');
                        ageRangeCell.textContent = ageRange;
                        const maleCell = document.createElement('td');
                        maleCell.textContent = data[`L-${ageRange}`] || 0;
                        const femaleCell = document.createElement('td');
                        femaleCell.textContent = data[`P-${ageRange}`] || 0;
                        const totalCell = document.createElement('td');
                        totalCell.textContent = data[`T-${ageRange}`] || 0;

                        // Append cells to the row
                        row.appendChild(ageRangeCell);
                        row.appendChild(maleCell);
                        row.appendChild(femaleCell);
                        row.appendChild(totalCell);

                        // Append the row to the table body
                        tbody.appendChild(row);
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }

        // Function to handle button clicks
        function handleButtonClick(status) {
            const permanentButton = document.getElementById('permanentButton');
            const nonPermanentButton = document.getElementById('nonPermanentButton');

            // Toggle button states
            if (status === 'PERMANEN') {
                permanentButton.classList.add('btn-primary');
                permanentButton.classList.remove('btn-secondary');
                permanentButton.disabled = true;

                nonPermanentButton.classList.add('btn-secondary');
                nonPermanentButton.classList.remove('btn-primary');
                nonPermanentButton.disabled = false;
            } else {
                nonPermanentButton.classList.add('btn-primary');
                nonPermanentButton.classList.remove('btn-secondary');
                nonPermanentButton.disabled = true;

                permanentButton.classList.add('btn-secondary');
                permanentButton.classList.remove('btn-primary');
                permanentButton.disabled = false;
            }

            // Fetch the appropriate data
            fetchData(status);
        }

        // Fetch PERMANEN data by default when the page loads
        document.addEventListener('DOMContentLoaded', () => handleButtonClick('PERMANEN'));

        // Set up event listeners for the buttons
        document.getElementById('permanentButton').addEventListener('click', () => handleButtonClick('PERMANEN'));
        document.getElementById('nonPermanentButton').addEventListener('click', () => handleButtonClick('NON PERMANEN'));
        
        // Event listener for the OK button
        document.getElementById('okButton').addEventListener('click', () => {
            const status = document.querySelector('.btn-primary').textContent.trim();
            
            // Display the loading GIF
            const loadingGif = document.getElementById('loadingGif');
            loadingGif.style.display = 'inline';
        
            // Construct the URL for generating the document
            const generateDocumentUrl = `/generate-document?status=${status}`;
            
            // Create an iframe to trigger the download and monitor it
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = generateDocumentUrl;
            document.body.appendChild(iframe);
        
            // Remove the loading GIF after a delay assuming the download completes
            setTimeout(() => {
                loadingGif.style.display = 'none';
            }, 5000); // Adjust the delay as needed (5 seconds in this example)
        
            // Remove the iframe after a short period to clean up
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 6000); // Slightly longer delay to ensure the iframe is no longer needed
        });