import { useMintTransaction } from '../hooks/interaction/useMintTransactionMeme';
import { useCallback, FC, useState, useEffect } from 'react';
import { ActionButton } from './ActionButton';
import { BasicButton } from '../components/BasicButton';
import { ScTransactionCb } from '../hooks/interaction/useScTransaction';
import { useLoginInfo } from '../hooks/auth/useLoginInfo';
import { useAccount } from '../hooks/auth/useAccount';
import { LoginMethodsEnum } from '../types/enums';
import { ApiNetworkProvider, ProxyNetworkProvider } from "@elrondnetwork/erdjs-network-providers";

let networkProvider = new ApiNetworkProvider("https://devnet-api.elrond.com");
let networkProviders = new ProxyNetworkProvider("https://devnet-gateway.elrond.com");
// import { Ninjas } from '../components/lambo';
// import axios from 'axios';

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
} from '@chakra-ui/react';
import { TransactionPendingModal } from '../components/TransactionPendingModal';
import { isAllowlistEnabled } from '../config/nftSmartContract';
import { NFTLeftToMint } from './NFTLeftToMint';

interface MintFormProps {
  leftToMintForUser: number;
  NFTLeftToMint: number;
  cb?: (params: ScTransactionCb) => void;
  // dataLoading?: boolean;
}

export const MintForm: FC<MintFormProps> = ({ NFTLeftToMint, leftToMintForUser, cb }) => {
  const [amount, setAmount] = useState(1);
  const { mint, pending, transaction, error} = useMintTransaction(cb);
  const { loginMethod } = useLoginInfo();

  const handleMint = useCallback(() => {
    mint(amount);
  }, [amount, mint]);

  const setAmountHandler = useCallback((value) => setAmount(value), []);
  return (
    <>
      <Box
        display="flex"
        gap={5}
        width='100%'
        alignItems="center"
        justifyContent={{ base: 'center', md: 'center' }}
        mb='20px'
      >
        <BasicButton
          onClick={handleMint}
          // disabled={pending || leftToMintForUser <= 0 || NFTLeftToMint <= 0}
        >
          {pending ? 'Pending...' : 'JOIN WITH $MEME'}
        </BasicButton>
      </Box>
      <TransactionPendingModal
        isOpen={pending}
        successTxHash={transaction?.getHash().toString()}
        txError={error}
        additionalMessage={
          loginMethod === LoginMethodsEnum.walletconnect
            ? 'Sign the transaction using Maiar mobile app. It will take some time to finish. You can always close this message. You will get the transaction hash when finished.'
            : 'It will take some time to finish. You can always close this message. You will get the transaction hash when finished.'
        }
      />
    </>
  );
};
