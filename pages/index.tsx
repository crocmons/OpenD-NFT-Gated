import React, { useEffect } from 'react'
import { ThirdwebSDK } from '@thirdweb-dev/sdk/solana';
import type { GetServerSideProps } from 'next';
import { getUser } from '../auth.config';
import { network } from './_app';
import Link from 'next/link';
import Logout from './components/Logout';
import Login from './components/Login';
import { Realistic } from '../lib/utils';

export const getServerSideProps: GetServerSideProps = async ({req,res}) =>{
    const sdk = ThirdwebSDK.fromNetwork(network);
    const user = await getUser(req);

    if(!user)
      return{
        redirect:{
          destination:"/login",
          permanent:false
        }
      };

      // check the user has the nft and then allow access
      const program = await sdk.getNFTDrop(process.env.NEXT_PUBLIC_PROGRAM_ADDRESS!);
      const nfts = await program.getAllClaimed(); 
      const nft = nfts.find((nft)=>nft.owner === user?.address);
       
      if(!nft)
        return{
          redirect:{
            destination:"/login",
            permanent:false,
          }
        };

        return {
          props:{}
        }
      
      }

    
  

const Home = () => {

  useEffect(() => {
    Realistic();
    
  }, []);
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center bg-[#f8f8f6] -z-20 px-5'>
      <h1 className='text-2xl font-bold py-5 my-4 px-2 text-center text-yellow-700'>Woohoo! You Entered Your OpenD NFT Gated Website, <br />
      This Page is only accessible those users who have Purchased & Hold their OpenD NFT</h1>

      <Link
      href="https://mvc4l-ziaaa-aaaam-aaxvq-cai.ic0.app/"
      >
      <p className='py-4 my-4 font-bold text-lg text-center text-fuchsia-600 cursor-pointer'>
      Now, You can visit Your OpenD MarketPlace. </p> 
      </Link>
      <p className='text-blue-600 font-bold cursor-pointer'>Visit 👉: https://mvc4l-ziaaa-aaaam-aaxvq-cai.ic0.app/</p>
      
      <Logout />
      <span>
        <Login />
      </span>

      
    </div>
  )
}

export default Home