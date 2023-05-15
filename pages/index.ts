import type { NextPage } from 'next'
import Head from 'next/head'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { Network, Alchemy, OwnedNft } from "alchemy-sdk";
import { useEffect, useState } from 'react';
import { useAccount, useContract, useSigner } from "wagmi";
import { ethers } from 'ethers';

const {
  AxelarAssetTransfer,
  AxelarQueryAPI,
  CHAINS,
  Environment,
} = require("@axelar-network/axelarjs-sdk");



const Home = ():NextPage => {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const [lw3NFTs, setLW3NFTs] = useState<OwnedNft[]>([]);
  const [buildspaceNFTs, setBuildSpaceNFTs] = useState<OwnedNft[]>([]);

  const axelarAssetTransfer = new AxelarAssetTransfer({
    environment: Environment.TESTNET,
  });

  const axelarQuery = new AxelarQueryAPI({
    environment: Environment.TESTNET,
  });

  const calculateTransferFee = async (
    chainOne: string,
    chainTwo: string,
    asset: string,
    amount: number
  ) => {
    const fee = await axelarQuery.getTransferFee(
      chainOne,
      chainTwo,
      asset,
      amount
    );

    return fee.fee.amount;
  };

  // function sleep(ms:number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  const makeCrossChainTransfer = async (
    chainOne: string,
    chainTwo: string,
    thisAsset: string,
    transferredAsset: string,
    amount: number,
    recipient: string,
    unWrapToken: boolean
  ) => {
    const asset = "wavax-wei";

    const depositAddress = await axelarAssetTransfer.getDepositAddress({
      chainOne,
      chainTwo,
      recipient,
      asset: asset,
      options: {
        shouldUnwrapIntoNative: false,
      },
    });

    console.log(depositAddress);

    // let tx = {
    //   to: depositAddress,
    //   value: fee,
    // };

    // await signer?.sendTransaction(tx);
  };

  makeCrossChainTransfer(
    CHAINS.TESTNET.POLYGON,
    CHAINS.TESTNET.AVALANCHE,
    "matic",
    "wmatic-wei",
    1e18,
    "0xE5ec6860AC6cCb36ED1F1164A72F1C58EAc3A05B".toLowerCase(),
    false
  );

  //callThis()


  return (
    <div>
    
    </div>
  );
}