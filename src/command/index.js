"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const event_1 = require("bdsx/event");
const nativetype_1 = require("bdsx/nativetype");
const api_1 = require("../api");
event_1.events.serverOpen.on(() => {
    command_2.command.register("sell", "Sell item from your hand.")
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        api_1.SimpleSell.hand(pl);
    }, {})
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        api_1.SimpleSell.hand(pl);
    }, {
        hand: command_2.command.enum("sell_hand", "hand")
    });
    command_2.command.register("admsell", "Add/Edit item data.", command_1.CommandPermissionLevel.Operator)
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        const item = pl.getMainhandSlot();
        api_1.SimpleSell.addItem(item, p.price, pl);
    }, {
        add: command_2.command.enum("sell_add", "add"),
        price: nativetype_1.int32_t
    })
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        const item = pl.getMainhandSlot();
        api_1.SimpleSell.editItem(item, p.price, pl);
    }, {
        edit: command_2.command.enum("sell_edit", "edit"),
        price: nativetype_1.int32_t
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUF1RTtBQUN2RSwwQ0FBdUM7QUFDdkMsc0NBQW9DO0FBQ3BDLGdEQUEwQztBQUMxQyxnQ0FBb0M7QUFFcEMsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFO0lBQ3RCLGlCQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSwyQkFBMkIsQ0FBQztTQUNwRCxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDZixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0IsSUFBSSxNQUFNLEtBQUssSUFBSTtZQUFFLE9BQU87UUFDNUIsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEQsSUFBSSxFQUFFLEtBQUssSUFBSTtZQUFFLE9BQU87UUFFeEIsZ0JBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEIsQ0FBQyxFQUFFLEVBQUUsQ0FBQztTQUNMLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNmLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM3QixJQUFJLE1BQU0sS0FBSyxJQUFJO1lBQUUsT0FBTztRQUM1QixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwRCxJQUFJLEVBQUUsS0FBSyxJQUFJO1lBQUUsT0FBTztRQUV4QixnQkFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4QixDQUFDLEVBQUU7UUFDQyxJQUFJLEVBQUUsaUJBQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztLQUMxQyxDQUFDLENBQUM7SUFFSCxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUscUJBQXFCLEVBQUUsZ0NBQXNCLENBQUMsUUFBUSxDQUFDO1NBQ2xGLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNmLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM3QixJQUFJLE1BQU0sS0FBSyxJQUFJO1lBQUUsT0FBTztRQUM1QixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwRCxJQUFJLEVBQUUsS0FBSyxJQUFJO1lBQUUsT0FBTztRQUV4QixNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDbEMsZ0JBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQyxFQUFFO1FBQ0MsR0FBRyxFQUFFLGlCQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7UUFDcEMsS0FBSyxFQUFFLG9CQUFPO0tBQ2pCLENBQUM7U0FDRCxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDZixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0IsSUFBSSxNQUFNLEtBQUssSUFBSTtZQUFFLE9BQU87UUFDNUIsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEQsSUFBSSxFQUFFLEtBQUssSUFBSTtZQUFFLE9BQU87UUFFeEIsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ2xDLGdCQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUMsRUFBRTtRQUNDLElBQUksRUFBRSxpQkFBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDO1FBQ3ZDLEtBQUssRUFBRSxvQkFBTztLQUNqQixDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9