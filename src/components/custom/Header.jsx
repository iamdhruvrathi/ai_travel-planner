import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...resp.data,
            access_token: tokenInfo.access_token,
          })
        );
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Failed to get user profile");
        setOpenDialog(true);
      });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <Link to="/">
        <img
          src="/web_logo.png"
          alt="AI Travel Planner Logo"
          className="h-10 cursor-pointer rounded-md"
        />
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  alt="User Profile"
                  className="h-6 w-6 rounded-full cursor-pointer"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer text-sm text-red-500 hover:underline"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    setUser(null);
                    navigate("/");
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center text-center">
            <img src="/web_logo.png" alt="Logo" className="h-12" />
            <h2 className="font-bold text-md mt-4">
              Authenticate securely using Google
            </h2>

            <Button
              onClick={login}
              className="w-full mt-5 flex gap-4 items-center justify-center"
            >
              <FcGoogle className="h-7 w-7" />
              Sign In With Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
