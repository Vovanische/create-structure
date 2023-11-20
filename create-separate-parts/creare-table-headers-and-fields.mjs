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
        "vatReasonName",
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

    const bankInfo = [
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

    let result = [];

    rowNames.forEach((rowName) => {
        const lowerCasePropertyName = rowName[0].toLowerCase() + rowName.substring(1);
        result.push(`<td>{{ '${entityName}.${lowerCasePropertyName} }}</td>`);
    });

    bankInfo.forEach((rowName) => {
        const lowerCasePropertyName = rowName[0].toLowerCase() + rowName.substring(1);
        result.push(`<td>{{ '${entityName}.bankInfo.${lowerCasePropertyName} }}</td>`);
    });

    console.log(result);
}

function createTableHeaders() {
    const headerNames = [
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
        "vatReasonName",
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

    const bankInfo = [
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

    let result = [];

    headerNames.forEach((headerName) => {
        const upperCasePropertyName = headerName[0].toUpperCase() + headerName.substring(1);
        result.push(`<th>{{ '${entityName}.${headerName}' | translate }} </th>`);
    });

    bankInfo.forEach((headerName) => {
        const upperCasePropertyName = headerName[0].toUpperCase() + headerName.substring(1);
        result.push(`<th>{{ '${entityName}.bankInfo.${headerName}' | translate }} </th>`);
    });

    console.log(result);
}

createTableData();
createTableHeaders();
