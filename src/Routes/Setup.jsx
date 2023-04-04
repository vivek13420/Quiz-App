import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setupInfo } from "../Redux/SetupReducer/action";
import { useNavigate } from "react-router-dom";

const categories = ["General Knowledge", "Sports", "Geography"];
const difficulties = ["easy", "medium", "hard"];

const Setup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    difficulty: "",
    numQuestions: 10,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setupInfo(formData))
    navigate('/quiz')
    console.log(formData); // do something with the form data here
  };
  return (
    <Flex align="center" justify="center" minH="100vh">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            mb={4}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Choose a category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Difficulty Level</FormLabel>
          <Select
            placeholder="Choose Difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            {difficulties.map((difficulty) => (
              <>
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              </>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Number of Questions</FormLabel>
          <Input
            placeholder="Choose number of questions"
            name="numQuestions"
            value={formData.numQuestions}
            onChange={handleChange}
            min={1}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" mt={4}>
          Submit
        </Button>
      </form>
    </Flex>
  );
};

export default Setup;
