import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
    console.log("Received POST request to /sign-up");
  const { name, email, password, confirm_password } = req.body;
  if(!name){
    return res.status(400).send({error: "Name cannot be empty"});
  }
  if (!email || !password) {
    return res.status(400).send({ error: "email and password required" });
  }
  if (password !== confirm_password) {
    return res
      .status(400)
      .send({ error: "password and confirm password should be same" });
  }
  // Verify password format is correct (at least 8 characters long, contains at least one capital letter, one number, and one special character)
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).send({
      error:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character.",
    });
  }

  try {
    // const user = await createUser.user(
    //   email,
    //   password
    // );
    res.send({ email: email, name: name});
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

export default router;
