import { memo, useState } from "react";
import { useRegisterUserMutation } from "@lib/api";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    role: "company",
  });

  const [registerUser, { isLoading, isSuccess, isError }] =
    useRegisterUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="company">Company</option>
          <option value="jobseeker">Jobseeker</option>
        </select>
      </div>
      <button type="submit" disabled={isLoading}>
        Register
      </button>
      {isSuccess && <p>Registration successful!</p>}
      {isError && <p>Registration failed. Please try again.</p>}
    </form>
  );
};

export default memo(Register);
