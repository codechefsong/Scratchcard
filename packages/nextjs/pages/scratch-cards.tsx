import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  useScaffoldEventSubscriber,
  useScaffoldContractWrite
} from "~~/hooks/scaffold-eth";

import ScratchCard from '../components/ScratchCard';

function ScratchCards() {
  const { address } = useAccount();

  const [numbers, setNumbers] = useState([]);
  const [isMatch, setIsMatch] = useState("");
  const [showCard, setShowCard] = useState(false);
  
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "playGame"
  });

  useScaffoldEventSubscriber({
    contractName: "YourContract",
    eventName: "CardResult",
    listener: (player, imageURLs, isMatch, value) => {
      console.log(player, imageURLs, isMatch, value);
      setNumbers(imageURLs);
      setShowCard(true);
      if(isMatch)setTimeout(setIsMatch("You Win!"), 10000);
      if(!isMatch)setTimeout(setIsMatch("No Match, Try Again!"), 10000);
    },
  });

  return (
    <div className="container mx-auto bg-slate-50" style={{ height: "90vh"}}>
      <h1 className='text-3xl text-center mt-5'>Matches 3 images to win a piece of the prize pool</h1>
      <center>
        {address && <button className='py-2 px-4 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50' onClick={writeAsync} disabled={isLoading}>
          Play Scratch Card
        </button>}
      </center>
      
      <p className="text-xl text-center mt-3" >{isMatch}</p>
      {showCard && <>
        <div className="flex justify-content-center mx-auto mt-4" style={{ maxWidth: "800px" }}>
          <div className="w-4/12">
            <ScratchCard image={numbers[0]} />
          </div>
          <div className="w-4/12">
            <ScratchCard image={numbers[1]} />
          </div>
          <div className="w-4/12">
            <ScratchCard image={numbers[2]} />
          </div>
        </div>
        <div className="flex justify-content-center mx-auto" style={{ marginTop: '10rem', maxWidth: "800px"}}>
          <div className="w-4/12">
            <ScratchCard image={numbers[3]} />
          </div>
          <div className="w-4/12">
            <ScratchCard image={numbers[4]} />
          </div>
          <div className="w-4/12">
            <ScratchCard image={numbers[5]} />
          </div>
        </div>
        <div className="flex justify-content-center mx-auto" style={{ marginTop: '10rem', maxWidth: "800px"}}>
          <div className="w-4/12">
            <ScratchCard image={numbers[6]} />
          </div>
          <div className="w-4/12">
            <ScratchCard image={numbers[7]} />
          </div>
          <div className="w-4/12">
            <ScratchCard image={numbers[8]} />
          </div>
        </div>
      </>}
    </div>
  )
}

export default ScratchCards;