import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

function SignInDialog({ open, onLogin, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
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
            onClick={onLogin}
            className="w-full mt-5 flex gap-4 items-center justify-center"
          >
            <FcGoogle className="h-7 w-7" />
            Sign In With Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
