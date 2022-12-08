import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginUser, loginStatus } from "../slices/login/loginSlice";
import { useRouter } from "next/router";
// import { signIn } from "next-auth/react";

const login = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(loginStatus);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [addRequestStatus, setAddRequestStatus] = useState<string>("idle");
  const [inputType, setInputType] = useState<string>("password");
  const [show, setShow] = useState<boolean>(false);
  const { isOpen, onToggle, onClose } = useDisclosure();

  const router = useRouter();

  const onUsernameChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setUsername(e.currentTarget.value);

  const onPasswordChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    if (canSave) {
      try {
        dispatch(loginUser({ username, password }));
        event.preventDefault();
      } catch (err) {
        console.error(err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      // signIn("credentials", {
      //   username: username,
      //   password: password,
      //   redirect: false,
      // });
      setUsername("");
      setPassword("");
      // navigate("/");
    } else if (status === "failed") {
      onToggle();
    }
  }, [status]);

  useEffect(() => {
    if (show) {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }, [show]);

  const canSave =
    [username.trim(), password.trim()].every(Boolean) &&
    addRequestStatus === "idle";

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-2/6">
        <h1 className="mt-12 mb-8 text-4xl text-center">Bank App Login</h1>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block mb-2 text-md font-bold text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white  border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="username"
              onChange={onUsernameChanged}
              value={username}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-md font-bold text-gray-600"
            >
              Password
            </label>
            <label className="block relative flex border rounded-sm focus-within:border-gray-400">
              <input
                type={inputType}
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="password"
                onChange={onPasswordChanged}
                value={password}
              />
              {password.length > 0 && (
                <div
                  className="px-2 h-full flex items-center justify-center h-[45.6px] w-16 text-sm font-semibold cursor-pointer bg-zinc-50 select-none"
                  onClick={() => setShow((show) => !show)}
                >
                  {show ? "Hide" : "Show"}
                </div>
              )}
            </label>
          </div>

          <div className="text-center lg:text-left">
            <Popover
              returnFocusOnClose={false}
              isOpen={isOpen}
              onClose={onClose}
              placement="top"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-500 text-white font-medium text-sm leading-snug rounded shadow-md hover:bg-bg-blue-600 hover:shadow-lg focus:bg-bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer"
                  disabled={!canSave}
                >
                  Login
                </button>
              </PopoverTrigger>
              <PopoverContent bg="red.500" color="white">
                <PopoverArrow bg="red.500" />
                <PopoverCloseButton />
                <PopoverHeader>Error!</PopoverHeader>
                <PopoverBody>
                  The email or password you entered is incorrect.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
