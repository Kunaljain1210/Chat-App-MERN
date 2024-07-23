import User from "../model/user.model.js";

export const getUserForSidebar= async (req, res) => {
    try {
        const loggedinUserId = req.user._id

        //find every user in DB except the current authenticated user
        const filteredUsers = await User.find({ _id: { $ne : loggedinUserId } })

        res.status(200).json(filteredUsers); 
    } catch (error) {
        console.error("Error in getUserForSidebar", error.message);
        res.status(500).json({error : "Internal server error"})
    }
}
