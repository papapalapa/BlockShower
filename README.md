# [BlockShower](https://papapalapa.github.io/BlockShower)

[BlockShower](https://papapalapa.github.io/BlockShower) is the world's first decentralized wireless shower head that allows
users to take shower whenever they want and wherever they want. The more you use BlockShower, the more SHOWER tokesn you will receive. You can use SHOWER tokens to purchase toiletries.

## Download and Installation

To begin using BlockShower:
* Clone this repository
* Change directory to the project directory
* Install packages via npm: `npm install`
* Install truffle and geth

## Connecting the website to network

#### Configure the test network or specify production network
geth --rinkeby --rpc --rpcapi="personal,eth,network,web3,net" --ipcpath "~/AppData/Roaming/Ethereum/geth.ipc"

#### Test connection
geth attach http://localhost:8545

#### Create an account
get --rinkeby account new

geth attach ipc:\\.\pipe\geth.ipc

#### Add account

geth --rinkeby account import key.txt --datadir "C:\Users\wkdgn\AppData\Roaming\Ethereum\rinkeby\geth\chaindata"

#### Request test ether
[Test Transaction](https://www.etherchain.org/account/Cd47a71b55c384aa36400df4e274c8356de2d500)

https://rinkeby.etherscan.io/address/0xcd47A71b55c384aA36400Df4E274C8356DE2D500

[![Landing Page Preview](https://startbootstrap.com/assets/img/templates/landing-page.jpg)](https://blackrockdigital.github.io/startbootstrap-landing-page/)

#### Migrate to new network
truffle migrate --reset --compile-all --network rinkeby

## About - Project

BlockShower is an open source project that utilizes Rinkeby Test network to mimic blockchain behaviors. I created this project to ridicule the trend of "decentralizing" everything in Silicon Valley. It seemed like some startups in Silicon Valley were trying to "wow" people without technology merely by throwing tech buzzwords, and so I wanted to know how much people would be convinced by buzzwords. Everyone is free to share this project with others, and nobody has to attribute me. (If you do, it would be very much appreciated)

## About - Developer

I'm Janghoon Lee from [Minerva Schools at KGI](https://www.minerva.kgi.edu)! I'm passionate about utilizing my software engineering skiils to create projects that entertain people. If you are a web developer (Node.js + Express, Python + Django, React), let's connect! If you are an AI enginner, let's connect!

[Janghoon Lee](https://www.linkedin.com/in/janghoon-lee-6b92a0171/)

## About - Website

The design of the website is based on the [Startbootstrap](artbootstrap.com/template-categories/all/) which is based on [Bootstrap](http://getbootstrap.com/) framework created by [Mark Otto](https://twitter.com/mdo) and [Jacob Thorton](https://twitter.com/fat).

## Copyright and License

Copyright 2013-2018 Blackrock Digital LLC. Code released under the [MIT](https://github.com/BlackrockDigital/startbootstrap-landing-page/blob/gh-pages/LICENSE) license.
