import React,{useEffect,useState} from 'react'
import {useWallet} from "@solana/wallet-adapter-react";
import {
    useClaimNFT,
    useLogin,
    useLogout,
    useProgram,
    useUser,
    useDropUnclaimedSupply,
    useNFTs
} from "@thirdweb-dev/react/solana";
import { wallet } from './_app';
import { useRouter } from 'next/router';
import {NFT} from "@thirdweb-dev/sdk";
import Link from 'next/link';
import Image from 'next/image';
import OpenD from "../image/openDimg.jpg";

const login = () => {
  const [usersNft,setUsersNft] = useState<NFT | undefined>();
    const login = useLogin();
    const logout = useLogout();
    const router = useRouter();
    const {user} = useUser();
    const {publicKey,connect,select} = useWallet();

    const {program} =  useProgram(process.env.NEXT_PUBLIC_PROGRAM_ADDRESS,"nft-drop");
    const {data:unclaimedSupply} = useDropUnclaimedSupply(program);
    const {data:nfts,isLoading} = useNFTs(program);
    const {mutateAsync : claim} = useClaimNFT(program);

    useEffect(()=>{
      if(!publicKey){
        select(wallet.name);
        connect();
      }
    },[publicKey,wallet]);

    useEffect(()=>{
      if(!user || !nfts) return;

      const usersNft = nfts.find((nft)=>nft.owner === user?.address);

      if(usersNft){
        setUsersNft(usersNft)
      }
    },[nfts,user]);

    const handleLogin = async ()=>{
      await login();
      router.replace("/")
    }
    const handlePurchase = async ()=>{
      await claim({
        amount:1,
      });
      router.replace("/");
    }
  return (
    <div className='flex min-h-screen flex-col items-center justify-center text-center bg-amber-200'>
        <div className='absolute top-56 left-0 w-full h-1/4 bg-lime-500 -skew-y-6 z-10 overflow-hidden shadow-xl'/>
        <Image 
        className='mt-5 z-30 shadow-2xl mb-10 rounded-full'
        src={OpenD}
        alt="logo"
        width={350}
        height={350}
        objectFit="contain"
        />
        <main className='z-30 text-yellow-800'>
         <h1 className='py-4 my-4 mx-3 px-2 text-4xl font-bold uppercase'>
          Welcome to the <span className='text-fuchsia-600'>OpenD</span>
         </h1>
         {!user && (
          <div>
            <button
            onClick={handleLogin}
            className="text-2xl font-bold mb-5 bg-fuchsia-500 text-white py-4 px-10 border-2 border-fusbg-fuchsia-600 animate-pulse rounded-md transition duration-200 mt-5"
            >
              Connect Wallet & Login
            </button>
          </div>
         )}

         {user && (
          <div>
            <p className='text-lg text-fuchsia-600 font-bold mb-10'>
              Welcome {user.address.slice(0,6)}....{user.address.slice(-6)}
            </p>
            {isLoading && (
              <div className='text-2xl font-bold mb-5 bg-fuchsia-500 text-white py-4 px-10 border-2 border-fuchsia-600 animate-pulse rounded-md transition duration-200'>
                 Hold on, We're looking for your Membership pass......
              </div>
            )}

            {usersNft && (
              <Link
              href="/">
              <span
              className="bg-fuchsia-500 text-white py-4 px-10 border-2 border-fuchsia-600 font-bold rounded-md transition duration-200 hover:bg-white hover:text-fuchsia-600 mt-5 uppercase"
              >
              Access Granted - Enter
              </span>
              </Link>
            )}

            {!usersNft && !isLoading && (unclaimedSupply && unclaimedSupply >0 ? (
              <button onClick={handlePurchase}
              className="bg-fuchsia-500 text-white py-4 px-10 border-2 border-fuchsia-600 font-bold rounded-md transition duration-200 hover:bg-white hover:text-fuchsia-600 mt-5 uppercase"
              >
               Buy a OpenD Membership Pass
              </button>
            ):(
              <p className='text-2xl font-bold mb-5 bg-red-500 text-white py-4 px-10 border-2 border-red-500 rounded-md uppercase transition duration-200'>
                Sorry, we're all out of OpenD Membership Passes!
              </p>
            ))}
          </div>
         )}
         {user && (
          <button
          onClick={logout}
          className="text-fuchsia-600 bg-white py-4 px-10 border-2 border-fuchsia-600 rounded-md transition duration-200 hover:text-white hover:bg-fuchsia-600 mt-10 font-bold uppercase"
          >
           LogOut
          </button>
         )}
        </main>
        </div>
  )
}

export default login