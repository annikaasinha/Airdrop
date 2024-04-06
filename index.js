const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

// Create a new wallet Keypair
const wallet = new Keypair();

// Public key is directly available; no need for new instantiation
const publicKey = wallet.publicKey;

// This demonstration part for educational purposes shows how to access the secret key,
// but be mindful of security practices when handling secret keys.
const secretKey = wallet.secretKey; // Correct way to access secretKey for demonstration. Still, be cautious.

// Function to get and log the wallet balance
const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const walletBalance = await connection.getBalance(publicKey);
        // Corrected to use template literals for variable interpolation
        console.log(`Wallet balance is ${walletBalance}`);
    } catch (err) {
        console.error(err);
    }
};
const airDropSol=async() =>{
    try{
        const connection=new Connection(clusterApiUrl('devnet'), 'confirmed');
        const fromAirDropSignature=await connection.requestAirdrop(publicKey, 2*LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirDropSignature)
    }
    catch(err){
        console.log(err)
    }
}
// Main function to execute the getWalletBalance function
const main = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
};

// Execute the main function
main();
