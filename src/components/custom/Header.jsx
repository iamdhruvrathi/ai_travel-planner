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
import { Menu } from "lucide-react";
import axios from "axios";
import SignInDialog from "./SignInDialog";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <>
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
            <>
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-3">
                <a href="/create-trip">
                  <Button variant="outline" className="rounded-full">
                    + Create Trip
                  </Button>
                </a>
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
                  <PopoverContent className="bg-white p-2 rounded-lg shadow-lg">
                    <Button
                      variant="outline"
                      className="w-full rounded-full text-red-500"
                      onClick={() => {
                        googleLogout();
                        localStorage.clear();
                        setUser(null);
                        navigate("/");
                      }}
                    >
                      Logout
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="bg-white"
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </Button>

                {/* Mobile Menu */}
                <div
                  className={`absolute top-16 right-0 bg-white shadow-lg rounded-lg p-4 md:hidden transition-all duration-200 ${
                    isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <a href="/create-trip">
                      <Button variant="outline" className="w-full rounded-full">
                        + Create Trip
                      </Button>
                    </a>
                    <a href="/my-trips">
                      <Button variant="outline" className="w-full rounded-full">
                        My Trips
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      className="w-full rounded-full text-red-500"
                      onClick={() => {
                        googleLogout();
                        localStorage.clear();
                        setUser(null);
                        navigate("/");
                        setIsMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
          )}
        </div>
      </div>
      <SignInDialog
        open={openDialog}
        onLogin={login}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
}

export default Header;
