import IRiskZone from "./IRiskZone";
//import RiskZoneModel from "../dbschemas/RiskZone";

export default class RiskZone implements IRiskZone {
    // private _name: string;
    // private _description: string;
    // private _adminId: string;
    // private _criticalSpotsId: Array<string>;
    // private _collaboratorsId: Array<string>;

    // name: string;
    // description: string;
    // adminId: string;
    // criticalSpotsId: Array<string>;
    // collaboratorsId: Array<string>;

    private name: string;
    private description: string;
    private adminId: string;
    private criticalSpotsId: Array<string>;
    private collaboratorsId: Array<string>;

    constructor(name: string, description: string, adminId: string, criticalSpotsId: Array<string> = [], collaboratorsId: Array<string> = []) {
        this.name = name;
        this.description = description;
        this.adminId = adminId;
        this.criticalSpotsId = criticalSpotsId;
        this.collaboratorsId = collaboratorsId;
    }
    //get name(): string { return this._name; }
    //get description(): string { return this._description; }
    //get adminId(): string { return this._adminId; }
    //get criticalSpotsId(): Array<string> { return this._criticalSpotsId; }
    //get collaboratorsId(): Array<string> { return this._collaboratorsId; }

    addCollaborator(id_collaborator: string) {
        if (this.collaboratorsId.includes(id_collaborator)) return false;
        this.collaboratorsId.push(id_collaborator);
        return true;
    }

    deleteCollaborator(id_collaborator: string) {
        let index = this.collaboratorsId.findIndex((id) => id === id_collaborator);

        if (index !== -1) {
            this.collaboratorsId.splice(index, 1);
            return true;
        }
        else return false;
    }

    addCriticalSpot(id_spot: string) {
        if (this.criticalSpotsId.includes(id_spot)) return false;
        this.criticalSpotsId.push(id_spot);
        return true;
    }

    deleteCriticalSpot(id_spot: string) {
        let index = this.criticalSpotsId.findIndex((id) => id === id_spot);

        if (index !== -1) {
            this.criticalSpotsId.splice(index, 1);
            return true;
        }
        else return false;
    }

    // async save(id_user: string) {
    //     const zoneModel = new RiskZoneModel(this);
    //     console.log(`Object to save: ${zoneModel}`);
    //     try {
    //         const result = await zoneModel.save();
    //         if (result) return true;
    //         else return false;
    //     } catch(e) {
    //         console.log(`error saving riskzone: ${e.message}`);
    //         return false;
    //     }


    // }
}