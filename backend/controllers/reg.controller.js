const Reg = require("../models/reg.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userRegistration = async (req, res) => {
  try {
    const { fullName, email, pass, rePass } = req.body;
    const userCheck = await Reg.findOne({ email: email });

    if (pass !== rePass) {
      res.status(400).json({
        status: 400,
        message: "Password didn't match...",
      });
    }

    const hashedPass = await bcrypt.hash(pass, 10);

    if (userCheck == null) {
      const record = new Reg({
        fullName: fullName,
        email: email,
        pass: hashedPass,
      });

      await record.save();

      res.status(201).json({
        status: 201,
        message: `Sign Up successful! Please log in to continue.`,
      });
    } else {
      res.status(400).json({
        message: `User Name ${fullName} is Already Registered`,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

exports.loginCheck = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const record = await Reg.findOne({ email: email });

    if (record !== null) {
      const isMatch = await bcrypt.compare(pass, record.pass);

      if (isMatch) {
        const token = jwt.sign(
          { _id: record._id, email: email },
          process.env.JWT_SECRET,
          { expiresIn: "4h" }
        );

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 4 * 3600000),
          httpOnly: true,
          secure: true,
        });

        return res.status(200).json({
          status: 200,
          apiData: record.fullName,
          token,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Wrong Credentials",
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        message: "No user found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};
