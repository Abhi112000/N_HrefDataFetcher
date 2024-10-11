// document.getElementById('urlForm').addEventListener('submit', async function(event) {
//     event.preventDefault(); // Prevent default form submission behavior
//     const url = document.getElementById('urlInput').value;
//     console.log(`Submitting URL: ${url}`); // Debugging log
//     // Show the loader while fetching data
//     toggleLoader(true);
//     try {
//         const response = await fetch('/fetch-href-data', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ url })
//         });
//         if (response.ok) {
//             console.log('Data fetched successfully'); // Debugging log
//             await fetchUrlData(); // Fetch URL data after successfully fetching href data
//         } else {
//             console.error('Error fetching href data:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error fetching href data:', error);
//     } finally {
//         toggleLoader(false); // Hide the loader when the process completes
//     }
// });
// // Function to fetch the saved URL and dead link data
// async function fetchUrlData() {
//     try {
//         const response = await fetch('/get-url-data');
//         if (response.ok) {
//             const data = await response.json();
//             console.log('Data fetched from server:', data); // Debugging log
//             // Check if the data structure is as expected
//             if (data && data.anchorData) {
//                 document.getElementById('urlData').textContent = JSON.stringify(data.anchorData, null, 2);
//                 document.getElementById('deadLinkData').textContent = JSON.stringify(data.deadAnchorCounts ? data.deadAnchorCounts : 'No dead links found', null, 2);
//             } else {
//                 console.error('Fetched data is not in the expected format:', data);
//                 document.getElementById('urlData').textContent = 'No data available.';
//                 document.getElementById('deadLinkData').textContent = 'No data available.';
//             }
//         } else {
//             console.error('Error fetching URL data:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error fetching URL data:', error);
//     }
// }
// // Clear data button functionality
// document.getElementById('clearDataBtn').addEventListener('click', function() {
//     document.getElementById('urlData').textContent = 'No data fetched yet.';
//     document.getElementById('deadLinkData').textContent = 'No data fetched yet.';
// });
// // Function to toggle the loader spinner
// function toggleLoader(show) {
//     const loader = document.getElementById('loader');
//     loader.style.display = show ? 'block' : 'none'; // Show or hide the loader
// }
// // Optionally, call fetchUrlData on page load to display existing data
// window.onload = fetchUrlData; // Fetch data when the page loads


document.getElementById('urlForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const url = document.getElementById('urlInput').value;
    console.log(`Submitting URL: ${url}`); // Debugging log

    // Show the loader while fetching data
    toggleLoader(true);
    try {
        const response = await fetch('/fetch-href-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });
        if (response.ok) {
            console.log('Data fetched successfully'); // Debugging log
            await fetchUrlData(); // Fetch URL data after successfully fetching href data
        } else {
            console.error('Error fetching href data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching href data:', error);
    } finally {
        toggleLoader(false); // Hide the loader when the process completes
    }
});

// Function to fetch the saved URL and dead link data
async function fetchUrlData() {
    try {
        const response = await fetch('/get-url-data');
        if (response.ok) {
            const data = await response.json();
            console.log('Data fetched from server:', data); // Debugging log

            document.getElementById('urlData').textContent = JSON.stringify(data.anchorData, null, 2);
            document.getElementById('deadLinkData').textContent = JSON.stringify(data.deadAnchorCounts ? data.deadAnchorCounts : 'No dead links found', null, 2);
        } else {
            console.error('Error fetching URL data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching URL data:', error);
    }
}

// Clear data button functionality
document.getElementById('clearDataBtn').addEventListener('click', function() {
    document.getElementById('urlData').textContent = 'No data fetched yet.';
    document.getElementById('deadLinkData').textContent = 'No data fetched yet.';
});

// Function to toggle the loader spinner
function toggleLoader(show) {
    const loader = document.getElementById('loader');
    loader.style.display = show ? 'block' : 'none'; // Show or hide the loader
}

// Optionally, call fetchUrlData on page load to display existing data
window.onload = fetchUrlData;
