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

//            // Check if both data structures are present and valid
//            if (data && data.urlData && data.deadLinkData) {
//             // Display URL and Label Data in one box
//             document.getElementById('urlData').textContent = JSON.stringify(data.urlData.anchorData, null, 2);

//             // Display Dead Links Data in the other box
//             document.getElementById('deadLinkData').textContent = JSON.stringify(data.deadLinkData.invalidHref, null, 2);
//         } else {
//             console.error('Fetched data is not in the expected format:', data);
//             document.getElementById('urlData').textContent = 'No data available.';
//             document.getElementById('deadLinkData').textContent = 'No data available.';
//         }
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
// window.onload = fetchUrlData;



  




 // Attach event listener to the form submit event
document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    fetchUrlData(); // Call fetchUrlData when form is submitted
});

// Ensure loader works for fetchUrlData on form submit
async function fetchUrlData() {
    try {
        toggleLoader(true); // Show loader when starting the fetch
        const urlInput = document.getElementById('urlInput').value; // Get the URL from input

        // Perform fetch with the provided URL
        const response = await fetch('/fetch-url-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: urlInput }) // Send URL in the request body
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Data fetched from server:', data);

            // Display the data in the specified blocks
            if (data.urlData) {
                document.getElementById('urlData').textContent = JSON.stringify(data.urlData.anchorData, null, 2);
            } else {
                document.getElementById('urlData').textContent = 'No URL and Label data available.';
            }

            if (data.deadLinkData) {
                document.getElementById('deadLinkData').textContent = JSON.stringify(data.deadLinkData.invalidHref, null, 2);
            } else {
                document.getElementById('deadLinkData').textContent = 'No dead link data available.';
            }
        } else {
            console.error('Error fetching URL data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching URL data:', error);
    } finally {
        toggleLoader(false); // Hide loader when fetch is complete
    }
}

// Example loader toggle function
function toggleLoader(show) {
    const loader = document.getElementById('loader');
    loader.style.display = show ? 'block' : 'none';
}
