import { memo, useState } from "react";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
  useAddExperiencesMutation,
} from "@lib/api";
import { setAccessToken } from "@store/auth/authSlice";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="john@doe.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="fullname">Full Name</Label>
        <Input
          type="text"
          name="fullname"
          id="fullname"
          placeholder="John Doe"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <Select
          defaultValue={formData.role}
          onValueChange={(t) => setFormData((prev) => ({ ...prev, role: t }))}
        >
          <SelectTrigger className="w-[180px]" id="role" name="role">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="company">Company</SelectItem>
            <SelectItem value="jobseeker">Jobseeker</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {formData.role === "jobseeker" && (
        <div>
          <Label htmlFor="experiences">Previous Work Experiences</Label>
          <Textarea
            name="experiences"
            id="experiences"
            value={experiences}
            onChange={handleExperienceChange}
            placeholder="Halo Haven;Front-end fejlesztő;2019-2022&#10;Dunder Mifflin;Full-stack fejlesztő;2022-"
            rows="4"
          />
        </div>
      )}
      <Button
        type="submit"
        disabled={isRegistering || isLoggingIn || isAddingExperiences}
      >
        Register
      </Button>
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
