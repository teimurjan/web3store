# web3store

web3store - is a project created as a part of my Web3 engineering learning path. It's a simple mobile application built using [react-native](https://reactnative.dev/), [@walletconnect/react-native-dapp](https://docs.walletconnect.com/quick-start/dapps/react-native) and [web3.js](https://web3js.readthedocs.io/en/v1.7.4/#).

## How to run the app

### Install dependencies

```
yarn && cd ios && pod install
```

💡 Be sure that [patches](./patches/) are applied after the packages are installed. [@walletconnect/core](https://www.npmjs.com/package/@walletconnect/core) has some issues with the closuring (`this` keyword isn't correct inside `Connector` methods). I've fixed this issue using [patch-package](https://www.npmjs.com/package/patch-package).

### Run

1. Open [web3store.xcworkspace](./ios/web3store.xcworkspace) in XCode.
2. Connect your iPhone via a USB cable.
3. Be sure that both the laptop & phone are connected to the same Wi-Fi network.
4. Be sure that [MetaMask](https://metamask.io/) is installed on your iPhone.
   1. Be sure that the version of [MetaMask](https://metamask.io/) is 5.3.0, otherwise you'll get [this error](https://github.com/MetaMask/metamask-mobile/issues/4446).
5. Run the app on your iPhone via Xcode.

💡 Don't forget to mark the app as trusted on your iPhone (Settings -> General -> VPN & Device Management).

## Demo

### iOS

<div align="center">
<img src='./docs/gifs/flow.gif' width="300" />
</div>