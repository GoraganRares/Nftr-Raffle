// Here is the configuration specific to the Elven Tools Smart Contract
// The data can be also queried on SC, but because it is static it is better to save the api bandwidth
// It is important to keep the same values as configured on smart contract

// Elven Tools NFT Smart Contract address - replace it with yours
export const smartContractAddress =
  'erd1qqqqqqqqqqqqqpgqdc6jzqlfmfy03erkhkt4286dn6aen4hcg20sauezx0';

// Amount of the NFTs in the collection
export const collectionSize = 45000;

// Number of the NFTs for one address in total
export const tokensLimitPerAddressTotal = 100;

// Collection ticker
export const collectionTicker = 'Raffle';

// Start or pause minting process. UI will react on this. Remember to keep itin in sync with Smart Contract. This is very important.
export const isMintingStarted = true;

// Enable/Disable the drop. UI will react on this. Remember to keep it in in sync with Smart Contract. This is very important.
export const isDropActive = false;

// The number of the NFTs for one address per current active drop can be ignored if there are no drops active
export const tokensLimitPerAddressPerDrop = 10;

// Enable/Disable allowlist. UI will react on this. Remember to keep it in in sync with Smart Contract. This is very important.
export const isAllowlistEnabled = true;

// Base transaction gas limit for the mint tx, it will be calculated, this is just a base
export const mintTxBaseGasLimit = 14000000;

// Mint endpoint name on the Smart Contract - replace with yours if you modified it
export const mintFunctionName = 'ESDTTransfer@4D454D452D323130316161@02540BE400@627579456E7472696573';

// Single token seling price - configurable on smart contract when deployed 1 EGLD = 10^18
export const tokenSellingPrice = '0';
export const tokenSellingPriceMeme = 'ESDTTransfer@4D454D452D323130316161@05d21dba00@6D696E744D656D65';
