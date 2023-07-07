import { OrderDTO } from "../../../shared/models/order.model";
import { getName } from "./helper/restaurant-name.function";

export function printerTemplate(order: OrderDTO[]) {
  const printWindow = window.open('','','height=400,width=600');
  if(!printWindow) return;
  printWindow.document.write(`
  <html lang="hu">
    <head>
        <title>${order[0].table}</title>
    </head>
    <style>
    * {
  font-size: 12px;
  font-family: 'Times New Roman',sans-serif;
}

td,
th,
tr,
table {
  border-top: 1px solid black;
  border-collapse: collapse;
}

td.description,
th.description {
  width: 75px;
  max-width: 75px;
}

td.quantity,
th.quantity {
  width: 40px;
  max-width: 40px;
  word-break: break-all;
}

td.price,
th.price {
  width: 40px;
  max-width: 40px;
  word-break: break-all;
}

.centered {
  text-align: center;
  align-content: center;
}

.ticket {
  width: 155px;
  max-width: 155px;
}

svg {
  max-width: inherit;
  width: inherit;
}

.brand-title {
    text-align: center;
    align-content: center;
    font-family: "Lucida Handwriting", cursive;
}

</style>
    <body>
          <div class="ticket">
            <svg height="80px" width="80px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              \t viewBox="0 0 254.019 254.019" xml:space="preserve">
              <g>
              \t<g>
              \t\t<g>
              \t\t\t<path style="fill:#010002;" d="M126.514,48.282c-43.428,0-78.738,35.319-78.738,78.738c0,43.389,35.309,78.718,78.738,78.718
              \t\t\t\tc43.389,0,78.738-35.329,78.738-78.708C205.252,83.601,169.932,48.282,126.514,48.282z M126.514,198.898
              \t\t\t\tc-39.647,0-71.879-32.232-71.879-71.869s32.222-71.928,71.879-71.928s71.879,32.29,71.879,71.928
              \t\t\t\tS166.171,198.898,126.514,198.898z M193.352,127.029c0,36.882-29.926,66.808-66.828,66.808
              \t\t\t\tc-36.912,0-66.838-29.936-66.838-66.808c0-36.921,29.936-66.847,66.838-66.847C163.426,60.172,193.352,90.108,193.352,127.029z
              \t\t\t\t M41.308,56.733l0.02,38.836h-0.059c-0.391,12.389-13.971,17.117-13.971,17.117v24.924h0.02l-0.02,57.312
              \t\t\t\tc0,0-5.491,7.093-12.604,0v-82.226h0.166c-8.285-3.527-14.411-4.748-14.802-17.117H0V56.733l6.224-0.029L9.252,94.28H16.6
              \t\t\t\tl0.928-38.348h5.989l0.723,38.348h8.617l1.983-37.547L41.308,56.733L41.308,56.733z M252.1,122.857h-15.232v77.038h-17.596
              \t\t\t\tV54.144h17.596C236.878,54.134,260.844,84.548,252.1,122.857z"/>
              \t\t</g>
              \t</g>
              </g>
            </svg>
             <p class="brand-title">GM -Restaurant management</p>
            <h1 class="centered"> ${getName().toUpperCase()}
                <br>Cím: HAMAROSAN!!!
            </h1>
            <table>
                <thead>
                    <tr>
                        <th class="quantity">DB</th>
                        <th class="description">Leírás</th>
                        <th class="price">Ár</th>
                    </tr>
                </thead>
                <tbody>


  `);

  order[0].items.forEach((item) => {
    printWindow.document.write(`
       <tr>
         <td class="quantity">1.00</td>
         <td class="description"> ${item.name}
    `);

    item.removedItems.forEach((removed) => {
      printWindow.document.write(`
      <br><strong> -${removed}</strong>`)
    });

    item.extraItems.forEach((extra) => {
      printWindow.document.write(`
      <br> <strong> +${extra}</strong>`)
    });

    printWindow.document.write(`</td><td class="price">${item.price} Ft</td></tr>`)
  });

  printWindow.document.write(`
 </tbody>
 </table>
        <h2>Szervízdíj: HAMAROSAN!</h2>
        <h2>Áfa:
        <br>5%: ${order[0].afa5} Ft |
        <br>27%: ${order[0].afa27} Ft |</h2>
        <h2>Összeg: ${order[0].amount} Ft</h2>

        <p class="centered">Köszönjük, hogy a vendégünk volt,
                <br>Legyen szép napja !</p>
        </div>
    </body>
  </html>
`);
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}
