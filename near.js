const nearAPI = require("near-api-js");

const { connect, keyStores, WalletConnection } = nearAPI;
const KEY_PATH = "~./near-credentials/testnet/example-account.json";
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(KEY_PATH);
//https://docs.near.org/docs/api/naj-quick-reference
const config = {
  networkId: "testnet",

  //keyStore: keyStore,
  //keyStore, // optional if not signing transactions
  nodeUrl: "https://rpc.testnet.near.org",
  // walletUrl: "https://wallet.testnet.near.org",
  // helperUrl: "https://helper.testnet.near.org",
  // explorerUrl: "https://explorer.testnet.near.org",
};

async function main(){
  const near = await connect(config);
  const account = await near.account("alysia.testnet");
  balance = await account.getAccountBalance();

  const contract = new nearAPI.Contract(
    account, // the account object that is connecting
    "dev-1634749074982-27929694375245",
    {
      // name of contract you're connecting to
      viewMethods: ["helloWorld"], // view methods do not change state but usually return a value
      //changeMethods: ["addMessage"], // change methods modify state
      sender: account, // account object to initialize and sign transactions.
    }
  );

  console.log(balance)
  const response = await contract.helloWorld();
  console.log(response);

  // create new WalletConnection instance
  const wallet = new WalletConnection(near, 'my-app');

  // create wallet connection
  // const wallet = new WalletConnection(near);
  
  // signIn(wallet)
  // if(wallet.isSignedIn()) {
  //   console.log('hi')
  // }else{
  //   console.log('hello')
  // }
}

async function signIn(wallet){
  await wallet.requestSignIn(
    "example-contract.testnet", // contract requesting access
    "Example App", // optional
    "http://YOUR-URL.com/success", // optional
    "http://YOUR-URL.com/failure" // optional
  )
}

main()