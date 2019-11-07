export default interface IRiskZone  {
    addCriticalSpot(id_spot: string): boolean;
    deleteCriticalSpot(id_spot: String): boolean;
    addCollaborator(id_user: String): boolean;
    deleteCollaborator(id_user: String): boolean;
}