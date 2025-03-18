// INSTALL PUPPETEER
// import puppeteer from "puppeteer";

const browserPromise = puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  
  export const fetchPdf = async (req, res) => {
    const {
      orderId,
      item,
      deliveryAddress,
      recieverName,
      recieverContact,
      itemsCountPerPackage,
      noOfPackages,
      totalWeightOfPackage,
      loadedOff,
    } = req.body;
  
    const template = Template({
      orderId,
      item,
      deliveryAddress,
      recieverName,
      recieverContact,
      itemsCountPerPackage,
      noOfPackages,
      totalWeightOfPackage,
      loadedOff,
    });
  
    const browser = await browserPromise;
    const page = await browser.newPage();
    await page.setContent(template || "");
  
    const buffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });
  
    const pdfName = "document.pdf";
  
    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", `attachment; filename=${pdfName}`);
    res.set("Content-Length", "1");
    res.send(buffer);
  };
  
  export const Template = ({
    orderId,
    item,
    deliveryAddress,
    recieverName,
    recieverContact,
    itemsCountPerPackage,
    noOfPackages,
    totalWeightOfPackage,
    loadedOff,
  }) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
  
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
      />
    </head>
  
    <script src="https://cdn.tailwindcss.com"></script>
  
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
  
      .roboto-thin {
        font-family: "Roboto", sans-serif;
        font-weight: 100;
        font-style: normal;
      }
  
      .roboto-light {
        font-family: "Roboto", sans-serif;
        font-weight: 300;
        font-style: normal;
      }
  
      .roboto-regular {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-style: normal;
      }
  
      .roboto-medium {
        font-family: "Roboto", sans-serif;
        font-weight: 500;
        font-style: normal;
      }
  
      .roboto-bold {
        font-family: "Roboto", sans-serif;
        font-weight: 700;
        font-style: normal;
      }
  
      .roboto-black {
        font-family: "Roboto", sans-serif;
        font-weight: 900;
        font-style: normal;
      }
  
      .roboto-thin-italic {
        font-family: "Roboto", sans-serif;
        font-weight: 100;
        font-style: italic;
      }
  
      .roboto-light-italic {
        font-family: "Roboto", sans-serif;
        font-weight: 300;
        font-style: italic;
      }
  
      .roboto-regular-italic {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-style: italic;
      }
  
      .roboto-medium-italic {
        font-family: "Roboto", sans-serif;
        font-weight: 500;
        font-style: italic;
      }
  
      .roboto-bold-italic {
        font-family: "Roboto", sans-serif;
        font-weight: 700;
        font-style: italic;
      }
  
      .roboto-black-italic {
        font-family: "Roboto", sans-serif;
        font-weight: 900;
        font-style: italic;
      }
    </style>
  
    <body class="roboto-regular m-auto w-4/5 py-8 space-y-8">
      <div class="flex justify-end">
        <div class="space-y-2">
          <img
            src="data:image/png;base64,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"
            alt="logo"
            class="w-[200px] h-auto"
            srcset=""
          />
  
          <p class="text-sm font-semibold text-left">
            Plot 26, Golf Course Road - Kololo
          </p>
          <p class="text-sm font-semibold text-left">
            P.O.Box 5111, Kampala, Uganda
          </p>
          <p class="text-sm font-semibold text-left">
            Tel: + 2556 (0) 414 469297
          </p>
          <p class="text-sm font-semibold text-left pl-7">
            + 2556 (0) 414 469297
          </p>
        </div>
      </div>
  
      <div class="space-y-2">
        <h3 class="text-4xl font-bold uppercase">Way bill</h3>
  
        <div class="p-3 border-2 border-black w-2/5 space-y-2">
          <p class="text-sm">
            Order ID: <span class="font-semibold">${orderId}</span>
          </p>
  
          <p class="text-sm">
          From/Pickup Address: <span class="font-semibold">${deliveryAddress}</span>
          </p>
        </div>
      </div>
  
      <div class="space-y-2">
        <h3 class="text-xl capitalize">loaded items</h3>
  
        <table
          class="w-full border-2 border-black [&_th]:border-2 [&_td]:border-2 [&_th]:border-black [&_td]:border-black [&_th]:p-2 [&_td]:p-2 [&_td]:text-gray-500 [&_td]:text-sm"
        >
          <thead>
            <tr>
              <th class="min-w-[200px]">Items</th>
              <th>Quantity</th>
              <th>Unit Weight</th>
              <th>Loaded</th>
              <th>Loaded off</th>
            </tr>
          </thead>
  
          <tbody>
            <tr>
              <td class="min-w-[200px]">${item}</td>
              <td>${noOfPackages}</td>
              <td>${totalWeightOfPackage}</td>
              <td>${itemsCountPerPackage}</td>
              <td>${loadedOff}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="space-y-2">
        <h3 class="text-xl capitalize">Additional Notes</h3>
  
        <p class="text-sm text-gray-500">
        </p>
      </div>
  
      <div class="space-y-2">
        <h3 class="text-xl capitalize">Signatures</h3>
  
        <div class="grid grid-cols-3 gap-4">
          <div class="space-y-2">
            <h3 class="font-semibold text-sm">Issuer</h3>
  
            <p class="text-sm">
              Name: <span class="text-gray-500">John Doe</span>
            </p>
            <p class="text-sm">
              Phone Number: <span class="text-gray-500">07866553625</span>
            </p>
  
            <div class="pb-2 pt-10">
              <div class="flex gap-1 items-center">
                <div class="w-1/4 border-b border-b-black"></div>
  
                <p>/</p>
  
                <div class="w-3/4 border-b border-b-black"></div>
              </div>
  
              <div class="flex gap-1 items-center">
                <div class="w-1/4">
                  <p class="text-sm font-semibold text-center">Date</p>
                </div>
  
                <div class="w-3/4">
                  <p class="text-sm font-semibold text-center">Signature</p>
                </div>
              </div>
            </div>
          </div>
  
          <div class="space-y-2">
            <h3 class="font-semibold text-sm">Driver</h3>
  
            <p class="text-sm">
              Name: <span class="text-gray-500">Peter Doe</span>
            </p>
            <p class="text-sm">
              Phone Number: <span class="text-gray-500">07776350092</span>
            </p>
  
            <div class="pb-2 pt-10">
              <div class="flex gap-1 items-center">
                <div class="w-1/4 border-b border-b-black"></div>
  
                <p>/</p>
  
                <div class="w-3/4 border-b border-b-black"></div>
              </div>
  
              <div class="flex gap-1 items-center">
                <div class="w-1/4">
                  <p class="text-sm font-semibold text-center">Date</p>
                </div>
  
                <div class="w-3/4">
                  <p class="text-sm font-semibold text-center">Signature</p>
                </div>
              </div>
            </div>
          </div>
  
          <div class="space-y-2">
            <h3 class="font-semibold text-sm">Recipient</h3>
  
            <p class="text-sm">
              Name: <span class="text-gray-500">${recieverName}</span>
            </p>
            <p class="text-sm">
              Phone Number: <span class="text-gray-500">${recieverContact}</span>
            </p>
  
            <div class="pb-2 pt-10">
              <div class="flex gap-1 items-center">
                <div class="w-1/4 border-b border-b-black"></div>
  
                <p>/</p>
  
                <div class="w-3/4 border-b border-b-black"></div>
              </div>
  
              <div class="flex gap-1 items-center">
                <div class="w-1/4">
                  <p class="text-sm font-semibold text-center">Date</p>
                </div>
  
                <div class="w-3/4">
                  <p class="text-sm font-semibold text-center">Signature</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
  