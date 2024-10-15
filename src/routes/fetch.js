// import puppeteer from 'puppeteer';
// import fs from 'fs/promises';
// import path from 'path';
// export const fetchHrefData = async (url) => {
//     const browser = await puppeteer.launch({
//         headless: true,
//         args: ['--no-sandbox', '--disable-setuid-sandbox']
//     });
//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: 'load' });
//     const anchorData = await page.evaluate(() => {
//         const anchors = Array.from(document.querySelectorAll('a'));
//         return anchors.map(anchor => ({
//             href: anchor.getAttribute('href'),
//             label: anchor.textContent.trim(),
//         }));
//     });
//     const validHrefAnchors = anchorData.filter(anchor => anchor.href);
//     const folderPath = path.join(process.cwd(), 'extractedURLFile');
//     await fs.mkdir(folderPath, { recursive: true });
//     const filePath = path.join(folderPath, 'URL_and_Label_pro.json');
//     const dataToSave = {
//         pageURL: url,
//         URLcounts: `Total number of hrefs: ${validHrefAnchors.length}`,
//         anchorData: validHrefAnchors
//     };
//     await fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2));
//     const deadLinks = anchorData.filter(anchor => anchor.href.includes('#'));
//     if (deadLinks.length > 0) {
//         const deadFilePath = path.join(folderPath, 'DeadLink_pro.json');
//         const deadAnchorData = {
//             pageURL: url,
//             deadAnchorCounts: `Total number of dead links: ${deadLinks.length}`,
//             invalidHref: deadLinks
//         };
//         await fs.writeFile(deadFilePath, JSON.stringify(deadAnchorData, null, 2));
//     }
//     await browser.close();
    
// };


// import puppeteer from 'puppeteer';
// import fs from 'fs/promises'; // Use fs/promises to handle promises
// import path from 'path';
// import sleep from '../../utilities/sleep.js';

// export async function fetchHrefData() {
 
//     // Launch a browser instance
//     const browser = await puppeteer.launch({
//         headless: false,
//         args: ['--start-maximized']
//     });

//     // Open a new page
//     const page = await browser.newPage();

//     // Navigate to a webpage and wait until the page is fully loaded
//     await page.goto(url, { waitUntil: 'load' });

//     await sleep(5000);

//     // Get the URL of the current page
//     const currentPageURL = page.url();
//     console.log(`Current Page URL: ${currentPageURL}`);

//     // Fetch all anchor tags and their href + label using page.evaluate
//     const anchorData = await page.evaluate(() => {
//         const anchors = Array.from(document.querySelectorAll('a'));

//         return anchors.map(anchor => {
//             const href = anchor.getAttribute('href');
//             const label = anchor.textContent.trim();
//             const fullHTML = anchor.outerHTML; // Get the full HTML of the anchor tag
//             const parentHTML = anchor.parentElement.outerHTML; // Get the full HTML of the parent element

//             // Return different data based on whether the href contains '#'
//             if (href && href.includes('#')) {
//                 return {
//                     href,
//                     label,
//                     fullHTML,
//                     parentHTML
//                 };
//             } else {
//                 return {
//                     href,
//                     label
//                 };
//             }
//         });
//     });

//     // Log the extracted anchor data
//     console.log(anchorData);

//     // Filter out anchors that have a valid href
//     const validHrefAnchors = anchorData.filter(anchor => anchor.href);

//     // Log the total number of valid hrefs
//     const URLcounts = (`Total number of hrefs: ${validHrefAnchors.length}`);
//     console.log(URLcounts);

//     const folderPath = "C:/Users/admin/Desktop/Puppeteer/A1_FetchURL_Website/extractedURLFile";
    
//     // Ensure the directory exists
//     try {
//         await fs.mkdir(folderPath, { recursive: true });
//     } catch (err) {
//         console.error('Error creating directory:', err);
//     }

//     const filePath = path.join(folderPath, 'URL_and_Label_pro.json');

//     // Prepare the data to save, including the page URL
//     const dataToSave = {
//         pageURL: currentPageURL,
//         URLcounts: URLcounts,
//         anchorData: validHrefAnchors
//     };

//     // Write the extracted data to a file in JSON array format
//     try {
//         await fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2)); // Write in pretty JSON format
//         console.log('The anchor data and page URL have been saved to extractedURLFile Folder');
//         console.log('--------------------------------------------------------------------------------');
//         console.log('Task Completed!');
//         console.log('--------------------------------------------------------------------------------');
//     } catch (err) {
//         console.error('Error writing to file', err);
//         console.log('--------------------------------------------------------------------------------');
//         console.log('Task Not Completed!');
//         console.log('--------------------------------------------------------------------------------');
//     }

