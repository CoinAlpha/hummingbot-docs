---
title: Pure Market Making
description: Learn how to use pure market making strategies
---

## For Traders

### How it Works

In the pure market making strategy, Hummingbot continually posts limit bid and ask offers on a market and waits for other market participants ("takers") to fill their orders.

Users can specify how far away ("spreads") from the mid price the bid and asks are, the order quantity, and how often prices should be updated (order cancels + new orders posted).

> Warning: Please exercise caution while running this strategy and set appropriate [kill switch](/advanced/kill-switch/) rate. The current version of this strategy is intended to be a basic template that users can test and customize. Running the strategy with substantial capital without additional modifications may result in losses.

### Schematic

The diagram below illustrates how market making works. Hummingbot makes a market by placing buy and sell orders on a single exchange, specifying prices and sizes.

<small><center>**_Figure 1: Hummingbot makes a market on an exchange_**</center></small>

![Figure 1: Hummingbot makes a market on an exchange](pure-mm.png)

### Prerequisites

#### Inventory

1. You will need to hold sufficient inventory of quote and/or base currencies on the exchange to place orders of the exchange's minimum order size.
2. You will also need some ETH to pay gas for transactions on a decentralized exchange (if applicable).

#### Minimum Order Size

When placing orders, if the size of the order determined by the order price and quantity is below the exchange's minimum order size, then the orders will not be created.

**Example:**

`bid order amount * bid price` < `exchange's minimum order size`<br/>
`ask order amount * ask price` > `exchange's minimum order size`

Only a sell order will be created but no buy order.

### Basic and Advanced Configuration

We aim to teach new users the basics of market making, while enabling experienced users to exercise more control over how their bots behave. By default, when you run `create` we ask you to enter the basic parameters needed for a market making bot.

See [Advanced Market Making](/strategies/advanced-mm) for more information about the advanced parameters and how to use them.

### Basic Configuration Parameters and Walkthrough

The following parameters are fields in Hummingbot configuration files located in the `/conf` folder (e.g. `conf_pure_mm_[#].yml`).

| Parameter              | Prompt                                                                                               | Definition                                                                                                                                                                                                                                                   |
| ---------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **exchange**           | `Enter your maker exchange name`                                                                     | The exchange where the bot will place bid and ask orders.                                                                                                                                                                                                    |
| **market**             | `Enter the token trading pair you would like to trade on [exchange]`                                 | Token trading pair symbol you would like to trade on the exchange.                                                                                                                                                                                           |
| **bid_spread**         | `How far away from the mid price do you want to place the first bid order?`                          | The strategy will place the buy (bid) order on a certain % away from the mid price.                                                                                                                                                                          |
| **ask_spread**         | `How far away from the mid price do you want to place the first ask order?`                          | The strategy will place the sell (ask) order on a certain % away from the mid price.                                                                                                                                                                         |
| **minimum_spread**     | `At what distance/spread from the mid price do you want the orders to be cancelled?`                 | The strategy will check every tick and cancel the active orders if an order's spread is less than the minimum spread parameter.                                                                                                                              |
| **order_refresh_time** | `How often do you want to cancel and replace bids and asks (in seconds)?`                            | An amount in seconds, which is the duration for the placed limit orders. <br/><br/> The limit bid and ask orders are cancelled and new orders are placed according to the current mid price and spreads at this interval.                                    |
| **order_amount**       | `What is the amount of [base_asset] per order? (minimum [min_amount])`                               | The order amount for the limit bid and ask orders. <br/><br/> Ensure you have enough quote and base tokens to place the bid and ask orders. The strategy will not place any orders if you do not have sufficient balance on either sides of the order. <br/> |
| **ping_pong_enabled**  | `Would you like to use the ping pong feature and alternate between buy and sell orders after fills?` | Whether to alternate between buys and sells.                                                                                                                                                                                                                 |

> Tip: "Tip: Autocomplete inputs during configuration": When going through the command line config process, pressing `<TAB>` at a prompt will display valid available inputs.

## For Developers

### Architecture

The built-in pure market making strategy in Hummingbot periodically requests limit order proposals from configurable order pricing and sizing plugins, and also periodically refreshes the orders by cancelling existing limit orders.

Here's a high level view of the logic flow inside the built-in pure market making strategy.

![Figure 5: Pure market making strategy logical flowchart](pure-mm-flowchart.svg)

The pure market making strategy operates in a tick-by-tick manner, as described in the [Strategies Overview](/strategies) document. Each tick is typically 1 second, although it can be programmatically modified to longer or shorter durations.

At each tick, the pure market making strategy would first query the order filter plugin whether to proceed or not. Assuming the answer is yes, then it'll query the order pricing and sizing plugins and calculate whether and what market making orders it should emit. At the same time, it'll also look at any existing limit orders it previously placed on the market and decide whether it should cancel those.

The process repeats over and over at each tick, causing limit orders to be periodically placed and cancelled according to the proposals made by the order pricing and sizing plugins.

### Plugins

There are a few plugin interfaces that the pure market making strategy depends on arriving at its order proposals.

![Figure 6: Pure market making strategy plugins](pure-mm-uml.svg)

