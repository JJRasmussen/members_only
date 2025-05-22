function isAuth(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    };
};

function isAdmin(req, res, next){
     if(req.isAuthenticated() && req.user.is_admin){
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to visit this resourece because you are not an admin'})
    };
};
 

module.exports = {
    isAuth,
    //isMember,
    isAdmin
}