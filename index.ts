import "./src";
import { events } from "bdsx/event";

events.serverOpen.on(() => {
    console.log(`[Simple-Sell] Started!`);
});