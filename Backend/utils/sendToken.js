const sendToken = (user, statusCode, res) => {
    const token = user.generateJWTToken();

    //option for cookie


    const option = {
        
        maxAge:24* 60 *60 * 1000,
        httpOnly : true
    };

    res.status(statusCode).cookie("token", token,option).json({
        success: true,
        user,
        token
    });
}


export default sendToken;