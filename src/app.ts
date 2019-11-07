require('./config/mongoose');
import RiskZone from "./model/RiskZone";
import IRiskZone from "./model/IRiskZone";
import RiskZonesManager from "./service/RiskZonesManager";
import { RiskZoneDocument, RiskZones } from "./persistence/RiskZone";

let zone_id : string = "1";

async function saveRiskZone() {
    let zone: IRiskZone = new RiskZone("popa", "salto del cabron", "123456");

    zone.addCriticalSpot("1");
    zone.addCriticalSpot("2");

    zone.addCollaborator("3");
    zone.addCollaborator("4");

    console.log(zone);

    if (zone.deleteCollaborator("3")) console.log("Borrado");

    console.log(zone);

    if (zone.deleteCriticalSpot("2")) console.log("Borrado");

    console.log(zone);

    const result = await RiskZonesManager.addRiskZone(zone);

    if (result) {
        console.log("Guardado en db: ", result);
        zone_id = (result as RiskZoneDocument)._id;
        console.log('Value of id: ', zone_id);
    }
    else console.log("No guardado en db");

    await getRiskZone();
}

async function getRiskZone() {
    const zone = await RiskZonesManager.getRiskZone(zone_id);
    if (zone) console.log('Object found: ', zone);
    else console.log('Object not found :(');
}

saveRiskZone();