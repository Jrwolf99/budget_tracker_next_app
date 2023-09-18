import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useFormat from '../utility/useFormat';
import { useState } from 'react';
import { authedPost } from '../utility/common';
import { currentUserId } from '../utility/localStorage';
import { DialogClose } from '@radix-ui/react-dialog';

export function GoalEditModal({
  children,
  month,
  year,
  currentGoal,
  getReport,
  spendCategoryID,
}) {
  const { monthIntToString } = useFormat();

  const [newGoal, setNewGoal] = useState(null);

  const handleSubmit = () => {
    authedPost('/goals/create_or_update_goal', {
      target_value: newGoal,
      user_id: currentUserId(),
      month,
      year,
      spend_category_id: spendCategoryID,
    })
      .then((res) => {
        getReport();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Change your goal for {monthIntToString(month)} {year}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Current Goal
            </Label>
            <Input
              id="name"
              value={currentGoal}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              New Goal
            </Label>
            <Input
              id="username"
              onChange={(e) => setNewGoal(e.target.value)}
              value={newGoal}
              placeholder="New Goal"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={() => handleSubmit()}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
