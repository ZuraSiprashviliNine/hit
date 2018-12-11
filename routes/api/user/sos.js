
export function getAll(User, callback){
    User.find({}, {}, callback);
}