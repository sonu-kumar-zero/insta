import User from "../models/User.js";

// read
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserFromUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const result = await User.find({
      username: { $regex: username, $options: "i" },
    }).limit(5);
    res.status(202).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    console.log(user);
    res.status(200).json(user.friends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendid } = req.params;
    if (id != friendid) {
      const user = await User.findById(id);
      const friend = await User.findById(friendid);
      if (user.friends.includes(friendid) && friend.friends.includes(id)) {
        user.friends = user.friends.filter((id) => id !== friendid);
        friend.friends = friend.friends.filter((id1) => id1 !== id);
      } else if (
        !user.friends.includes(friendid) &&
        !friend.friends.includes(id)
      ) {
        user.friends.push(friendid);
        friend.friends.push(id);
      } else {
        if (user.friends.includes(friendid)) {
          user.friends = user.friends.filter((id) => id !== friendid);
        } else if (friend.friends.includes(id)) {
          friend.friends = friend.friends.filter((id) => id !== id);
        }
      };

      await user.save();
      await friend.save();

      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
      let formatedFriends = [];
      friends.map(({ _id }) => {
        formatedFriends = [...formatedFriends, _id];
      });
      console.log(formatedFriends);
      res.status(200).json(formatedFriends);
    } else {
      res.status(412).json({ message: "A user cannot be his friend" });
      return;
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