//     // Check if the href has "#" value
//     try {
//         const anchorStatus = anchorData.filter(anchor => anchor.href === '#');
//         if (anchorStatus.length > 0) {
//             console.log('Has some dead links');

//             const InvalidHrefAnchors = anchorData.filter(anchor => anchor.href === '#');

//             // Log the total number of Invalid hrefs
//             const deadAnchorCounts = (`Total number of hrefs: ${InvalidHrefAnchors.length}`);
//             console.log(deadAnchorCounts);

//             const deadAnchorData = {
//                 currentPageURL: currentPageURL,
//                 deadAnchorCounts: deadAnchorCounts,
//                 invalidHref: InvalidHrefAnchors
//             };

//             const deadFilePath = path.join(folderPath, 'DeadLink_pro.json');

//             await fs.writeFile(deadFilePath, JSON.stringify(deadAnchorData, null, 2));
//         } else {
//             console.log('No Dead Links');
//         }
//     } catch (error) {
//         console.log(error);
//     }

//     // Close the browser
//     await browser.close();
// };







// import puppeteer from 'puppeteer';
// import fs from 'fs/promises';
// import path from 'path';
// import sleep from '../../utilities/sleep.js';

// // Pass `url` as a parameter to the function
// export async function fetchHrefData(url) {
//     const folderPathDeletion = "C:/Users/admin/Desktop/Project Href/extractedURLFile";
    
//     try {
//         const files = await fs.readdir(folderPathDeletion); // Get list of files
//         if (files.length > 0) {
//             console.log('Files found, proceeding with deletion:', files);
//             for (const file of files) {
//                 await fs.unlink(path.join(folderPathDeletion, file)); // Delete each file
//             }
//             console.log('All files deleted from the extractedURLFile folder');
//         } else {
//             console.log('No files found in the extractedURLFile folder, continuing execution...');
//         }
//     } catch (err) {
//         console.error('Error accessing or deleting files:', err);
//     }
    


//     // Launch a browser instance
//     const browser = await puppeteer.launch({
//         headless: true, // You probably want to keep this headless
//         args: ['--no-sandbox', '--disable-setuid-sandbox'] // Prevent sandboxing for smooth running in server environments
//     });

//     // Open a new page
//     const page = await browser.newPage();

//     // Navigate to a webpage and wait until the page is fully loaded
//     await page.goto(url, { waitUntil: 'load' });

//     await sleep(5000); // Add some delay if necessary

//     // Get the URL of the current page
//     const currentPageURL = page.url();
//     console.log(`Current Page URL: ${currentPageURL}`);

//     const anchorData = await page.evaluate(() => {
//         const anchors = Array.from(document.querySelectorAll('a'));
    
//         return anchors.map(anchor => {
//             const href = anchor.getAttribute('href');
//             const label = anchor.textContent.trim();
//             const fullHTML = anchor.outerHTML; // Full HTML of the anchor tag
//             const parentHTML = anchor.parentElement.outerHTML; // Full HTML of the parent element
    
//             // Classify anchors: valid vs. dead link
//             if (href && href !== '#' && href !== '' && !href.startsWith('javascript:')) {
//                 // Valid link
//                 return {
//                     href,
//                     label,
//                     fullHTML,
//                     parentHTML,
//                     isValid: true
//                 };
//             } else {
//                 // Dead link (invalid href)
//                 return {
//                     href: href || 'No href found',
//                     label,
//                     fullHTML,
//                     parentHTML,
//                     isValid: false
//                 };
//             }
//         });
//     });
    

//     // Log the extracted anchor data
//     // console.log(anchorData);

//     // Filter out anchors that have a valid href
//     const validHrefAnchors = anchorData.filter(anchor => anchor.href);

//     // Log the total number of valid hrefs
//     const URLcounts = `Total number of hrefs: ${validHrefAnchors.length}`;
//     // console.log(URLcounts);

//     const folderPath = path.join(process.cwd(), 'extractedURLFile');

//     // Ensure the directory exists
//     try {
//         await fs.mkdir(folderPath, { recursive: true });
//     } catch (err) {
//         console.error('Error creating directory:', err);
//     }

//     const filePath = path.join(folderPath, 'URL_and_Label_pro.json');

//     // Prepare the data to save, including the page URL
//     const dataToSave = {
//         pageURL: currentPageURL,
//         URLcounts: URLcounts,
//         anchorData: validHrefAnchors
//     };

//     // Write the extracted data to a file in JSON array format
//     try {
//         await fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2));
//         console.log('The anchor data and page URL have been saved.');
//     } catch (err) {
//         console.error('Error writing to file', err);
//     }

