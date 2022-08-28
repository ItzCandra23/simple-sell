"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleSell = void 0;
const api_1 = require("@bdsx/economy-x/src/api");
const event_1 = require("bdsx/event");
const fs = require("fs");
let db = {};
try {
    db = require(__dirname + "../../../data/items.json");
}
catch (e) {
    console.log(`[Simple-Sell] items.json Error!`);
}
/**Simple-Sell Api. */
class SimpleSell {
    /**Add item data. */
    static addItem(item, price, actor) {
        if (item.getName() === "minecraft:air") {
            actor === null || actor === void 0 ? void 0 : actor.sendMessage(`§cYou can't sell air`);
            return false;
        }
        if (db.hasOwnProperty(item.getName())) {
            actor === null || actor === void 0 ? void 0 : actor.sendMessage(`§cThis item has been added.`);
            return false;
        }
        if (price < 1) {
            actor === null || actor === void 0 ? void 0 : actor.sendMessage(`§cInvalid price!`);
            return false;
        }
        db[item.getName()] = {
            "price": price
        };
        actor === null || actor === void 0 ? void 0 : actor.sendMessage(`§aSuccessfully added §d${item.getName()}§r §afor §e${api_1.EconomyX.currency()}${price}`);
        return true;
    }
    /**Edit item data. */
    static editItem(item, price, actor) {
        if (item.getName() === "minecraft:air") {
            actor === null || actor === void 0 ? void 0 : actor.sendMessage(`§cYou can't sell air`);
            return false;
        }
        if (db.hasOwnProperty(item.getName()) === false) {
            actor === null || actor === void 0 ? void 0 : actor.sendMessage(`§cThis item not found.`);
            return false;
        }
        const data = db[item.getName()];
        if (price < 1 || price === data.price) {
            actor === null || actor === void 0 ? void 0 : actor.sendMessage(`§cInvalid price!`);
            return false;
        }
        data.price = price;
        actor === null || actor === void 0 ? void 0 : actor.sendMessage(`§aManaged to edit the price to §e${api_1.EconomyX.currency()}${price}`);
        return true;
    }
    /**Get item price. */
    static getPrice(item) {
        if (db.hasOwnProperty(item.getName()) === false)
            return null;
        return db[item.getName()].price;
    }
    /**Sell item from hand. */
    static hand(player) {
        const item = player.getMainhandSlot();
        if (item.getName() === "minecraft:air") {
            player.sendMessage(`§cYou can't sell air`);
            return false;
        }
        if (item.isDamaged()) {
            player.sendMessage(`§cYour item has damaged.`);
            return false;
        }
        if (db.hasOwnProperty(item.getName()) === false) {
            player.sendMessage(`§cInvalid item.`);
            return false;
        }
        const price = db[item.getName()].price;
        api_1.EconomyX.addMoney(player, price * item.getAmount());
        player.sendMessage(`§aSuccessfully sold §7[§d${item.getAmount()}§7, §d${item.getName()}§7]§a for §e${price * item.getAmount()}`);
        return true;
    }
}
exports.SimpleSell = SimpleSell;
event_1.events.serverStop.on(() => {
    fs.writeFile(__dirname + "../../../data/items.json", JSON.stringify(db), () => { });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxpREFBbUQ7QUFDbkQsc0NBQW9DO0FBRXBDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixJQUFJLEVBQUUsR0FBd0MsRUFBRSxDQUFDO0FBRWpELElBQUk7SUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRywwQkFBMEIsQ0FBQyxDQUFBO0NBQUU7QUFBQyxPQUFNLENBQUMsRUFBRTtJQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtDQUFFO0FBRXhILHNCQUFzQjtBQUN0QixNQUFhLFVBQVU7SUFDbkIsb0JBQW9CO0lBQ3BCLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBZSxFQUFFLEtBQWEsRUFBRSxLQUFvQjtRQUMvRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxlQUFlLEVBQUU7WUFDcEMsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ25DLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxXQUFXLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUNsRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNYLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN2QyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRztZQUNqQixPQUFPLEVBQUUsS0FB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