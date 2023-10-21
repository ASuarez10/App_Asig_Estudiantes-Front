export interface CandidateInterface{
    id_candidate : string;
    name : string;
    lastname: string;
    age : number;
    city : string;
    estate : string;
    icfes_general : number;
    id_type : string;
    sex : string;
    headquartercareer : {
        id_headquarter_career : number;
    };
    education_type : {
        id_education_type : number;
    };
}