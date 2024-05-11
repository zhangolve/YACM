This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# todo

- 写一个自己的钱包
- 用自己的钱包去交易
- 钱包,智能合约，交易结果，blockchain explorer, 区块链浏览器， transaction history，yet another my crypto wallet management tool 
- 根据合约地址，导入合约资产。
- 显示合约balances


Provider	A Provider (in ethers) is a class which provides an abstraction for a connection to the Ethereum Network. It provides read-only access to the Blockchain and its status.	 
Signer	A Signer is a class which (usually) in some way directly or indirectly has access to a private key, which can sign messages and transactions to authorize the network to charge your account ether to perform operations.	 
Contract	A Contract is an abstraction which represents a connection to a specific contract on the Ethereum Network, so that applications can use it like a normal JavaScript object.

能够显示钱包的余额，币种信息。

质押的过程是一个怎样的过程呢？！

连接钱包，更多钱包。

切换钱包。

计算总余额。

导入私钥的过程是怎样的。

https://github.com/MetaMask/metamask-extension


https://app.mycrypto.com/dashboard

一个数字资产的管理器，会是一个很有趣的产物。可以类似这个网站。。
onekey 也是一个数字资产的管理器。https://onekey.so/ 推特上有人在这里上班

国际化的问题，如何解决呢？！

https://nextjs.org/docs/pages/building-your-application/routing/internationalization


# nextjs 需要注意的pitfall

- 不能在getStaticProps中使用window对象，因为这个是在node环境中执行的，没有window对象。如果想要使用window对象，需要声明在client端执行的代码。
- Text content does not match server-rendered HTML
使用localhost 引起的坑

https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components

- 使用tailwind的时候，由于tailwind是按需加载的，因此，直接修改浏览器的样式，并不能直接在浏览器里面看到效果。需要改代码，来看效果。所谓按需加载的意思是，只有在代码中使用了这个样式，才会被打包进去。