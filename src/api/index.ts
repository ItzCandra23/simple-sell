import { ItemStack } from "bdsx/bds/inventory";
import { ServerPlayer } from "bdsx/bds/player";
import { EconomyX } from "@bdsx/economy-x/src/api";
import { events } from "bdsx/event";

const fs = require("fs");

let db: { [item: string]: {price: number} } = {};

try { db = require(__dirname + "../../../data/items.json") } catch(e) { console.log(`[Simple-Sell] items.json Error!`) }

/**Simple-Sell Api. */
export class SimpleSell {
    /**Add item data. */
    static addItem(item: ItemStack, price: number, actor?: ServerPlayer): boolean {
        if (item.getName() === "minecraft:air") {
            actor?.sendMessage(`§cYou can't sell air`);
            return false;
        }
        if (db.hasOwnProperty(item.getName())) {
            actor?.sendMessage(`§cThis item has been added.`);
            return false;
        }
        if (price < 1) {
            actor?.sendMessage(`§cInvalid price!`);
            return false;
        }

        db[item.getName()] = {
            "price": price
        }
        actor?.sendMessage(`§aSuccessfully added §d${item.getName()}§r §afor §e${EconomyX.currency()}${price}`);
        return true;
    }

    /**Edit item data. */
    static editItem(item: ItemStack, price: number, actor?: ServerPlayer): boolean {
        if (item.getName() === "minecraft:air") {
            actor?.sendMessage(`§cYou can't sell air`);
            return false;
        }
        if (db.hasOwnProperty(item.getName()) === false) {
            actor?.sendMessage(`§cThis item not found.`);
            return false;
        }

        const data = db[item.getName()];
        if (price < 1||price === data.price) {
            actor?.sendMessage(`§cInvalid price!`);
            return false;
        }

        data.price=price;
        actor?.sendMessage(`§aManaged to edit the price to §e${EconomyX.currency()}${price}`);
        return true;
    }

    /**Get item price. */
    static getPrice(item: ItemStack): number|null {
        if (db.hasOwnProperty(item.getName()) === false) return null;
        return db[item.getName()].price;
    }

    /**Sell item from hand. */
    static hand(player: ServerPlayer): boolean {
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
        EconomyX.addMoney(player, price*item.getAmount());
        player.sendMessage(`§aSuccessfully sold §7[§d${item.getAmount()}§7, §d${item.getName()}§7]§a for §e${price*item.getAmount()}`);
        return true;
    }
}

events.serverStop.on(() => {
    fs.writeFile(__dirname + "../../../data/items.json", JSON.stringify(db), () => {});
});