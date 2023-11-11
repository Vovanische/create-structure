const name = process.argv[2];

const entityName = name
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');

const rowNames = [
  'invoiceCode',
  'sentC',
  'transferred',
  'type',
  'invoiceNumber',
  'invoiceDate',
  'dealerCode',
  'dealerName',
  'accountingCustomerCode',
  'customerCode',
  'companyName',
  'otherBranchAmmCode',
  'companyNameAmm',
  'taxCode',
  'vatNumber',
  'vatReasonCode',
  'vatReasoneName',
  'vatPercentage',
  'accountingReasonCode',
  'accountingReasonName',
  'quotationCode',
  'orderNumber',
  'taxableIncome',
  'expense',
  'vatAmount',
  'totalAmount',
  'withHoldingPercentage',
  'withHolding',
  'totalToPay',
  'cashed',
  'cashIn',
  'expirationDate',
  'periodinvoicedFrom',
  'periodinvoiceTo',
  'rentalStartDate',
  'rentalEndDate',
  'paymentCode',
  'paymentDescription',
  'bankInfo',
  'notes',
  'createdOn',
  'ep',
  'factory',
  'dataFactory',
  'sentFactory',
  'accountingInvoiceNumber',
  'archivedOn',
  'shippedOn',
  'cig',
  'cup',
  'majorPublicWorkCode',
  'subcontracting',
  'user',
];

const rowSubNames = [
  'bankCode',
  'bankName',
  'iban',
  'abi',
  'cab',
  'bankAgency',
  'bankAddress',
  'bankLocation',
  'bankCityName',
  'bankPostalCode',
  'bankProvinceCode',
];

function createTableData() {
  const rowNames = [
    'returnCode',
    'current',
    'customerCode',
    'insertDate',
    'user',
    'userDealer',
    'returnDate',
    'amount',
    'note',
    'amountReturned',
    'dateReturned',
    'type',
  ];

  let result = [];

  rowNames.forEach((rowName) => {
    result.push(`<td>{{ entity.${rowName} }}</td>`);
  });

  console.log(result);
}

function createTableHeaders() {
  const rowNames = [
    'returnCode',
    'current',
    'customerCode',
    'insertDate',
    'user',
    'userDealer',
    'returnDate',
    'amount',
    'note',
    'amountReturned',
    'dateReturned',
    'type',
  ];

  let result = [];

  rowNames.forEach((rowName) => {
    result.push(`<th>{{ '${entityName}Search.ResultList.Header.${rowName}' | translate }} </th>`);
  });

  console.log(result);
}

createTableData();
createTableHeaders();