//     // Check for dead links (href="#")
//     try {
//         const deadLinks = anchorData.filter(anchor => anchor.href === '#');
//         if (deadLinks.length > 0) {
//             console.log('Found some dead links');

//             const deadAnchorCounts = `Total number of dead links: ${deadLinks.length}`;
//             console.log(deadAnchorCounts);

//             const deadAnchorData = {
//                 currentPageURL: currentPageURL,
//                 deadAnchorCounts,
//                 invalidHref: deadLinks
//             };

//             const deadFilePath = path.join(folderPath, 'DeadLink_pro.json');
//             await fs.writeFile(deadFilePath, JSON.stringify(deadAnchorData, null, 2));
//         } else {
//             console.log('No dead links found');
//         }
//     } catch (error) {
//         console.log('Error checking dead links:', error);
//     }

//     // Close the browser
//     await browser.close();
// }







// routes/fetch.js
import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import sleep from '../../utilities/sleep.js';

export async function fetchHrefData(url) {
    const folderPathDeletion = "C:/Users/admin/Desktop/Project Href/extractedURLFile";

    // Delete all files in the folder before proceeding
    try {
        const files = await fs.readdir(folderPathDeletion); // Get list of files
        if (files.length > 0) {
            console.log('Files found, proceeding with deletion:', files);
            for (const file of files) {
                await fs.unlink(path.join(folderPathDeletion, file)); // Delete each file
            }
            console.log('All files deleted from the extractedURLFile folder');
        } else {
            console.log('No files found in the extractedURLFile folder, continuing execution...');
        }
    } catch (err) {
        console.error('Error accessing or deleting files:', err);
    }

    // Launch a browser instance
    const browser = await puppeteer.launch({
        headless: true, // You probably want to keep this headless
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Prevent sandboxing for smooth running in server environments
    });

    // Open a new page
    const page = await browser.newPage();

    // Navigate to a webpage and wait until the page is fully loaded
    await page.goto(url, { waitUntil: 'load' });

    await sleep(5000); // Add some delay if necessary

    // Get the URL of the current page
    const currentPageURL = page.url();
    console.log(`Current Page URL: ${currentPageURL}`);

    // Fetch all anchor tags and their href + label using page.evaluate
    const anchorData = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a'));

        return anchors.map(anchor => {
            const href = anchor.getAttribute('href');
            const label = anchor.textContent.trim();
            const fullHTML = anchor.outerHTML; // Full HTML of the anchor tag
            const parentHTML = anchor.parentElement.outerHTML; // Full HTML of the parent element

            // Classify anchors: valid vs. dead link
            return {
                href: href || 'No href found',
                label,
                fullHTML,
                parentHTML,
                isValid: href && href !== '#' && href !== '' && !href.startsWith('javascript:')
            };
        });
    });

    // Separate valid and dead links
    const validHrefAnchors = anchorData.filter(anchor => anchor.isValid);
    const deadLinks = anchorData.filter(anchor => !anchor.isValid);

    // Prepare the data to save for valid hrefs
    const validDataToSave = {
        pageURL: currentPageURL,
        URLcounts: `Total number of valid hrefs: ${validHrefAnchors.length}`,
        anchorData: validHrefAnchors
    };

    // Ensure the directory exists
    const folderPath = path.join(process.cwd(), 'extractedURLFile');
    try {
        await fs.mkdir(folderPath, { recursive: true });
    } catch (err) {
        console.error('Error creating directory:', err);
    }

    // Write valid hrefs to URL_and_Label_pro.json
    const validFilePath = path.join(folderPath, 'URL_and_Label_pro.json');
    try {
        await fs.writeFile(validFilePath, JSON.stringify(validDataToSave, null, 2));
        console.log('The valid anchor data and page URL have been saved.');
    } catch (err) {
        console.error('Error writing to file', err);
    }

    // Write dead links to DeadLink_pro.json
    if (deadLinks.length > 0) {
        console.log('Found some dead links');

        const deadAnchorData = {
            currentPageURL: currentPageURL,
            deadAnchorCounts: `Total number of dead links: ${deadLinks.length}`,
            invalidHref: deadLinks
        };

        const deadFilePath = path.join(folderPath, 'DeadLink_pro.json');
        try {
            await fs.writeFile(deadFilePath, JSON.stringify(deadAnchorData, null, 2));
            console.log('The dead link data has been saved.');
        } catch (err) {
            console.error('Error writing dead links to file', err);
        }
    } else {
        console.log('No dead links found');
    }

    // Close the browser
    await browser.close();
}
