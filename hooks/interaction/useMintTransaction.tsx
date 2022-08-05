import { ContractFunction, TokenPayment, U32Value, ESDTTransferPayloadBuilder } from '@elrondnetwork/erdjs';
import {
  mintTxBaseGasLimit,
  mintFunctionName,
  tokenSellingPrice,
} from '../../config/nftSmartContract';
import BigNumber from 'bignumber.js';
import { useScTransaction, ScTransactionCb } from './useScTransaction';

export function useMintTransaction(cb?: (params: ScTransactionCb) => void) {
  const { pending, triggerTx, transaction, error } = useScTransaction(cb);

  const mint = async (tokensAmount: number) => {
    const tokens = tokensAmount || 1;
    const totalPayment = new BigNumber(tokenSellingPrice).times(tokens);
    let payment = TokenPayment.fungibleFromAmount("MEME-de49a0", totalPayment, 6);
    let data = new ESDTTransferPayloadBuilder()
    .setPayment(payment)
    .build();

    triggerTx({
      func: new ContractFunction(mintFunctionName),
      gasLimit:
        mintTxBaseGasLimit + (mintTxBaseGasLimit / 1.4) * (tokensAmount - 1),
      args: [new U32Value(tokens)],
      data: data,
    });
  };

  return {
    pending,
    mint,
    transaction,
    error,
  };
}
