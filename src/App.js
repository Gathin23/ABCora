import { ethers } from "ethers";
import { useState } from "react";

function App() {
  let [connected, setConnected] = useState(false);
  let [character, setCharacter] = useState("");
  let [mood, setMood] = useState("");
  let prompt = `Generate a music theme in ABCjs format for a character with the following characteristics: ${character} and mood: ${mood}. Ensure the music accurately reflects the character's traits and the specified mood. Follow these steps:

  Key signature: It's usually denoted with K: followed by the note and the scale type, like C for C major. It wasn't specified in your provided output, but if we're in the key of C major (which doesn't need to be specified as it's the default), we wouldn't necessarily include this unless a different key is desired.
  Meter (Time Signature): This is denoted with M:, not K:, and the correct format for 4/4 time is M:4/4.
  Tempo: Tempo is specified with Q: followed by the note length that equals one beat (usually 1/4 for quarter note) and the BPM. For example, Q:1/4=120 for 120 beats per minute with the quarter note getting the beat.
  Tune Body: The musical notes should be written in the tune body without extraneous text, and with proper notation for rhythm and pitch.
  
  Initial Creation: Based on the character's description and the specified mood, create the ABCjs notation for the theme. Include key signature, time signature, tempo, and a melody that embodies the character's essence and the mood.
  
  Error Check 1: Review the ABCjs notation for any syntax errors or inconsistencies. This includes verifying correct usage of ABCjs elements such as headers (e.g., K: key, M: time signature), note lengths, and other musical symbols. Correct any errors found.
  
  Musicality Review: Ensure the music captures the character's personality and the specified mood. Adjust the melody, rhythm, and dynamics as necessary to better reflect the theme and emotional tone.
  
  Error Check 2: Perform a final review of the ABCjs notation, focusing on both syntax and musicality. Correct any additional errors and make sure that the music theme is now error-free and aligns perfectly with the ABCjs standard.
  
  Final Output: Present the refined and errorless ABCjs notation as the final output. This notation is ready to be directly input into an ABCjs interpreter or editor without the need for further adjustments.
  
  only print the genreated notes, no extra texts
  
  End of instructions.Generate a music theme in ABCjs format for a character with the following characteristics: [Character Description] and mood: [Mood Description]. Ensure the music accurately reflects the character's traits and the specified mood. Follow these steps:

  Key signature: It's usually denoted with K: followed by the note and the scale type, like C for C major. It wasn't specified in your provided output, but if we're in the key of C major (which doesn't need to be specified as it's the default), we wouldn't necessarily include this unless a different key is desired.
  Meter (Time Signature): This is denoted with M:, not K:, and the correct format for 4/4 time is M:4/4.
  Tempo: Tempo is specified with Q: followed by the note length that equals one beat (usually 1/4 for quarter note) and the BPM. For example, Q:1/4=120 for 120 beats per minute with the quarter note getting the beat.
  Tune Body: The musical notes should be written in the tune body without extraneous text, and with proper notation for rhythm and pitch.
  
  Initial Creation: Based on the character's description and the specified mood, create the ABCjs notation for the theme. Include key signature, time signature, tempo, and a melody that embodies the character's essence and the mood.
  
  Error Check 1: Review the ABCjs notation for any syntax errors or inconsistencies. This includes verifying correct usage of ABCjs elements such as headers (e.g., K: key, M: time signature), note lengths, and other musical symbols. Correct any errors found.
  
  Musicality Review: Ensure the music captures the character's personality and the specified mood. Adjust the melody, rhythm, and dynamics as necessary to better reflect the theme and emotional tone.
  
  Error Check 2: Perform a final review of the ABCjs notation, focusing on both syntax and musicality. Correct any additional errors and make sure that the music theme is now error-free and aligns perfectly with the ABCjs standard.
  
  Final Output: Present the refined and errorless ABCjs notation as the final output. This notation is ready to be directly input into an ABCjs interpreter or editor without the need for further adjustments.
  
  only print the genreated notes, no extra texts
  
  check the generated output twice and remove any extra descriptions other than notes
  End of instructions.`;

  let { ethereum } = window;
  let contract = null;

  if (ethereum) {
    let abi = JSON.parse(`[
      {
        "inputs": [
          {
            "internalType": "contract IAIOracle",
            "name": "_aiOracle",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "contract IAIOracle",
            "name": "expected",
            "type": "address"
          },
          {
            "internalType": "contract IAIOracle",
            "name": "found",
            "type": "address"
          }
        ],
        "name": "UnauthorizedCallbackSource",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "modelId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "prompt",
            "type": "string"
          }
        ],
        "name": "promptRequest",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "modelId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "input",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "output",
            "type": "string"
          }
        ],
        "name": "promptsUpdated",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "aiOracle",
        "outputs": [
          {
            "internalType": "contract IAIOracle",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "modelId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "prompt",
            "type": "string"
          }
        ],
        "name": "calculateAIResult",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "modelId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "prompt",
            "type": "string"
          }
        ],
        "name": "getAIResult",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "name": "prompts",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "modelId",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "input",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "output",
            "type": "bytes"
          }
        ],
        "name": "storeAIResult",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]`);

    let address = "0x4FA7f34ead1252c2AD43ca0909c07eC4a9a525C6";
    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    contract = new ethers.Contract(address, abi, signer);
  }

  const calculateAIResult = async (prompt) => {
    let result = await contract.calculateAIResult(0, prompt);
    console.log(result);
  };

  const getAIResult = async (prompt) => {
    let result = await contract.getAIResult(0, prompt);
    console.log(result)
  };

  return (
    <div>
      <button
        className="border bg-blue-400 rounded-md p-2"
        onClick={() => {
          if (contract && !connected) {
            ethereum
              .request({ method: "eth_requestAccounts" })
              .then((accounts) => {
                setConnected(true);
              });
          }
        }}
      >
        {!connected ? "Connect wallet" : "Connected"}
      </button>

      <form className="p-5">
        <label className="block mb-2">
          Character:
          <input
            type="text"
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
            className="mt-1 rounded-md border border-gray-600"
          />
        </label>
        <label className="block">
          Mood:
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="mt-1 rounded-md border border-gray-600"
          />
        </label>
      </form>

      <button
        className="border bg-blue-400 rounded-md p-2"
        onClick={() => {
          if (contract && mood && character) {
            calculateAIResult(prompt);
          } else {
            alert("Please fill in the character and mood fields");
          }
        }}
      >
        Create song
      </button>

      <button
        className="border bg-blue-400 rounded-md p-2"
        onClick={() => {
          if (contract && mood && character) {
            getAIResult(prompt);
          } else {
            alert("Please create a song first");
          }
        }}>Get Song</button>
    </div>
  );
}

export default App;
