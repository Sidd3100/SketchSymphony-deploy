import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.models.js';
import Listing from '../models/listing.models.js';

export const test =(req,res)=>{
    res.json({
        msg: 'Api route is working',
    });
};

export const updateUser = async(req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'Not Authenticated!'));
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }
        //We are using the set method bcoz all the data might not be updated
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                //things user can change in the profile
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        },{new:true});
        
        const {password, ...restInfo} = updatedUser._doc;
        res.status(200).json(restInfo);

    } catch (error) {
        next(error);
    }
}

export const deleteUser = async(req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'Not Authenticated!'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error);
    }
}   

export const getUserListings = async(req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'Not Authenticated!'));
    try {
        const listings = await Listing.find({userRef: req.params.id});
        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
}

export const getAllUsers = async(req,res,next)=>{
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export const viewUserListings = async(req,res,next)=>{
    try {
        const listings = await Listing.find({username: req.params.username});
        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
}
