import { CommandItem, CommandPermissionLevel } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { events } from "bdsx/event";
import { int32_t } from "bdsx/nativetype";
import { SimpleSell } from "../api";

events.serverOpen.on(() => {
    command.register("sell", "Sell item from your hand.")
    .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null) return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null) return;

        SimpleSell.hand(pl);
    }, {})
    .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null) return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null) return;

        SimpleSell.hand(pl);
    }, {
        hand: command.enum("sell_hand", "hand")
    });

    command.register("admsell", "Add/Edit item data.", CommandPermissionLevel.Operator)
    .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null) return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null) return;

        const item = pl.getMainhandSlot();
        SimpleSell.addItem(item, p.price, pl);
    }, {
        add: command.enum("sell_add", "add"),
        price: int32_t
    })
    .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null) return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null) return;

        const item = pl.getMainhandSlot();
        SimpleSell.editItem(item, p.price, pl);
    }, {
        edit: command.enum("sell_edit", "edit"),
        price: int32_t
    });
});