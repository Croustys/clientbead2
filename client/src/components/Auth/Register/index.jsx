import { memo, useState } from "react";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
  useAddExperiencesMutation,
} from "@lib/api";
import { setAccessToken } from "@store/auth/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    role: "company",
  });
  const dispatch = useDispatch();

  const [experiences, setExperiences] = useState("");
  const [
    registerUser,
    {
      isLoading: isRegistering,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      isLoading: isLoggingIn,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
    },
  ] = useLoginUserMutation();
  const [
    addExperiences,
    {
      isLoading: isAddingExperiences,
      isSuccess: isAddExperiencesSuccess,
      isError: isAddExperiencesError,
    },
  ] = useAddExperiencesMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleExperienceChange = (e) => {
    setExperiences(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
      const loginResult = await loginUser({
        email: formData.email,
        password: formData.password,
        strategy: "local",
      }).unwrap();
      const accessToken = loginResult.accessToken;
      const userRole = loginResult.user.role;
      const userId = loginResult.user.id;

      dispatch(setAccessToken({ accessToken, userRole, userId }));

      if (formData.role === "jobseeker") {
        const experiencesArray = experiences.split("\n").map((line) => {
          const [company, title, interval] = line.split(";");
          return { company, title, interval };
        });
        await addExperiences(experiencesArray).unwrap();
      }
    } catch (error) {
      console.error(
        "Failed to register user, login, or add experiences:",
        error
      );
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
      {formData.role === "jobseeker" && (
        <div>
          <label>Previous Work Experiences:</label>
          <textarea
            name="experiences"
            value={experiences}
            onChange={handleExperienceChange}
            placeholder="Halo Haven;Front-end fejlesztő;2019-2022&#10;Dunder Mifflin;Full-stack fejlesztő;2022-"
            rows="4"
          />
        </div>
      )}
      <button
        type="submit"
        disabled={isRegistering || isLoggingIn || isAddingExperiences}
      >
        Register
      </button>
      {isRegisterSuccess && isLoginSuccess && isAddExperiencesSuccess && (
        <p>Registration successful!</p>
      )}
      {(isRegisterError || isLoginError || isAddExperiencesError) && (
        <p>Registration failed. Please try again.</p>
      )}
    </form>
  );
};

export default memo(Register);
