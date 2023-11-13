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
        "requestCode",
        "user",
        "userConcCode",
        "requestDate",
        "orderNumber",
        "transportOrderNumber",
        "assemblyOrderNumber",
        "supplierOrderNumber",
        "senderDealerCode",
        "senderDealerName",
        "recipientDealerCode",
        "recipientDealerName",
        "categoryArticles",
        "warehouseReason",
        "deliverWithin",
        "aspect",
        "numberOfPackages",
        "delivery",
        "harbor",
        "volume",
        "netWeight",
        "grossWeight",
        "meansofShipping",
        "carrierCode",
        "carrierName",
        "carrierAddress",
        "carrierCity",
        "carrierCap",
        "transportAmount",
        "assemblyAmount",
        "totalItems",
        "totalOrder",
        "acceptedComm",
        "acceptedCont",
        "cancelled",
        "exhausted",
        "note",
    ];

    let result = [];

    rowNames.forEach((rowName) => {
        result.push(`<td>{{ entity.${rowName} }}</td>`);
    });

    console.log(result);
}

function createTableHeaders() {
    const headerNames = [
        "requestCode",
        "user",
        "userConcCode",
        "requestDate",
        "orderNumber",
        "transportOrderNumber",
        "assemblyOrderNumber",
        "supplierOrderNumber",
        "senderDealerCode",
        "senderDealerName",
        "recipientDealerCode",
        "recipientDealerName",
        "categoryArticles",
        "warehouseReason",
        "deliverWithin",
        "aspect",
        "numberOfPackages",
        "delivery",
        "harbor",
        "volume",
        "netWeight",
        "grossWeight",
        "meansofShipping",
        "carrierCode",
        "carrierName",
        "carrierAddress",
        "carrierCity",
        "carrierCap",
        "transportAmount",
        "assemblyAmount",
        "totalItems",
        "totalOrder",
        "acceptedComm",
        "acceptedCont",
        "cancelled",
        "exhausted",
        "note",
    ];

    let result = [];

    headerNames.forEach((headerName) => {
        const upperCasePropertyName = headerName[0].toUpperCase() + headerName.substring(1);
        result.push(
            `<th pSortableColumn="${headerName}" class='py-2'>{{ '${entityName}Search.ResultList.Header.${upperCasePropertyName}' | translate }} <p-sortIcon class='px-3' field='${headerName}'></p-sortIcon></th>`
        );
    });

    console.log(result);
}

createTableData();
createTableHeaders();
