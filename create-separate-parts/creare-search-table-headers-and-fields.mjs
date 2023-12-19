const name = process.argv[2];

const entityName = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

const rowNames = [
    "invoiceCode",
    "sentC",
    "transferred",
    "type",
    "invoiceNumber",
    "invoiceDate",
    "dealerCode",
    "dealerName",
    "accountingCustomerCode",
    "customerCode",
    "companyName",
    "otherBranchAmmCode",
    "companyNameAmm",
    "taxCode",
    "vatNumber",
    "vatReasonCode",
    "vatReasoneName",
    "vatPercentage",
    "accountingReasonCode",
    "accountingReasonName",
    "quotationCode",
    "orderNumber",
    "taxableIncome",
    "expense",
    "vatAmount",
    "totalAmount",
    "withHoldingPercentage",
    "withHolding",
    "totalToPay",
    "cashed",
    "cashIn",
    "expirationDate",
    "periodinvoicedFrom",
    "periodinvoiceTo",
    "rentalStartDate",
    "rentalEndDate",
    "paymentCode",
    "paymentDescription",
    "bankInfo",
    "notes",
    "createdOn",
    "ep",
    "factory",
    "dataFactory",
    "sentFactory",
    "accountingInvoiceNumber",
    "archivedOn",
    "shippedOn",
    "cig",
    "cup",
    "majorPublicWorkCode",
    "subcontracting",
    "user",
];

const rowSubNames = [
    "bankCode",
    "bankName",
    "iban",
    "abi",
    "cab",
    "bankAgency",
    "bankAddress",
    "bankLocation",
    "bankCityName",
    "bankPostalCode",
    "bankProvinceCode",
];

function createTableData() {
    const rowNames =  [
        "mavCode",
        "mavDate",
        "bankCode",
        "bankSupport",
        "requestedAmount",
        "actualAmount"
    ];


    // const bankInfo = [
    //     "bankCode",
    //     "bankName",
    //     "iban",
    //     "abi",
    //     "cab",
    //     "bankAgency",
    //     "bankAddress",
    //     "bankLocation",
    //     "bankCityName",
    //     "bankPostalCode",
    //     "bankProvinceCode",
    // ];

    let result = [];

    rowNames.forEach((rowName) => {
        const lowerCasePropertyName = rowName[0].toLowerCase() + rowName.substring(1);
        result.push(`<td>{{ entity.${lowerCasePropertyName} }}</td>`);
    });

    // bankInfo.forEach((rowName) => {
    //     const lowerCasePropertyName = rowName[0].toLowerCase() + rowName.substring(1);
    //     result.push(`<td>{{ '${entityName}.bankInfo.${lowerCasePropertyName} }}</td>`);
    // });

    console.log(result);
}

function createTableHeaders() {
    const headerNames =  [
        "mavCode",
        "mavDate",
        "bankCode",
        "bankSupport",
        "requestedAmount",
        "actualAmount"
    ];


    // const bankInfo = [
    //     "bankCode",
    //     "bankName",
    //     "iban",
    //     "abi",
    //     "cab",
    //     "bankAgency",
    //     "bankAddress",
    //     "bankLocation",
    //     "bankCityName",
    //     "bankPostalCode",
    //     "bankProvinceCode",
    // ];

    let result = [];

    headerNames.forEach((headerName) => {
        const upperCasePropertyName = headerName[0].toUpperCase() + headerName.substring(1);
        result.push(
            `<th pSortableColumn="${headerName}" class="py-1">{{ '${entityName}Search.ResultList.Header.${upperCasePropertyName}' | translate }} <p-sortIcon field="${headerName}" class="px-3"></p-sortIcon></th>`
        );
    });
    // <th pSortableColumn="xxx" class="py-1">{{ 'UsersSearch.ResultList.Header.xxx' | translate }} <p-sortIcon field="xxx" class="px-3"></p-sortIcon></th>
    // bankInfo.forEach((headerName) => {
    //     const upperCasePropertyName = headerName[0].toUpperCase() + headerName.substring(1);
    //     result.push(`<th>{{ '${entityName}.bankInfo.${headerName}' | translate }} </th>`);
    // });

    console.log(result);
}

createTableData();
createTableHeaders();
