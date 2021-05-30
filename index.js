wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  switch (requestObject.method) {
    case 'addUnlockAssets':
      const locks = requestObject.params[0] || [];
      wallet.send({
        method: 'wallet_manageAssets',
        params: [
          "addAsset",
          {
            symbol: 'Locks',
            balance: locks.length,
            identifier: 'unlock_protocol:locks',
            image: 'https://ethglobal-hackathon.s3.us-east-2.amazonaws.com/1.jpg',
            decimals: 1,
            customViewUrl: 'https://metamask.io'
          }
        ]
      });
      const keys = requestObject.params[1] || [];
    
      return keys.map(key => {
        wallet.send({
          method: 'wallet_manageAssets',
          params: [
            "addAsset",
            {
              symbol: key.lock.name,
              balance: 1,
              identifier: `${key.lock.address}:${key.keyId}`,
              image: 'https://ethglobal-hackathon.s3.us-east-2.amazonaws.com/1.jpg',
              decimals: 1,
              customViewUrl: 'https://metamask.io'
            }
          ]
        })
      });

    default:
      throw new Error('Method not found.')
  }
})
