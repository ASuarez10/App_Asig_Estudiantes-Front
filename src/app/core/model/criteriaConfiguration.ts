export interface CriteriaConfInterface {

    value : string | undefined,
    priority : string | undefined,
    percentage : number,
    comparator : string | undefined,
    automatized : number,
    criterion: {
        id_criterion: string
    }

}