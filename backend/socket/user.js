// const useridmap = new Map();

export const userLogIN = (data,useridmap)=>{
    const {userId} = data;
    console.log("User logged in");
    useridmap.set(userId,true);
    console.log(userId);
};

export const userLogOut = (data,useridmap)=>{
    const {userId} = data;
    console.log("User logged out");
    useridmap.delete(userId);
    console.log(userId);
};