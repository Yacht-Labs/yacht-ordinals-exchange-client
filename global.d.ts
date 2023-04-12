// global.d.ts
declare global {
  interface Window {
    ethereum: any; // You can replace 'any' with a more specific type if you know the exact shape of the ethereum object
  }
}

// This line is required to let TypeScript know that we're augmenting the global 'Window' type
export {};
