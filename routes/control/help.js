
export function login(){
    return (req, res, next) => {
        res.render('control/login');
    }
}