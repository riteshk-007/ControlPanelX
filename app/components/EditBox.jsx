"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquarePen } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EditBox = ({ name, value, updateInfo, onChange }) => {
  const updateInformation = () => {
    updateInfo();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2 w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-950">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {name}</DialogTitle>
          <DialogDescription>
            {
              "Update your details here. Don't forget to click 'Update' once you're finished making changes."
            }
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right capitalize">
              {name}
            </Label>

            <Input
              id="name"
              defaultValue={value}
              className="col-span-3"
              onChange={onChange}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={updateInformation}>Update {name}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBox;
