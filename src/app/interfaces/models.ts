export interface User 
{
    userId: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    userPhoto: string
    created: number;
}

export interface Trip {
    tripId: string;
    tripStart: string;
    tripEnd: string;
    tripPrice: number;
    capacity: number;
    created: number;
    active: boolean;
    userId: string;
    userName: string;
    userPhone: string
}