- [`OrderFilterDelegate`](https://github.com/CoinAlpha/hummingbot/blob/development/hummingbot/strategy/pure_market_making/order_filter_delegate.pxd)

  Makes the Yes / No decision to proceed with processing the current clock tick or not.

- [`OrderPricingDelegate`](https://github.com/CoinAlpha/hummingbot/blob/development/hummingbot/strategy/pure_market_making/order_pricing_delegate.pxd)

  Returns a [`PriceProposal`](https://github.com/CoinAlpha/hummingbot/blob/development/hummingbot/strategy/pure_market_making/data_types.py) with lists of prices for creating bid and ask orders. If no order should be created at the current clock tick (e.g. because there're already existing orders), it may choose to return empty lists instead.

- [`OrderSizingDelegate`](https://github.com/CoinAlpha/hummingbot/blob/development/hummingbot/strategy/pure_market_making/order_sizing_delegate.pxd)

  Returns a [`SizingProposal`](https://github.com/CoinAlpha/hummingbot/blob/development/hummingbot/strategy/pure_market_making/data_types.py) with lists of order sizes for creating bid and ask orders, given the pricing proposal. If a proposed order at a certain price should not be created (e.g. there's not enough balance on the exchange), it may choose to return zero size for that order instead.

### Built-in Plugins

If you configure the pure market making strategy with the `order_levels` parameter set to 1, then Hummingbot will use [`ConstantSpreadPricingDelegate`](https://github.com/CoinAlpha/hummingbot/blob/development/hummingbot/strategy/pure_market_making/constant_spread_pricing_delegate.pyx) and [`ConstantSizeSizingDelegate`](https://github.com/CoinAlpha/hummingbot/blob/development/hummingbot/strategy/pure_market_making/constant_size_sizing_delegate.pyx) for the pricing and sizing plugins.

Alternatively, setting `order_levels` greater than 1 places multiple levels of orders of each side of the order book. In this case, Hummingbot will use [`ConstantMultipleSpreadPricingDelegate`](https://github.com/CoinAlpha/hummingbot/blob/development/hummingbot/strategy/pure_market_making/constant_multiple_spread_pricing_delegate.pyx) and [`StaggeredMultipleSizeSizingDelegate`](https://github.com/CoinAlpha/hummingbot/blob/development/hummingbot/strategy/pure_market_making/staggered_multiple_size_sizing_delegate.pyx) for the pricing and sizing plugins instead.

#### ConstantSpreadPricingDelegate

The logic of [`ConstantSpreadPricingDelegate`](https://github.com/CoinAlpha/hummingbot/blob/development/hummingbot/strategy/pure_market_making/constant_spread_pricing_delegate.pyx) is simple. It will always propose a bid and an ask order at a pre-configured spread from the current mid-price.

```cython
object bid_price = mid_price * (Decimal(1) - self.bid_spread)
object ask_price = mid_price * (Decimal(1) + self.ask_spread)
```

It doesn't do any checks about whether you have existing orders, or have enough balance to create the orders, but that's fine because the sizing delegate is responsible for that.

#### ConstantSizeSizingDelegate

The logic inside [`ConstantSizeSizingDelegate`](https://github.com/CoinAlpha/hummingbot/blob/development/hummingbot/strategy/pure_market_making/constant_size_sizing_delegate.pyx) is more involved, because it's checking whether there're existing limit orders that are still active, and also whether there's enough balance in the exchange to create new orders.

In addition, this delegate is responsible for "quantizing" the orders, which means conforming them to the tick size and minimum order size required by this particular exchange's trading rules. Note that if a proposed order size is lower than minimum order size, the order size will be reduced to 0.

If all the checks are green (i.e. no active limit orders, and enough balance to make new orders) and after it has quantized the orders, the delegate will make constant order size proposals with the pre-configured size on both the bid and ask sides. Otherwise, it'll propose 0 order sizes.

### Refreshing Orders

For each limit order that was emitted by the pure market making strategy, an expiry timestamp would be generated for that order and the order will be tracked by the strategy. The time until expiry for new orders is configured via the **order_refresh_time** parameter (See [parameters](/strategies/pure-market-making/#basic-configuration-parameters-and-walkthrough) in main documentation).

After an order's expiration time is reached, the pure market making strategy will create a cancel order proposal for that order.

### Executing Order Proposals

After collecting all the order pricing, sizing and cancel order proposals from plugins and the internal refresh order logic - the pure market making strategy logic will merge all of the proposals and execute them.

### Example Order Flow

Below is a hypothetical example of how the pure market making strategy works for a few clock ticks.

At clock tick _n_, there may be existing limit orders on both the bid and ask sides, and both have not yet expired. Assuming we're using the `ConstantSizeSizingDelegate` and `ConstantSpreadPricingDelegate` in this case, the proposed sizes for new orders will be 0. There'll be no cancel order proposals. So the strategy will do nothing for this clock tick.

At clock tick _n+1_, the limit bid order has expired. The strategy will then generate a cancel order proposal for the expired bid order. The cancellation will then be send to the exchange and executed.

At clock tick _n+2_, the `ConstantSizeSizingDelegate` notices there's no longer an order at the bid side. So it'll propose a non-zero order size for a new bid order. Let's assume the existing ask order hasn't expired yet, so no cancellation proposals will be generated at this clock tick. At the execution phase, the strategy will simply create a bid order calculated from the current market mid-price. Thus the bid order is refreshed.

This cycle of order creation and order cancellation will repeat again and again for as long as the strategy is running. If a limit order is completely filled by a market order, the strategy will simply refresh it at the next clock tick.
